-- BUPEXSA USA ALUMNI MANAGEMENT PLATFORM
-- INITIAL SCHEMA MIGRATION v1.0
-- Created: April 2026

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLES

-- CHAPTERS
CREATE TABLE IF NOT EXISTS chapters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    state TEXT NOT NULL,
    description TEXT,
    banner_image_path TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- MEMBERS (Linked to Auth.Users)
CREATE TABLE IF NOT EXISTS members (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    membership_id TEXT UNIQUE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    graduation_year INT NOT NULL,
    batch TEXT,
    us_state TEXT NOT NULL,
    profession TEXT,
    avatar_path TEXT,
    chapter_id UUID REFERENCES chapters(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ACTIVE', 'EXPIRED', 'SUSPENDED', 'REJECTED')),
    role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'admin')),
    join_date DATE,
    expiry_date DATE,
    how_did_you_hear TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CHAPTER EXCOs
CREATE TABLE IF NOT EXISTS chapter_excos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    photo_path TEXT,
    bio TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- EVENTS
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description JSONB,
    start_datetime TIMESTAMPTZ NOT NULL,
    end_datetime TIMESTAMPTZ,
    location_name TEXT,
    location_address TEXT,
    chapter_id UUID REFERENCES chapters(id) ON DELETE SET NULL,
    category TEXT CHECK (category IN ('Gala', 'Fundraiser', 'Meeting', 'Social', 'Other')),
    thumbnail_path TEXT,
    max_attendees INT,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RSVPs
CREATE TABLE IF NOT EXISTS rsvps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'CONFIRMED' CHECK (status IN ('CONFIRMED', 'CANCELLED', 'WAITLISTED')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(member_id, event_id)
);

-- PAYMENTS
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('MEMBERSHIP', 'DONATION')),
    amount DECIMAL(10, 2) NOT NULL,
    method TEXT NOT NULL CHECK (method IN ('STRIPE', 'PAYPAL', 'ZELLE', 'CASHAPP')),
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PENDING_VERIFICATION', 'COMPLETED', 'FAILED', 'REFUNDED')),
    stripe_intent_id TEXT,
    paypal_order_id TEXT,
    proof_storage_path TEXT,
    receipt_sent BOOLEAN DEFAULT false,
    admin_note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- DONATIONS (Supports Guests)
CREATE TABLE IF NOT EXISTS donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_name TEXT NOT NULL,
    donor_email TEXT NOT NULL,
    member_id UUID REFERENCES members(id) ON DELETE SET NULL,
    amount DECIMAL(10, 2) NOT NULL,
    message TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    method TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- GALLERY
CREATE TABLE IF NOT EXISTS gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    storage_path TEXT NOT NULL,
    alt_text TEXT,
    category TEXT,
    chapter_id UUID REFERENCES chapters(id) ON DELETE SET NULL,
    order_index INT DEFAULT 0,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- SITE SETTINGS
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    category TEXT,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SECTION LIBRARY (Visual Builder)
CREATE TABLE IF NOT EXISTS section_library (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    component TEXT NOT NULL,
    variant TEXT NOT NULL,
    category TEXT NOT NULL,
    tags TEXT[],
    thumbnail_path TEXT,
    default_content JSONB NOT NULL DEFAULT '{}',
    content_schema JSONB NOT NULL DEFAULT '[]',
    is_system BOOLEAN DEFAULT true,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PAGE LAYOUTS
CREATE TABLE IF NOT EXISTS page_layouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_key TEXT NOT NULL,
    section_key TEXT NOT NULL,
    library_id UUID REFERENCES section_library(id) ON DELETE RESTRICT,
    component TEXT NOT NULL,
    variant TEXT NOT NULL,
    order_index INT NOT NULL,
    visible BOOLEAN DEFAULT true,
    content JSONB NOT NULL DEFAULT '{}',
    is_draft BOOLEAN DEFAULT false,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TRIGGERS & FUNCTIONS

-- Update Timestamp Function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to relevant tables
CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON members FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_chapters_updated_at BEFORE UPDATE ON chapters FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_page_layouts_updated_at BEFORE UPDATE ON page_layouts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Auto-create Member row on Sign Up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.members (id, full_name, email, graduation_year, us_state)
    VALUES (
        NEW.id, 
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'New Member'), 
        NEW.email, 
        CAST(COALESCE(NEW.raw_user_meta_data->>'graduation_year', '2000') AS INT), 
        COALESCE(NEW.raw_user_meta_data->>'us_state', 'Unknown')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Membership ID Generator
CREATE OR REPLACE FUNCTION generate_membership_id()
RETURNS TRIGGER AS $$
DECLARE
    seq_val INT;
    state_code TEXT;
    year_val TEXT;
BEGIN
    IF NEW.status = 'ACTIVE' AND OLD.status = 'PENDING' AND NEW.membership_id IS NULL THEN
        year_val := TO_CHAR(NOW(), 'YYYY');
        state_code := COALESCE(NEW.us_state, 'XX');
        
        -- Get next sequence number
        SELECT COUNT(*) + 1 INTO seq_val FROM members WHERE membership_id IS NOT NULL;
        
        NEW.membership_id := 'BUPEXSA-' || year_val || '-' || state_code || '-' || LPAD(seq_val::text, 4, '0');
        NEW.join_date := NOW();
        NEW.expiry_date := (NOW() + interval '1 year')::date;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_member_approval
    BEFORE UPDATE ON members
    FOR EACH ROW
    EXECUTE PROCEDURE generate_membership_id();

-- 4. RLS POLICIES

ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_layouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view page layouts" ON page_layouts FOR SELECT USING (visible = true);
CREATE POLICY "Public can view section library" ON section_library FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admins have full access" ON members FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

