import HeroSection from '@/components/sections/HeroSection';
import ContactFormSection from '@/components/sections/ContactFormSection';

export const dynamic = 'force-dynamic';


export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the BUPEXSA USA national board.',
};

export default function ContactPage() {
  return (
    <>
      <HeroSection
        variant="centered-primary"
        heading="Get in Touch"
        subheading="Whether you have questions about membership, chapters, or donating, our national board is here to help."
        badge="Connect with Us"
      />

      <ContactFormSection />
    </>
  );
}
