import HeroSection from '@/components/sections/HeroSection';
import TeamGridSection from '@/components/sections/TeamGridSection';
import TextBlockSection from '@/components/sections/TextBlockSection';

export const metadata = {
  title: 'Our Leadership',
  description: 'Meet the National Board of Directors of BUPEXSA USA.',
};

export default function LeadershipPage() {
  return (
    <>
      <HeroSection
        variant="centered-primary"
        heading="Our National Leadership"
        subheading="BUPEXSA USA is guided by a dedicated National Board of Directors committed to transparency, excellence, and the success of every alumnus."
        badge="BUPEXSA USA Governance"
      />

      <TeamGridSection variant="four-col" heading="National Board of Directors" />

      <TextBlockSection
        variant="centered"
        heading="Our Governance Model"
        body={`
          <p>Our leaders are elected biennially by the general membership. They serve as volunteers, bringing their professional expertise from across various industries to ensure the organization operates at the highest standard of non-profit management.</p>
        `}
      />
    </>
  );
}
