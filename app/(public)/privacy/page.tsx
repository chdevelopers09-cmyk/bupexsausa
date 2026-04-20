import HeroSection from '@/components/sections/HeroSection';

export const metadata = {
  title: 'Privacy Policy | BUPEXSA USA',
};

export default function PrivacyPage() {
  return (
    <>
      <HeroSection
        variant="minimal"
        heading="Privacy Policy"
        subheading="Last updated: April 19, 2026"
      />
      <div className="section-padding bg-white">
        <div className="container-wide max-w-4xl">
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>At BUPEXSA USA, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.</p>
            
            <h2 className="text-2xl font-black text-dark mt-10 mb-4">1. Information We Collect</h2>
            <p>We collect information you provide directly to us during registration, such as your name, email, graduation details, and payment information for membership dues or donations.</p>
            
            <h2 className="text-2xl font-black text-dark mt-10 mb-4">2. How We Use Your Information</h2>
            <p>We use your information to manage your membership, process payments, send event notifications, and improve our services to the alumni community.</p>
            
            <h2 className="text-2xl font-black text-dark mt-10 mb-4">3. Data Security</h2>
            <p>We implement robust security measures, including encryption and secure authentication through Supabase, to protect your data from unauthorized access.</p>
            
            <h2 className="text-2xl font-black text-dark mt-10 mb-4">4. Third-Party Services</h2>
            <p>We use third-party tools like Stripe and PayPal for payment processing. These services have their own privacy policies governing your payment data.</p>
            
            <h2 className="text-2xl font-black text-dark mt-10 mb-4">5. Your Rights</h2>
            <p>You have the right to access, correct, or request deletion of your personal information. Please contact us at privacy@bupexsausa.org for any privacy-related requests.</p>
          </div>
        </div>
      </div>
    </>
  );
}
