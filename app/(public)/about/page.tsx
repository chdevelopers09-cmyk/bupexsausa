import HeroSection from '@/components/sections/HeroSection';
import TextBlockSection from '@/components/sections/TextBlockSection';
import ImageTextSection from '@/components/sections/ImageTextSection';
import CardGridSection from '@/components/sections/CardGridSection';
import TeamGridSection from '@/components/sections/TeamGridSection';

export const metadata = {
  title: 'About Us',
  description: 'Learn about the history, mission, and leadership of BUPEXSA USA.',
};

export default function AboutPage() {
  return (
    <>
      <HeroSection
        variant="centered-white"
        heading="Our Story, Our Mission"
        subheading="BUPEXSA USA is more than an organization; it's a legacy of friendship and commitment that spans decades and continents."
        badge="About BUPEXSA USA"
      />

      <TextBlockSection
        variant="centered"
        heading="Founded on Excellence"
        subheading="A History of Giving Back"
        body={`
          <p>Founded in 1985, Presbyterian College Secondary School (PCSS) Buea has been a beacon of academic excellence in Cameroon. As graduates moved to the United States to pursue their dreams, the need for a unified platform to maintain those school-day bonds became clear.</p>
          <p>BUPEXSA USA was established to bring together these graduates, ensuring that no matter how many miles we are from PCSS Buea, we remain connected to our roots and committed to the school that shaped us.</p>
        `}
      />

      <ImageTextSection
        variant="image-left"
        bodyTitle="Empowering the Next Generation"
        body={`
          <p>Our primary mission is to support our alma mater, PCSS Buea, through various initiatives. Each year, we provide scholarships to high-achieving students, fund critical infrastructure improvements, and facilitate mentorship programs between alumni and current students.</p>
          <p>We believe that by strengthening the foundation of PCSS Buea, we are ensuring a brighter future for the students who follow in our footsteps.</p>
        `}
        image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000"
        ctaLabel="See Our Projects"
        ctaUrl="/donations"
      />

      <CardGridSection
        heading="Our Core Values"
        cards={[
          {
            icon: 'award',
            title: 'Integrity',
            body: 'We operate with transparency and accountability in all our endeavors.'
          },
          {
            icon: 'users',
            title: 'Fellowship',
            body: 'We foster a sense of belonging and mutual support among all alumni.'
          },
          {
            icon: 'heart',
            title: 'Philanthropy',
            body: 'We are committed to giving back to our alma mater and communities.'
          }
        ]}
      />

      <TeamGridSection variant="four-col" heading="National Board of Directors" />
    </>
  );
}
