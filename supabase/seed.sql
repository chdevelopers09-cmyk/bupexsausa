-- BUPEXSA USA - IDEMPOTENT SEED DATA
-- Safe to run multiple times

-- 1. SITE SETTINGS
INSERT INTO site_settings (key, value, category) VALUES 
('branding', '{"name": "BUPEXSA USA", "logo": "/logo.png", "primaryColor": "#4F46E5", "secondaryColor": "#0EA5E9"}', 'general'),
('fees', '{"annualDues": 100, "conventionLevy": 250}', 'finance')
ON CONFLICT (key) DO NOTHING;

-- 2. SECTION LIBRARY
INSERT INTO section_library (name, component, variant, category, default_content) VALUES 
('Header Hero', 'HeroSection', 'centered-primary', 'hero', '{"title": "Welcome to BUPEXSA USA", "subtitle": "Connecting PCSS Buea Alumni"}'),
('Feature Grid', 'CardGridSection', 'three-col', 'content', '{"title": "Our Values", "cards": []}'),
('Statistics Bar', 'StatsBarSection', 'primary', 'stats', '{}'),
('Event List', 'EventsPreviewSection', 'cards', 'events', '{"heading": "Upcoming Events"}'),
('Chapter Spotlight', 'ChapterSpotlightSection', 'standard', 'chapters', '{}'),
('Donation Callout', 'DonationCtaSection', 'fullwidth', 'donations', '{"heading": "Support Our Mission"}'),
('Photo Strip', 'GalleryStripSection', 'strip', 'gallery', '{}'),
('Leadership Grid', 'TeamGridSection', 'four-col', 'team', '{"heading": "National Board"}'),
('Rich Text Block', 'TextBlockSection', 'centered', 'content', '{"heading": "Our Story", "body": "<p>Content goes here...</p>"}'),
('Image & Text', 'ImageTextSection', 'image-left', 'content', '{"title": "Working Together", "image": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655"}')
ON CONFLICT DO NOTHING;

-- 3. PAGE LAYOUTS (Cleanup existing first to avoid duplicates)
DELETE FROM page_layouts;

