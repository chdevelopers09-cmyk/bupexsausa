import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Users, ArrowLeft, Mail, Calendar, ExternalLink } from 'lucide-react';
import { MOCK_CHAPTERS, MOCK_LEADERSHIP, MOCK_EVENTS } from '@/lib/mock-data';

import { createAdminClient } from '@/lib/supabase/admin';
import { getImageUrl } from '@/lib/utils';
import ChapterGalleryClient from '@/components/sections/ChapterGalleryClient';

interface ChapterDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ChapterDetailPageProps) {
  const { slug } = await params;
  const supabase = await createAdminClient();
  const { data: chapter } = await supabase.from('chapters').select('name, description').eq('slug', slug).single();
  if (!chapter) return {};
  return {
    title: `${chapter.name} | BUPEXSA USA`,
    description: chapter.description,
  };
}

export default async function ChapterDetailPage({ params }: ChapterDetailPageProps) {
  const { slug } = await params;
  const supabase = await createAdminClient();
  
  const { data: chapter } = await supabase
    .from('chapters')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!chapter) notFound();

  // Filter events for this chapter (by location approximation using state)
  const chapterEvents = MOCK_EVENTS.filter(e =>
    e.location_name?.toLowerCase().includes(chapter.state.toLowerCase().split(',')[0].trim().toLowerCase()) ||
    e.location_address?.toLowerCase().includes(chapter.state.toLowerCase().split(',')[0].trim().toLowerCase())
  ).slice(0, 3);

  const excoMembers = [
    { name: 'TBA', title: 'Chapter President', photo: '/images/leadership/president.jpg' },
    { name: 'TBA', title: 'Chapter Secretary', photo: '/images/leadership/secretary.jpg' },
    { name: 'TBA', title: 'Chapter Treasurer', photo: '/images/leadership/treasurer.jpg' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[380px] overflow-hidden bg-dark">
        {chapter.banner_image_path?.toLowerCase().match(/\.(mp4|webm|ogg)$/) || chapter.banner_image_path?.includes('video') ? (
          <video
            src={getImageUrl(chapter.banner_image_path)}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        ) : (
          <img
            src={chapter.banner_image_path ? getImageUrl(chapter.banner_image_path) : '/images/usa-flag.png'}
            alt={chapter.name}
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-primary/30" />

        <div className="absolute top-24 left-0 right-0 container-wide">
          <Link href="/chapters" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-bold group transition-colors">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> All Chapters
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 container-wide pb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 text-accent text-xs font-black uppercase tracking-widest">
            <MapPin className="h-3 w-3" /> {chapter.state}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">{chapter.name}</h1>
          <div className="flex items-center gap-6 text-white/70 text-sm font-medium">
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4 text-accent" />
              {chapter.member_count}+ Active Members
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-bold border border-green-500/30">
              ● Active Chapter
            </span>
          </div>
        </div>
      </div>

      <div className="container-wide py-16">
        <div className="grid lg:grid-cols-3 gap-16">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">

            {/* About / History */}
            <div>
              {chapter.slug === 'texas' ? (
                <div className="space-y-8">
                  <h2 className="text-2xl font-black text-dark mb-6 pb-4 border-b border-gray-100 uppercase tracking-tight">BUPEXSA Texas: A Brief Historical Account</h2>
                  <div className="space-y-6 text-gray-600 leading-relaxed text-lg font-medium">
                    <p>BUPEXSA Texas was established as a direct response to the challenges faced in building the broader BUPEXSA USA structure in 2022.</p>
                    <p>At the time, the Vice President of BUPEXSA USA, Mr. Chilion Tabe, proposed to the President, Mr. Pancratius Mukeh, that the best way to strengthen BUPEXSA USA was to encourage BUPEXSANS across various cities to gather and form state chapters. Acting on this strategy, the Vice President volunteered to pilot the Dallas chapter while the President reached out to BUPEXSANS in other states and cities. This initiative led to the birth of BUPEXSA Dallas.</p>
                    <p>BUPEXSA Dallas has never had an executive body nor a constitution. However, BUPEXSANS in Dallas consistently gathered informally. Two social gatherings were held at the Vice President’s home. The group also made it a point to celebrate important moments in members’ lives. They gathered at Vanessa’s home to celebrate the birthday of her triplets, at Njita Silas’s home to celebrate the birth of his daughter, and again at the Vice President’s home to celebrate the birth of his son.</p>
                    <p>Given the proximity between Dallas and Houston and the relatively weak level of engagement in Houston at the time the Dallas group decided to extend its reach by visiting and supporting the Houston BUPEXSANS. This collaboration led to the formation of what is now known as BUPEXSA Texas (BUPEXSA TX).</p>
                    <p>Since its formation, BUPEXSA TX has demonstrated remarkable unity and solidarity, despite the absence of a formal executive structure or constitution. The most recent gathering organized by BUPEXSA TX was held in Houston and served as the BUPEXSA USA General Assembly in 2024.</p>
                    <p>With the continued growth and strengthening of BUPEXSA USA, there is every indication that BUPEXSA TX will expand in membership and evolve into a more structured and formalized chapter. I take great pride in spending time with my BUPEXSA TX family and look forward to our future gatherings.</p>
                  </div>
                  
                  <div className="mt-12 flex flex-col sm:flex-row items-center gap-8 p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                    <div className="h-40 w-40 rounded-3xl overflow-hidden border-4 border-white shadow-xl flex-shrink-0 bg-white">
                      <img 
                        src="/images/chapters/texas/chilion-tabe.png" 
                        alt="Chilion Tabe" 
                        className="w-full h-full object-cover object-top" 
                      />
                    </div>
                    <div>
                      <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest mb-1">Author</p>
                      <h4 className="text-dark font-black text-xl mb-1">Chilion Tabe</h4>
                      <p className="text-primary font-bold">PCSS Alumnus</p>
                      <p className="text-gray-400 text-sm italic">Dallas, Texas, USA</p>
                    </div>
                  </div>
                </div>
              ) : chapter.slug === 'maryland-dc' ? (
                <div className="space-y-8">
                  <h2 className="text-2xl font-black text-dark mb-6 pb-4 border-b border-gray-100 uppercase tracking-tight">BUPEXSA DMVS: HOW BUPEXSA DMV CAME INTO EXISTENCE</h2>
                  <div className="space-y-6 text-gray-600 leading-relaxed text-lg font-medium">
                    <p>BUPEXSA DMV emerged from a series of reconnections that began in 2012, when a small number of PCSS Buea Town alumni residing across the Washington D.C., Maryland, and Virginia (DMV) metropolitan corridor unexpectedly crossed paths and rediscovered their shared academic heritage. What initially unfolded as informal exchanges during community gatherings. This early momentum was driven by a renewed determination to identify fellow BUPEXSANS, strengthen interpersonal bonds, and reestablish a collective identity anchored in the distinguished legacy of PCSS Buea Town.</p>
                    <p>The effort to identify and reconnect with fellow alumni unfolded naturally. Each new contact served a dual purpose: strengthening the emerging BUPEXSA DMV network and integrating members into the broader BUPEXSA USA community. This early phase laid the groundwork for a more intentional and cohesive alumni presence in the DMV area.</p>
                    <p>In 2014, BUPEXSA DMV hosted a modest but impactful mini‑convention aimed at revitalizing engagement and reaffirming our shared identity. The gathering demonstrated the potential for a strong, unified chapter. However, despite the enthusiasm generated, the momentum proved difficult to sustain, and subsequent attempts to convene the group did not achieve long‑term continuity.</p>
                    <p>On April 20, 2025, I had the privilege of hosting the first formal BUPEXSA DMV meeting in several years, in Waldorf, Maryland. This gathering marked a significant turning point. It rekindled cherished memories of our alma mater, renewed our sense of belonging, and reaffirmed the value of community among BUPEXSANS in the region. Members exchanged personal stories, reconnected with old friends, and expressed a shared commitment to supporting one another’s professional endeavors, creative pursuits, and personal milestones.</p>
                    <p>As we look ahead, our aspiration is to cultivate a vibrant and enduring BUPEXSA presence in the DMV, one that enriches the lives of its members, contributes meaningfully to the communities we call home, and upholds the distinguished legacy of PCSS Buea Town. With renewed energy and a clear sense of purpose, BUPEXSA DMV stands poised to grow, evolve, and make a lasting impact.</p>
                  </div>
                  
                  <div className="mt-12 flex flex-col sm:flex-row items-center gap-8 p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                    <div className="h-40 w-40 rounded-3xl overflow-hidden border-4 border-white shadow-xl flex-shrink-0 bg-white">
                      <img 
                        src="/images/chapters/dmv/mirabel-frambo.jpg" 
                        alt="Dr. Mrs. Mirabel Tanyi Frambo" 
                        className="w-full h-full object-cover object-top" 
                      />
                    </div>
                    <div>
                      <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest mb-1">Narrator</p>
                      <h4 className="text-dark font-black text-xl mb-1">Dr. Mrs. Mirabel Tanyi Frambo</h4>
                      <p className="text-primary font-bold">PCSS BUEA Alumna</p>
                      <p className="text-gray-400 text-sm italic">Maryland, USA</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-black text-dark mb-6 pb-4 border-b border-gray-100 uppercase tracking-tight">About This Chapter</h2>
                  <p className="text-lg text-gray-600 leading-relaxed font-medium">
                    {chapter.description}
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-4 font-medium">
                    The {chapter.name} is one of BUPEXSA USA's most active regional communities. Members gather regularly for networking mixers, cultural celebrations, and to coordinate local fundraising efforts for PCSS Buea. The chapter is governed by an elected executive committee and operates under the national constitution of BUPEXSA USA.
                  </p>
                </>
              )}
            </div>

            {/* Chapter Videos - Texas */}
            {chapter.slug === 'texas' && (
              <div className="space-y-16">
                <div>
                  <h2 className="text-2xl font-black text-dark mb-8 pb-4 border-b border-gray-100 uppercase tracking-tight">Life at Texas Chapter</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((num) => (
                      <div key={num} className="bg-white rounded-3xl p-3 shadow-xl shadow-primary/5 border border-gray-100 group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                        <div className="aspect-video rounded-2xl overflow-hidden bg-black relative">
                          <video 
                            controls 
                            preload="metadata"
                            className="w-full h-full object-cover"
                          >
                            <source src={`/videos/Chapter-TEXAS-video-${num}.mp4`} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SHARED MEMORIES */}
                <ChapterGalleryClient 
                  title="SHARED MEMORIES OF BUPEXSA TEXAS"
                  images={[
                    '/images/chapters/texas/memory-1.jpg',
                    '/images/chapters/texas/memory-2.jpg',
                    '/images/chapters/texas/memory-3.jpg',
                    '/images/chapters/texas/memory-4.jpg',
                    '/images/chapters/texas/memory-5.jpg',
                    '/images/chapters/texas/memory-6.jpg',
                    '/images/chapters/texas/memory-7.jpg',
                    '/images/chapters/texas/memory-8.jpg',
                    '/images/chapters/texas/memory-9.jpg',
                  ]}
                />
              </div>
            )}

            {/* Local Events */}
            {chapterEvents.length > 0 && (
              <div>
                <h2 className="text-2xl font-black text-dark mb-8 pb-4 border-b border-gray-100">Upcoming Chapter Events</h2>
                <div className="space-y-4">
                  {chapterEvents.map(event => (
                    <Link key={event.id} href={`/events/${event.slug}`} className="flex gap-5 p-5 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all group bg-white">
                      <div className="flex-shrink-0 w-16 text-center">
                        <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                          <div className="bg-primary py-1 text-white text-xs font-black uppercase">
                            {new Date(event.start_datetime).toLocaleDateString('en-US', { month: 'short' })}
                          </div>
                          <div className="bg-white py-2 text-dark text-2xl font-black">
                            {new Date(event.start_datetime).getDate()}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-dark group-hover:text-primary transition-colors text-lg leading-tight mb-1">{event.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{event.location_name}</span>
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" />{event.rsvp_count} RSVPs</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Chapter Videos - DMV */}
            {chapter.slug === 'maryland-dc' && (
              <div className="space-y-16">
                <div>
                  <h2 className="text-2xl font-black text-dark mb-8 pb-4 border-b border-gray-100 uppercase tracking-tight">Life at DC/Maryland/VA Chapter</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((num) => (
                      <div key={num} className="bg-white rounded-3xl p-3 shadow-xl shadow-primary/5 border border-gray-100 group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                        <div className="aspect-video rounded-2xl overflow-hidden bg-black relative">
                          <video 
                            controls 
                            preload="metadata"
                            className="w-full h-full object-cover"
                          >
                            <source src={`/videos/life-at-bupexausa-video-${num}.mp4`} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SHARED MEMORIES */}
                <ChapterGalleryClient 
                  title="SHARED MEMORIES OF BUPEXSA DMV"
                  images={[
                    '/images/chapters/dmv/memory-1.png',
                    '/images/chapters/dmv/memory-2.png',
                    '/images/chapters/dmv/memory-3.png',
                    '/images/chapters/dmv/memory-4.png',
                    '/images/chapters/dmv/memory-5.jpg',
                    '/images/chapters/dmv/memory-6.jpg',
                    '/images/chapters/dmv/memory-7.jpg',
                    '/images/chapters/dmv/memory-8.png',
                    '/images/chapters/dmv/memory-9.png',
                    '/images/chapters/dmv/memory-10.png',
                    '/images/chapters/dmv/memory-11.png',
                    '/images/chapters/dmv/memory-12.png',
                    '/images/gallery/bupexsa-gathering.jpg',
                  ]}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* CTA Card */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-[2.5rem] p-8 text-white space-y-6">
              <div>
                <h3 className="text-xl font-black mb-2">Join the {chapter.name}</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Become a member and connect with fellow PCSS Buea graduates in {chapter.state}.
                </p>
              </div>
              <Link href="/register" className="w-full btn-white justify-center py-4 rounded-2xl text-center block font-black" id={`chapter-${slug}-join-btn`}>
                Register as Member
              </Link>
              <Link href="/login" className="w-full text-center block text-white/60 hover:text-white text-sm font-bold transition-colors">
                Already a member? Log in
              </Link>
            </div>

            {/* Chapter Stats */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 space-y-6">
              <h3 className="font-black text-dark text-sm uppercase tracking-widest">Chapter Stats</h3>
              {[
                { label: 'Active Members', value: `${chapter.member_count}+` },
                { label: 'State', value: chapter.state },
                { label: 'Status', value: '● Active' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between text-sm border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                  <span className="text-gray-500 font-medium">{item.label}</span>
                  <span className="font-black text-dark">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="bg-purple-50 rounded-3xl p-8 border border-purple-100 space-y-4">
              <h3 className="font-black text-dark text-sm uppercase tracking-widest">Contact This Chapter</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Have questions about local events or membership? Reach out to the chapter leadership.
              </p>
              <Link href="/contact" className="btn-primary w-full justify-center py-3 rounded-xl text-sm" id={`chapter-${slug}-contact-btn`}>
                <Mail className="h-4 w-4" /> Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
