import HeroSection from '@/components/sections/HeroSection';
import TeamGridSection from '@/components/sections/TeamGridSection';

export const metadata = {
  title: 'Executive Bench | BUPEXSA USA',
  description: 'Meet the dedicated members of the BUPEXSA USA Executive Bench — the national leadership driving our alumni community forward.',
};

export default function ExecutiveBenchPage() {
  return (
    <>
      <HeroSection
        variant="centered-white"
        heading="Executive Bench"
        subheading="Meet the dedicated volunteers who serve on the BUPEXSA USA national board, leading our alumni community with vision, integrity, and a shared love for PCSS Buea."
        badge="BUPEXSA USA Leadership"
        cta1Label="Contact Us"
        cta1Url="/contact"
        showCta2={false}
      />

      <TeamGridSection variant="four-col" heading="EXECUTIVE BENCH BUPEXSA USA" />
    </>
  );
}