INSERT INTO page_layouts (page_key, section_key, component, variant, order_index, content) VALUES 
('home', 'hero', 'HeroSection', 'centered-primary', 1, '{"heading": "Connecting PCSS Buea Alumni Across America", "subheading": "Join the official BUPEXSA USA platform to reconnect, network, and give back.", "badge": "Official Alumni Platform", "cta1Label": "Join BUPEXSA USA", "cta1Url": "/register", "cta2Label": "Learn Our Mission"}'),
('home', 'stats', 'StatsBarSection', 'primary', 2, '{}'),
('home', 'values', 'CardGridSection', 'three-col', 3, '{"heading": "Our Mission & Values", "cards": [{"icon": "users", "title": "Foster Community", "body": "Building a strong network in the USA."}, {"icon": "award", "title": "Support Education", "body": "Scholarships for PCSS Buea."}, {"icon": "globe", "title": "Chapter Growth", "body": "Local communities coast-to-coast."}]}'),
('home', 'events', 'EventsPreviewSection', 'cards', 4, '{"heading": "Join Our Upcoming Events"}'),
('home', 'donations', 'DonationCtaSection', 'fullwidth', 5, '{"heading": "Make a Difference Today", "body": "Your support empowers the next generation at PCSS Buea.", "colorScheme": "dark"}'),
('home', 'gallery', 'GalleryStripSection', 'strip', 6, '{}'),
('about', 'about-hero', 'HeroSection', 'centered-white', 1, '{"heading": "Our Story, Our Mission", "subheading": "BUPEXSA USA is more than an organization; it''s a legacy of commitment."}'),
('about', 'about-text', 'TextBlockSection', 'centered', 2, '{"heading": "Founded on Excellence", "subheading": "A History of Giving Back", "body": "<p>Founded in 1985, PCSS Buea has been a beacon of academic excellence.</p>"}'),
('about', 'about-team', 'TeamGridSection', 'four-col', 3, '{"heading": "National Board of Directors"}'),
('membership', 'mem-hero', 'HeroSection', 'centered-primary', 1, '{"heading": "Become a Member", "subheading": "Join the elite network of PCSS Buea graduates in the USA."}'),
('membership', 'mem-stats', 'StatsBarSection', 'primary', 2, '{}'),
('membership', 'mem-benefits', 'CardGridSection', 'three-col', 3, '{"heading": "Member Benefits", "cards": [{"icon": "globe", "title": "Global Network", "body": "Professional connections across the US."}, {"icon": "award", "title": "Exclusive Events", "body": "Member-only socials and galas."}, {"icon": "heart", "title": "Legacy Building", "body": "Shape the future of our alma mater."}]}'),
('chapters', 'chap-hero', 'HeroSection', 'centered-primary', 1, '{"heading": "Regional Chapters", "subheading": "BUPEXSA USA is thriving across the country."}'),
('chapters', 'chap-spotlight', 'ChapterSpotlightSection', 'standard', 2, '{}'),
('events', 'ev-hero', 'HeroSection', 'centered-primary', 1, '{"heading": "Events & Reunions", "subheading": "Stay updated with all alumni activities."}'),
('events', 'ev-list', 'EventsPreviewSection', 'cards', 2, '{"heading": "Upcoming Gatherings"}'),
('donations', 'don-hero', 'HeroSection', 'centered-primary', 1, '{"heading": "Giving Back to PCSS Buea", "subheading": "Supporting excellence and growth since 1985."}'),
('donations', 'don-cta', 'DonationCtaSection', 'fullwidth', 2, '{"heading": "Donate to the Scholarship Fund", "body": "Our goal this year is to support 50 high-achieving students."}'),
('leadership', 'lead-hero', 'HeroSection', 'centered-primary', 1, '{"heading": "Our Leadership", "subheading": "Meet the National Board of Directors."}'),
('leadership', 'lead-grid', 'TeamGridSection', 'four-col', 2, '{"heading": "National Board 2024-2026"}'),
('gallery', 'gal-hero', 'HeroSection', 'centered-primary', 1, '{"heading": "Photo Gallery", "subheading": "Capturing memories from our events."}'),
('gallery', 'gal-grid', 'GalleryGridSection', 'standard', 2, '{}'),
('alma-mater', 'alma-hero', 'HeroSection', 'centered-primary', 1, '{"heading": "Our Alma Mater", "subheading": "PCSS Buea: A Legacy of Excellence."}'),
('alma-mater', 'alma-feature', 'AlmaMaterSection', 'standard', 2, '{}'),
('contact', 'con-hero', 'HeroSection', 'centered-primary', 1, '{"heading": "Contact Us", "subheading": "We are here to answer your questions."}'),
('contact', 'con-form', 'ContactFormSection', 'standard', 2, '{}');

-- 13. SAMPLE DATA
INSERT INTO chapters (name, slug, state, description, banner_image_path) VALUES 
('Texas Chapter', 'texas', 'TX', 'Serving alumni in the Lone Star State.', '/images/chapters/texas.jpg'),
('Georgia Chapter', 'georgia', 'GA', 'The heart of BUPEXSA in the South.', '/images/chapters/georgia.jpg'),
('California Chapter', 'california', 'CA', 'Connecting alumni across the West Coast.', '/images/chapters/california.jpg')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO events (title, slug, start_datetime, category, is_published, thumbnail_path, location_name) VALUES 
('Annual National Gala 2026', 'national-gala-2026', '2026-06-20 18:00:00+00', 'Gala', true, '/images/events/gala.jpg', 'Atlanta, GA'),
('Summer Alumni Picnic', 'summer-picnic', '2026-07-15 12:00:00+00', 'Social', true, '/images/events/meetup.jpg', 'Houston, TX'),
('Chapter Leaders Summit', 'leaders-summit', '2026-05-10 10:00:00+00', 'Meeting', true, '/images/events/agm.jpg', 'Virtual')
ON CONFLICT (slug) DO NOTHING;
