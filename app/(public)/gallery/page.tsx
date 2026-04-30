import HeroSection from '@/components/sections/HeroSection';
import GalleryClient from './GalleryClient';
import { createAdminClient } from '@/lib/supabase/server';

export const metadata = {
  title: 'Alumni Gallery',
  description: 'Photos and videos from BUPEXSA USA events and PCSS Buea.',
};

export default async function GalleryPage() {
  const supabase = await createAdminClient();
  
  const { data: images } = await supabase
    .from('gallery_images')
    .select('*')
    .order('uploaded_at', { ascending: false });

  return (
    <>
      <HeroSection
        variant="centered-primary"
        heading="Memories in Motion"
        subheading="A visual journey through our conventions, regional meetings, and the beautiful campus of PCSS Buea."
        badge="BUPEXSA USA Gallery"
      />

      <GalleryClient initialImages={images || []} />
    </>
  );
}
