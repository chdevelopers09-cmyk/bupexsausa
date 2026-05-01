import HeroSection from '@/components/sections/HeroSection';
import ContactFormSection from '@/components/sections/ContactFormSection';
import ImageTextSection from '@/components/sections/ImageTextSection';

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

      <ImageTextSection
        variant="image-left"
        bodyTitle="Visit Us at the Next Convention"
        body={`
          <p>The best way to connect is in person! Join us at our next national convention to meet the leadership and fellow alumni.</p>
        `}
        image="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1000"
      />
    </>
  );
}
