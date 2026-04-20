import HeroSection from '@/components/sections/HeroSection';
import DonationFormClient from './DonationFormClient';
import TestimonialSection from '@/components/sections/TestimonialSection';
import ImageTextSection from '@/components/sections/ImageTextSection';

export const metadata = {
  title: 'Make a Donation | BUPEXSA USA',
  description: 'Support BUPEXSA USA and give back to PCSS Buea through scholarships, infrastructure, and educational resources.',
};

export default function DonationsPage() {
  return (
    <>
      <HeroSection
        variant="centered-primary"
        heading="Support the Legacy"
        subheading="Your contributions directly fund scholarships, infrastructure, and educational resources for students at PCSS Buea."
        badge="Give Back to PCSS Buea"
        cta1Label="Donate Now"
        cta1Url="#donate-form"
        cta2Label="See Impact"
        cta2Url="#impact"
      />

      <DonationFormClient />

      <ImageTextSection
        variant="image-left"
        bodyTitle="Transparency & Impact"
        body={`
          <p>We pride ourselves on the direct impact of your donations. 100% of funds designated for school projects are used for those projects, with regular financial reporting provided to all donors.</p>
          <p>From providing clean water systems to equipping the computer lab, your support is transforming the learning environment at PCSS Buea for hundreds of students every year.</p>
        `}
        image="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000"
      />

      <TestimonialSection />
    </>
  );
}
