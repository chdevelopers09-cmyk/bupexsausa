-- MIGRATION v1.2: ADD USERNAME AND FIX TRIGGER
-- Created: May 2026

-- 1. Add username column to members table if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'members' AND column_name = 'username') THEN
        ALTER TABLE members ADD COLUMN username TEXT;
    END IF;
END $$;

-- 2. Update handle_new_user to be more robust and include username
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    raw_grad_year TEXT;
    grad_year_int INT;
BEGIN
    raw_grad_year := NEW.raw_user_meta_data->>'graduation_year';
    
    -- Robust integer conversion
    IF raw_grad_year IS NULL OR raw_grad_year = '' THEN
        grad_year_int := 2000;
    ELSE
        BEGIN
            grad_year_int := CAST(raw_grad_year AS INT);
        EXCEPTION WHEN OTHERS THEN
            grad_year_int := 2000;
        END;
    END IF;

    INSERT INTO public.members (
        id, 
        full_name, 
        email,
        username,
        graduation_year, 
        us_state, 
        phone, 
        batch, 
        profession, 
        how_did_you_hear,
        status,
        role
    )
    VALUES (
        NEW.id, 
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'New Member'), 
        NEW.email, 
        COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
        grad_year_int, 
        COALESCE(NEW.raw_user_meta_data->>'us_state', 'Unknown'),
        COALESCE(NEW.raw_user_meta_data->>'phone', NULL),
        COALESCE(NEW.raw_user_meta_data->>'batch', NULL),
        COALESCE(NEW.raw_user_meta_data->>'profession', NULL),
        COALESCE(NEW.raw_user_meta_data->>'how_did_you_hear', NULL),
        COALESCE(NEW.raw_user_meta_data->>'membership_status', 'PENDING'),
        COALESCE(NEW.app_metadata->>'role', 'member')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
