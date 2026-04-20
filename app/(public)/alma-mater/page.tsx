import HeroSection from '@/components/sections/HeroSection';
import AlmaMaterSection from '@/components/sections/AlmaMaterSection';
import GalleryStripSection from '@/components/sections/GalleryStripSection';
import TextBlockSection from '@/components/sections/TextBlockSection';

export const metadata = {
  title: 'Our Alma Mater',
  description: 'The history and spirit of Presbyterian College Secondary School (PCSS) Buea.',
};

export default function AlmaMaterPage() {
  return (
    <>
      <HeroSection
        variant="centered-primary"
        heading="Our Alma Mater"
        subheading="PCSS Buea: A beacon of knowledge, character, and excellence set against the backdrop of Mount Cameroon."
        badge="PCSS Buea Legacy"
      />

      <AlmaMaterSection 
        body="<p>Our Alma Mater is the foundation of our success.</p>" 
        image="/images/pcss-campus.jpg" 
      />

      <TextBlockSection
        variant="centered"
        heading="The Spirit of Buea"
        body={`
          <p>Founded in 1985, PCSS Buea has instilled discipline, academic curiosity, and community service in thousands of students. For those of us in the USA, Buea remains the cradle of our common identity.</p>
        `}
      />

      <GalleryStripSection />
    </>
  );
}
