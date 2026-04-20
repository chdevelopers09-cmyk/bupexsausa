import HeroSection from '@/components/sections/HeroSection';

export const metadata = {
  title: 'Terms of Service | BUPEXSA USA',
};

export default function TermsPage() {
  return (
    <>
      <HeroSection
        variant="minimal"
        heading="Terms of Service"
        subheading="Last updated: April 19, 2026"
      />
      <div className="section-padding bg-white">
        <div className="container-wide max-w-4xl">
          <div className="prose prose-lg max-w-none text-gray-600">
            <h2 className="text-2xl font-black text-dark mt-0 mb-4">1. Acceptance of Terms</h2>
            <p>By registering for an account or using the BUPEXSA USA website, you agree to comply with these Terms of Service.</p>
            
            <h2 className="text-2xl font-black text-dark mt-10 mb-4">2. Membership Eligibility</h2>
            <p>Membership is open to alumni of PCSS Buea. We reserve the right to verify your alumni status and revoke membership if inaccurate information is provided.</p>
            
            <h2 className="text-2xl font-black text-dark mt-10 mb-4">3. Payment & Dues</h2>
            <p>Membership dues are non-refundable. Donations are voluntary and 100% of designated funds support PCSS Buea initiatives as described on our platform.</p>
            
            <h2 className="text-2xl font-black text-dark mt-10 mb-4">4. Code of Conduct</h2>
            <p>All members are expected to interact respectfully within the community. Harassment, hate speech, or misuse of the platform for personal gain is strictly prohibited.</p>
            
            <h2 className="text-2xl font-black text-dark mt-10 mb-4">5. Limitation of Liability</h2>
            <p>BUPEXSA USA is not liable for any direct or indirect damages resulting from your use of the website or participation in alumni events.</p>
            
            <h2 className="text-2xl font-black text-dark mt-10 mb-4">6. Amendments</h2>
            <p>We may update these terms from time to time. Your continued use of the platform after updates constitutes acceptance of the new terms.</p>
          </div>
        </div>
      </div>
    </>
  );
}
