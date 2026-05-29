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
        variant="image-overlay-left"
        backgroundImage="/images/about/empowering-generation.jpg"
        heading={
          <>
            Connecting<br />
            PCSS Buea <span className="text-[#e81b89] italic font-serif">Alumni</span>
          </>
        }
        subheading="Join the official BUPEXSA USA platform to reconnect with former classmates, build professional networks, and give back to our alma mater."
        cta1Label="Join BUPEXSA USA"
        cta1Url="/register"
        showCta2={false}
      />

      <section className="relative py-24 bg-[#f0f9ff] overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5 mix-blend-overlay pointer-events-none" />

        <div className="container-wide relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-sm font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.3)]">
              Our Legacy in Song
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              PCSS Buea <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Anthems</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-light">
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


      <GalleryStripSection count={18} />
    </>
  );
}
