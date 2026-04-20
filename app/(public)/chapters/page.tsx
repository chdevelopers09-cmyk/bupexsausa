import HeroSection from '@/components/sections/HeroSection';
import TextBlockSection from '@/components/sections/TextBlockSection';
import ChapterSpotlightSection from '@/components/sections/ChapterSpotlightSection';
import CardGridSection from '@/components/sections/CardGridSection';

export const metadata = {
  title: 'Regional Chapters',
  description: 'Connect with a BUPEXSA USA chapter in your city.',
};

export default function ChaptersPage() {
  return (
    <>
      <HeroSection
        variant="centered-primary"
        heading="Our Regional Chapters"
        subheading="BUPEXSA USA is organized into vibrant regional chapters that bring the alumni experience to your doorstep."
        badge="BUPEXSA Across America"
      />

      <TextBlockSection
        variant="centered"
        heading="A Home Away From Home"
        body={`
          <p>No matter where you are in the United States, there is a BUPEXSA chapter nearby ready to welcome you. Our chapters are the lifeblood of the organization, coordinating local socials, fundraisers, and community support initiatives.</p>
        `}
      />

      <ChapterSpotlightSection />

      <CardGridSection 
        heading="Chapter Initiatives"
        cards={[
          {
            icon: 'heart',
            title: 'Local Support',
            body: 'Chapters provide a support system for members during significant life events.'
          },
          {
            icon: 'users',
            title: 'Networking Mixers',
            body: 'Quarterly professional and social gatherings for local alumni.'
          },
          {
            icon: 'database',
            title: 'Regional Records',
            body: 'Maintaining accurate alumni presence within each major US region.'
          }
        ]}
      />
    </>
  );
}
