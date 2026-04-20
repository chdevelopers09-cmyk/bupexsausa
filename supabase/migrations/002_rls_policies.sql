-- BUPEXSA USA ALUMNI MANAGEMENT PLATFORM
-- MIGRATION v1.1: RLS POLICIES & MISSING TABLES
-- Created: April 2026

-- 1. ANNOUNCEMENTS TABLE
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    is_published BOOLEAN DEFAULT true,
    publish_date TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 2. ENHANCE RLS POLICIES

-- MEMBERS
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Members read own profile" ON members;
CREATE POLICY "Members read own profile" ON members FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "Members update own profile" ON members;
CREATE POLICY "Members update own profile" ON members FOR UPDATE USING (auth.uid() = id);
-- Admins have full access is already partially there, let's make it robust
DROP POLICY IF EXISTS "Admins have full access" ON members;
CREATE POLICY "Admins have full access" ON members FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

-- EVENTS (Public Read, Admin Write)
DROP POLICY IF EXISTS "Public reads published events" ON events;
CREATE POLICY "Public reads published events" ON events FOR SELECT USING (is_published = true);
CREATE POLICY "Admins write events" ON events FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

-- CHAPTERS (Public Read, Admin Write)
DROP POLICY IF EXISTS "Public reads active chapters" ON chapters;
CREATE POLICY "Public reads active chapters" ON chapters FOR SELECT USING (is_active = true);
CREATE POLICY "Admins write chapters" ON chapters FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

-- CHAPTER EXCOs (Public Read, Admin Write)
ALTER TABLE chapter_excos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads exco" ON chapter_excos FOR SELECT USING (true);
CREATE POLICY "Admins write exco" ON chapter_excos FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

-- RSVPs (Member Read/Write own, Admin Read all)
DROP POLICY IF EXISTS "Members manage own rsvps" ON rsvps;
CREATE POLICY "Members manage own rsvps" ON rsvps FOR ALL USING (auth.uid() = member_id);
CREATE POLICY "Admins read all rsvps" ON rsvps FOR SELECT TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

-- PAYMENTS (Member Read own, Admin Full)
DROP POLICY IF EXISTS "Members read own payments" ON payments;
CREATE POLICY "Members read own payments" ON payments FOR SELECT USING (auth.uid() = member_id);
CREATE POLICY "Admins manage all payments" ON payments FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

-- DONATIONS (Admin Full, Public Insert)
DROP POLICY IF EXISTS "Public can donate" ON donations;
CREATE POLICY "Public can donate" ON donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage donations" ON donations FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

-- NOTIFICATIONS (Member Read own, Admin Full)
DROP POLICY IF EXISTS "Members read own notifications" ON notifications;
CREATE POLICY "Members read own notifications" ON notifications FOR SELECT USING (auth.uid() = member_id);
CREATE POLICY "Members update own notifications" ON notifications FOR UPDATE USING (auth.uid() = member_id);
CREATE POLICY "Admins manage notifications" ON notifications FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

-- GALLERY (Public Read, Admin Write)
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads gallery" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Admins write gallery" ON gallery_images FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

-- ANNOUNCEMENTS (Public Read, Admin Write)
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads announcements" ON announcements FOR SELECT USING (is_published = true);
CREATE POLICY "Admins write announcements" ON announcements FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

-- 3. UPDATE NEW USER HANDLER TO SUPPORT ALL METADATA
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.members (
        id, 
        full_name, 
        email, 
        graduation_year, 
        us_state, 
        phone, 
        batch, 
        profession, 
        how_did_you_hear
    )
    VALUES (
        NEW.id, 
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'New Member'), 
        NEW.email, 
        CAST(COALESCE(NEW.raw_user_meta_data->>'graduation_year', '2000') AS INT), 
        COALESCE(NEW.raw_user_meta_data->>'us_state', 'Unknown'),
        COALESCE(NEW.raw_user_meta_data->>'phone', NULL),
        COALESCE(NEW.raw_user_meta_data->>'batch', NULL),
        COALESCE(NEW.raw_user_meta_data->>'profession', NULL),
        COALESCE(NEW.raw_user_meta_data->>'how_did_you_hear', NULL)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
