import HeroSection from '@/components/sections/HeroSection';

export const metadata = {
  title: 'Our Mission | BUPEXSA USA',
  description: 'Our mission is to connect and empower PCSS Buea graduates residing in the United States.',
};

export default function OurMissionPage() {
  return (
    <>
      <HeroSection
        variant="centered-white"
        heading="Our Mission"
        subheading="Connecting and empowering Presbyterian Comprehensive Secondary School Buea graduates residing in the United States."
        badge="About BUPEXSA USA"
      />
      <section className="section-padding bg-white">
        <div className="container-wide text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] bg-primary/10 text-primary mb-6">
            Purpose
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-dark mb-6">OUR MISSION</h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-gray-600 leading-relaxed font-medium">
            To connect and empower Presbyterian Comprehensive Secondary School Buea graduates residing in the United States, fostering a strong community, promoting excellence, and giving back to our alma mater through impactful initiatives.
          </p>
        </div>
      </section>
    </>
  );
}
