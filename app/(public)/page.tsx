export const revalidate = 86400; // Cache for 24 hours

import { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';

export const metadata: Metadata = {
  title: 'Home | BUPEXSA USA',
  description: 'The official platform for PCSS Buea Alumni residing in the United States. Reconnect, empower, and support our community.',
};
import StatsBarSection from '@/components/sections/StatsBarSection';
import CardGridSection from '@/components/sections/CardGridSection';
import EventsPreviewSection from '@/components/sections/EventsPreviewSection';
import AnnouncementsSection from '@/components/sections/AnnouncementsSection';
import ChapterSpotlightSection from '@/components/sections/ChapterSpotlightSection';
import DonationCtaSection from '@/components/sections/DonationCtaSection';
import GalleryStripSection from '@/components/sections/GalleryStripSection';

export default function Home() {
  return (
    <>
      <HeroSection
        variant="centered-white"
        heading="Connecting PCSS Buea Alumni Across America"
        subheading="Join the official BUPEXSA USA platform to reconnect with former classmates, build professional networks, and give back to our alma mater."
        badge="Official Alumni Platform"
        cta1Label="Join BUPEXSA USA"
        cta1Url="/register"
        cta2Label="Learn Our Mission"
      />

      <StatsBarSection variant="white" />

      <CardGridSection
        bgVariant="sky"
        heading="Our Mission & Values"
        cards={[
          {
            icon: 'users',
            title: 'Foster Community',
            body: 'Building a strong, supportive network of PCSS Buea alumni residing in the United States.'
          },
          {
            icon: 'award',
            title: 'Support Education',
            body: 'Providing scholarships and educational support to deserving students at PCSS Buea.'
          },
          {
            icon: 'globe',
            title: 'Chapter Growth',
            body: 'Expanding our local chapters to ensure every alumni has a home community in the US.'
          }
        ]}
      />

      <EventsPreviewSection
        variant="cards"
        heading="Join Our Upcoming Events"
        count={3}
      />

      <AnnouncementsSection />

      <ChapterSpotlightSection />

      <DonationCtaSection
        variant="fullwidth"
        heading="Make a Difference Today"
        body="Your support enables us to continue our mission of empowering the next generation of students at PCSS Buea."
        colorScheme="white"
      />

      <GalleryStripSection />
    </>
  );
}
