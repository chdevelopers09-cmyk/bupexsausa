export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home | BUPEXSA USA',
  description: 'The official platform for PCSS Buea Alumni residing in the United States. Reconnect, empower, and support our community.',
};
import StatsBarSection from '@/components/sections/StatsBarSection';
import CardGridSection from '@/components/sections/CardGridSection';
import EventsPreviewSection from '@/components/sections/EventsPreviewSection';
import AnnouncementsSection from '@/components/sections/AnnouncementsSection';
import ChapterSpotlightSection from '@/components/sections/ChapterSpotlightSection';
import DonationCtaSection from '@/components/sections/DonationCtaSection';
import { Heart, ArrowRight, Globe, MapPin } from 'lucide-react';
import GalleryStripSection from '@/components/sections/GalleryStripSection';

export default function Home() {
  return (
    <>
      <HeroSection
        variant="centered-white"
        heading="Connecting PCSS Buea Alumni Across America"
        subheading="Join the official BUPEXSA USA platform to reconnect with former classmates, build professional networks, and give back to our alma mater."
        badge="Official Alumni Platform"
        cta1Label="Join BUPEXSA USA"
        cta1Url="/register"
        cta2Label="Learn Our Mission"
      />

      <section className="relative py-24 bg-slate-950 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5 mix-blend-overlay pointer-events-none" />

        <div className="container-wide relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-sm font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.3)]">
              Our Legacy in Song
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              PCSS Buea <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-accent-light">Anthems</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg md:text-xl font-light">
              Experience the spirit, pride, and history of PCSS Buea through the melodies that unite generations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Current Anthem Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-slate-900 ring-1 ring-white/10 rounded-3xl p-2 md:p-4 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] flex flex-col h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                <div className="flex items-center justify-between p-4 md:px-6 md:pt-4 md:pb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Current School Anthem</h3>
                    <p className="text-sm text-slate-400 font-medium flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Official Association Anthem
                    </p>
                  </div>
                </div>
                <div className="aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-black relative shadow-inner flex-grow">
                  <video
                    controls
                    preload="metadata"
                    className="w-full h-full object-cover"
                  >
                    <source src="/videos/CURRENT-ANTHEM.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>

            {/* Old Anthem Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-slate-600 to-slate-400 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-slate-900 ring-1 ring-white/10 rounded-3xl p-2 md:p-4 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] flex flex-col h-full">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -ml-10 -mt-10 pointer-events-none" />
                <div className="flex items-center justify-between p-4 md:px-6 md:pt-4 md:pb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Old Anthem</h3>
                    <p className="text-sm text-slate-400 font-medium flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-500" /> The Historic Melody
                    </p>
                  </div>
                </div>
                <div className="aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-black relative shadow-inner flex-grow filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-700">
                  <video
                    controls
                    preload="metadata"
                    className="w-full h-full object-cover"
                  >
                    <source src="/videos/OLD-ANTHEM.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsBarSection variant="white" />

      <CardGridSection
        bgVariant="sky"
        heading="Core Values"
        cards={[
          {
            icon: 'shield',
            title: 'Integrity',
            body: 'Upholding the highest moral and ethical standards in all our endeavors.'
          },
          {
            icon: 'users',
            title: 'Fellowship',
            body: 'Fostering deep, meaningful connections among all PCSS Buea alumni.'
          },
          {
            icon: 'heart',
            title: 'Philanthropic Activities',
            body: 'Giving back to our alma mater and supporting our communities through charity.'
          },
          {
            icon: 'globe',
            title: 'Foster Community',
            body: 'Building a strong, supportive network of PCSS Buea alumni residing in the United States.'
          },
          {
            icon: 'bookOpen',
            title: 'Support Education',
            body: 'Providing scholarships and educational support to deserving students at PCSS Buea.'
          },
          {
            icon: 'target',
            title: 'Chapter Growth',
            body: 'Expanding our local chapters to ensure every alumni has a home community in the US.'
          }
        ]}
      />

      <EventsPreviewSection
        variant="cards"
        heading="Join Our Upcoming Events"
        count={3}
      />

      <AnnouncementsSection />

      <ChapterSpotlightSection />

      <section className="section-padding bg-gradient-to-br from-slate-50 via-white to-purple-50/50 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -ml-48 -mb-48" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/images/noise.png')] opacity-[0.03] pointer-events-none" />

        <div className="container-wide relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-dark mb-6">Make a Difference Today</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
              Your support enables us to continue our mission of empowering the next generation of students and strengthening our alumni community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Student Aid Card */}
            <div className="group bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-card hover:shadow-2xl transition-all duration-500 flex flex-col h-full hover:-translate-y-2">
              <div className="h-16 w-16 rounded-2xl bg-purple-50 flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-500 shadow-sm">
                <Heart className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-black text-dark mb-6 leading-tight group-hover:text-primary transition-colors">DONATE TO OUR STUDENT AID ACCOUNT</h3>
              <p className="text-gray-500 text-base leading-relaxed mb-8 flex-grow">
                Your gift helps provide tuition assistance, learning materials, and essential support to students from PCSS Buea who are striving to pursue their education with dignity. Every contribution strengthens our commitment to ensuring that no deserving learner is left behind.
              </p>
              <Link href="/donations" className="btn-primary w-full justify-center group-hover:bg-accent transition-colors">
                Donate Now <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Grant Pools Card */}
            <div className="group bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-card hover:shadow-2xl transition-all duration-500 flex flex-col h-full hover:-translate-y-2">
              <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-500 shadow-sm">
                <Globe className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-black text-dark mb-6 leading-tight group-hover:text-primary transition-colors">DONATE TO OUR GRANT POOLS</h3>
              <p className="text-gray-500 text-base leading-relaxed mb-8 flex-grow">
                Your donation fuels competitive grants that empower alumni-led initiatives, educational programs, and community impact projects across the BUPEXSA USA network. These grants help us uplift lives, expand opportunities, and strengthen the legacy of excellence we inherited from PCSS Buea.
              </p>
              <Link href="/donations" className="btn-primary w-full justify-center group-hover:bg-accent transition-colors">
                Donate Now <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Community Development Card */}
            <div className="group bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-card hover:shadow-2xl transition-all duration-500 flex flex-col h-full hover:-translate-y-2">
              <div className="h-16 w-16 rounded-2xl bg-green-50 flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-500 shadow-sm">
                <MapPin className="h-8 w-8 text-green-600 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-black text-dark mb-6 leading-tight group-hover:text-primary transition-colors">DONATE TO OUR COMMUNITY DEVELOPMENT PROJECTS</h3>
              <p className="text-gray-500 text-base leading-relaxed mb-8 flex-grow">
                Our support enables BUPEXSA USA to invest in sustainable community development efforts that improve living conditions, expand access to resources, and promote long-term well-being. Together, we transform compassion into action and create lasting change for communities connected to our alma mater.
              </p>
              <Link href="/donations" className="btn-primary w-full justify-center group-hover:bg-accent transition-colors">
                Donate Now <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <GalleryStripSection count={18} />
    </>
  );
}
