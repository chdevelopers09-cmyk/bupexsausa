import HeroSection from '@/components/sections/HeroSection';
import GalleryClient from './GalleryClient';

export const metadata = {
  title: 'Alumni Gallery',
  description: 'Photos and videos from BUPEXSA USA events and PCSS Buea.',
};

export default function GalleryPage() {
  return (
    <>
      <HeroSection
        variant="centered-primary"
        heading="Memories in Motion"
        subheading="A visual journey through our conventions, regional meetings, and the beautiful campus of PCSS Buea."
        badge="BUPEXSA USA Gallery"
      />

      <GalleryClient />
    </>
  );
}
