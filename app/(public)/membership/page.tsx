import HeroSection from '@/components/sections/HeroSection';
import ImageTextSection from '@/components/sections/ImageTextSection';
import CardGridSection from '@/components/sections/CardGridSection';
import StatsBarSection from '@/components/sections/StatsBarSection';
import FaqSection from '@/components/sections/FaqSection';
import DonationCtaSection from '@/components/sections/DonationCtaSection';

export const metadata = {
  title: 'Membership',
  description: 'Join BUPEXSA USA and become part of our alumni legacy.',
};

import { createAdminClient } from '@/lib/supabase/admin';

export default async function MembershipPage() {
  const supabase = await createAdminClient();
  const { data: settingsData } = await supabase.from('site_settings').select('key, value');
  const settings = settingsData?.reduce((acc: any, s: any) => ({ ...acc, [s.key]: s.value }), {}) || {};
  const annualFee = settings.membership_fee || 100;

  return (
    <>
      <HeroSection
        variant="centered-primary"
        heading="Join the Elite Network"
        subheading="Membership in BUPEXSA USA is open to all graduates of PCSS Buea residing in the United States. Reconnect, give back, and grow."
        badge="BUPEXSA USA Membership"
        cta1Label="Start Registration"
        cta1Url="/register"
      />

      <StatsBarSection variant="primary" />

      <ImageTextSection
        variant="image-right"
        bodyTitle="Why Join BUPEXSA USA?"
        body={`
          <p>Being a member of BUPEXSA USA is about more than just a title. It's about being part of a brotherhood and sisterhood that started at PCSS Buea and continues to thrive across the Atlantic.</p>
          <ul class="list-disc pl-5 mt-4 space-y-2">
            <li>Professional networking with alumni in diverse fields.</li>
            <li>Direct impact on the development of PCSS Buea.</li>
            <li>Access to regional chapter events and national galas.</li>
            <li>Voting rights in national and regional elections.</li>
          </ul>
        `}
        image="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1000"
      />

      <CardGridSection
        heading="Membership Benefits"
        cards={[
          {
            icon: 'globe',
            title: 'Global Outreach',
            body: 'Connect with fellow alumni across all 50 states.'
          },
          {
            icon: 'award',
            title: 'Prestige',
            body: 'Be part of an organization recognized for its philanthropic excellence.'
          },
          {
            icon: 'calendar',
            title: 'Exclusive Events',
            body: 'Invitations to our highly anticipated biennial national conventions.'
          }
        ]}
      />

      <FaqSection 
        heading="Membership FAQ"
        faqs={[
          {
            question: "Who can join BUPEXSA USA?",
            answer: "Any person who attended or graduated from Presbyterian College Secondary School (PCSS) Buea and currently resides in the USA."
          },
          {
            question: "What are the membership dues?",
            answer: `National annual dues are currently $${annualFee} per member, used to fund operational costs and school projects.`
          },
          {
            question: "How long does registration take?",
            answer: "The online form takes 5 minutes. Approval typically takes 24-48 hours after verification by our national board."
          }
        ]}
      />

      <DonationCtaSection 
        variant="fullwidth"
        heading="Ready to Join the Legacy?"
        body="Take the first step today and secure your membership in the fastest-growing Cameroonian alumni association in the US."
        buttonLabel="Register Now"
      />
    </>
  );
}
