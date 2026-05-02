import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Users, ArrowLeft, Mail, Calendar, ExternalLink } from 'lucide-react';
import { MOCK_CHAPTERS, MOCK_LEADERSHIP, MOCK_EVENTS } from '@/lib/mock-data';

import { createAdminClient } from '@/lib/supabase/admin';
import { getImageUrl } from '@/lib/utils';

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
            src={getImageUrl(chapter.banner_image_path) || '/images/leadership/president.jpg'}
            alt={chapter.name}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
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

            {/* About */}
            <div>
              <h2 className="text-2xl font-black text-dark mb-6 pb-4 border-b border-gray-100">About This Chapter</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {chapter.description}
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                The {chapter.name} is one of BUPEXSA USA's most active regional communities. Members gather regularly for networking mixers, cultural celebrations, and to coordinate local fundraising efforts for PCSS Buea. The chapter is governed by an elected executive committee and operates under the national constitution of BUPEXSA USA.
              </p>
            </div>

            {/* EXCO */}
            <div>
              <h2 className="text-2xl font-black text-dark mb-8 pb-4 border-b border-gray-100">Chapter Leadership (EXCO)</h2>
              <div className="grid sm:grid-cols-3 gap-8">
                {excoMembers.map((member, i) => (
                  <div key={i} className="text-center group">
                    <div className="relative mb-4 mx-auto w-28 h-28">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity" />
                      <div className="relative h-28 w-28 rounded-full overflow-hidden border-4 border-white shadow-xl">
                        <img src={member.photo} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    </div>
                    <h3 className="font-black text-dark group-hover:text-primary transition-colors">{member.name}</h3>
                    <p className="text-primary text-sm font-semibold mt-1">{member.title}</p>
                  </div>
                ))}
              </div>
            </div>

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
