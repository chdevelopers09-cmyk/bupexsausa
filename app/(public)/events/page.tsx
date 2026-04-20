import HeroSection from '@/components/sections/HeroSection';
import EventsClient from './EventsClient';

export const metadata = {
  title: 'Events & Reunions | BUPEXSA USA',
  description: 'Upcoming BUPEXSA USA conventions, galas, chapter socials, and reunions across the United States.',
};

export default function EventsPage() {
  return (
    <>
      <HeroSection
        variant="centered-primary"
        heading="Events & Reunions"
        subheading="Stay connected through our national conventions, regional meetings, and community outreach programs."
        badge="Stay Connected"
        cta1Label="Explore Events"
        cta1Url="#events"
        showCta2={false}
      />
      <EventsClient />
    </>
  );
}
