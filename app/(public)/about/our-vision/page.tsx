import HeroSection from '@/components/sections/HeroSection';

export const metadata = {
  title: 'Our Vision | BUPEXSA USA',
  description: 'Our vision is to be the premier alumni association that unites all BUPEXSANS in the USA.',
};

export default function OurVisionPage() {
  return (
    <>
      <HeroSection
        variant="centered-white"
        heading="Our Vision"
        subheading="A unified community leaving a lasting legacy of support and infrastructural development for PCSS Buea Town."
        badge="About BUPEXSA USA"
      />
      <section className="section-padding bg-gray-50">
        <div className="container-wide text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] bg-primary/10 text-primary mb-6">
            Future
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-dark mb-6">OUR VISION</h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-gray-600 leading-relaxed font-medium">
            To be the premier alumni association that unites all BUPEXSANS in the USA, leaving a lasting legacy of support, professional growth, and infrastructural development for PCSS Buea Town and future generations.
          </p>
        </div>
      </section>
    </>
  );
}
