import HeroSection from '@/components/sections/HeroSection';
import TextBlockSection from '@/components/sections/TextBlockSection';
import ImageTextSection from '@/components/sections/ImageTextSection';
import CardGridSection from '@/components/sections/CardGridSection';
import TeamGridSection from '@/components/sections/TeamGridSection';

export const metadata = {
  title: 'About Us',
  description: 'Learn about the history, mission, and leadership of BUPEXSA USA.',
};

export default function AboutPage() {
  return (
    <>
      <HeroSection
        variant="centered-white"
        heading="Our Story, Our Mission"
        subheading="BUPEXSA USA is more than an organization; it's a legacy of friendship and commitment that spans decades and continents."
        badge="About BUPEXSA USA"
      />

      <TextBlockSection
        variant="centered"
        heading="Founded on Excellence"
        subheading="A History of Giving Back"
        body={`
          <p>Founded in 1985, Presbyterian College Secondary School (PCSS) Buea has been a beacon of academic excellence in Cameroon. As graduates moved to the United States to pursue their dreams, the need for a unified platform to maintain those school-day bonds became clear.</p>
          <p>BUPEXSA USA was established to bring together these graduates, ensuring that no matter how many miles we are from PCSS Buea, we remain connected to our roots and committed to the school that shaped us.</p>
        `}
      />

      {/* Vision & Mission — side-by-side in one section */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-dark mb-2">Our Vision</h2>
              <p className="text-primary font-medium mb-4 text-sm uppercase tracking-wide">What We Aspire To Be</p>
              <div className="w-12 h-1 bg-primary rounded-full mb-6" />
              <p className="text-gray-500 text-lg leading-relaxed">
                To build a united, empowered, and compassionate global community of Buea Presbyterian ex-students who embody Christ-centered love, support one another deeply, and contribute meaningfully to society.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-dark mb-2">Our Mission</h2>
              <p className="text-primary font-medium mb-4 text-sm uppercase tracking-wide">What We Set Out To Do</p>
              <div className="w-12 h-1 bg-primary rounded-full mb-6" />
              <p className="text-gray-500 text-lg leading-relaxed">
                To foster fellowship, preserve our shared Presbyterian heritage, and strengthen the bonds among ex-students through service, mutual support, and charitable initiatives rooted in the love of Christ.
              </p>
            </div>

          </div>
        </div>
      </section>

      <ImageTextSection
        variant="image-left"
        bodyTitle="Empowering the Next Generation"
        body={`
          <p>Our primary mission is to support our alma mater, PCSS Buea, through various initiatives. Each year, we provide scholarships to high-achieving students, fund critical infrastructure improvements, and facilitate mentorship programs between alumni and current students.</p>
          <p>We believe that by strengthening the foundation of PCSS Buea, we are ensuring a brighter future for the students who follow in our footsteps.</p>
        `}
        image="/images/about/empowering-generation.jpg"
        ctaLabel="See Our Projects"
        ctaUrl="/donations"
      />

      <CardGridSection
        bgVariant="sky"
        heading="Our Core Values"
        cards={[
          {
            icon: 'award',
            title: 'Integrity',
            body: 'We operate with transparency and accountability in all our endeavors.'
          },
          {
            icon: 'users',
            title: 'Fellowship',
            body: 'We foster a sense of belonging and mutual support among all alumni.'
          },
          {
            icon: 'heart',
            title: 'Philanthropy',
            body: 'We are committed to giving back to our alma mater and communities.'
          }
        ]}
      />

      <TeamGridSection variant="four-col" heading="Executive Branch of Alumni" />
    </>
  );
}
