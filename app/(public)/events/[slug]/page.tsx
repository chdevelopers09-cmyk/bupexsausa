import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, MapPin, Users, Clock, ArrowLeft, Share2, CheckCircle, Trophy, Utensils, GraduationCap } from 'lucide-react';
import { MOCK_EVENTS } from '@/lib/mock-data';

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = MOCK_EVENTS.find(e => e.slug === slug);
  if (!event) return {};
  return {
    title: `${event.title} | BUPEXSA USA`,
    description: event.description,
    openGraph: { title: event.title, images: [event.thumbnail_path] },
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = MOCK_EVENTS.find(e => e.slug === slug);

  if (!event) notFound();

  const eventDate = new Date(event.start_datetime);
  const endDate = event.end_datetime ? new Date(event.end_datetime) : null;
  const capacityPercent = event.max_attendees
    ? Math.round((event.rsvp_count / event.max_attendees) * 100)
    : 0;
  const isSoldOut = event.max_attendees ? event.rsvp_count >= event.max_attendees : false;

  const categoryColors: Record<string, string> = {
    Gala: 'bg-purple-100 text-purple-700 border-purple-200',
    Social: 'bg-blue-100 text-blue-700 border-blue-200',
    Fundraiser: 'bg-green-100 text-green-700 border-green-200',
    Meeting: 'bg-orange-100 text-orange-700 border-orange-200',
  };

  const relatedEvents = MOCK_EVENTS.filter(e => e.slug !== slug && e.category === event.category).slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-[55vh] min-h-[400px] bg-dark overflow-hidden">
        <img
          src={event.thumbnail_path}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-24 left-0 right-0 container-wide">
          <Link href="/events" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-bold group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> All Events
          </Link>
        </div>

        {/* Event Title */}
        <div className="absolute bottom-0 left-0 right-0 container-wide pb-12">
          <span className={`inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${categoryColors[event.category] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
            {event.category}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight max-w-4xl">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm font-medium">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-accent" />
              {eventDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent" />
              {eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              {endDate && ` – ${endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" />
              {event.location_name}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-wide py-16">
        <div className="grid lg:grid-cols-3 gap-16">

          {/* Left: Description */}
          <div className="lg:col-span-2 space-y-12">
            {/* About */}
            <div>
              <h2 className="text-2xl font-black text-dark mb-6 pb-4 border-b border-gray-100">About This Event</h2>
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-4">
                <p>{event.description || 'Join us for this exciting BUPEXSA USA event. Details will be updated soon. All active members are encouraged to attend and bring their families.'}</p>
                <p>This event is a cornerstone of our mission to foster community, celebrate excellence, and give back to PCSS Buea. Whether you are a long-time member or a new face, you will find a warm and welcoming environment.</p>
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-2xl font-black text-dark mb-6 pb-4 border-b border-gray-100">Location</h2>
              <div className="bg-gray-50 rounded-3xl p-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-black text-dark text-lg">{event.location_name}</p>
                    {event.location_address && (
                      <p className="text-gray-500 mt-1">{event.location_address}</p>
                    )}
                  </div>
                </div>
                {/* Map Embed Placeholder */}
                <div className="h-56 bg-white rounded-2xl border border-gray-200 flex items-center justify-center text-gray-400 mt-4 overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    title="Event Location"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(event.location_address || event.location_name)}&output=embed`}
                    className="border-0 rounded-2xl"
                  />
                </div>
              </div>
            </div>

            {/* What to Expect */}
            <div>
              <h2 className="text-2xl font-black text-dark mb-6 pb-4 border-b border-gray-100">What to Expect</h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { icon: <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0"><Users className="h-6 w-6" /></div>, title: 'Alumni Networking', desc: 'Reconnect with classmates from every era of PCSS Buea.' },
                  { icon: <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0"><Trophy className="h-6 w-6" /></div>, title: 'Awards & Recognition', desc: 'Celebrate the achievements of outstanding alumni.' },
                  { icon: <div className="h-12 w-12 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0"><GraduationCap className="h-6 w-6" /></div>, title: 'Scholarship Updates', desc: 'Hear about the impact of your contributions on students.' },
                  { icon: <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0"><Utensils className="h-6 w-6" /></div>, title: 'Gala Dinner', desc: 'A premium dining experience in an elegant setting.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-2 group">
                    {item.icon}
                    <div>
                      <p className="font-black text-dark mb-1 group-hover:text-primary transition-colors">{item.title}</p>
                      <p className="text-sm text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Events */}
            {relatedEvents.length > 0 && (
              <div>
                <h2 className="text-2xl font-black text-dark mb-6 pb-4 border-b border-gray-100">More Events</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {relatedEvents.map(e => (
                    <Link key={e.id} href={`/events/${e.slug}`} className="group flex gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg transition-all hover:border-primary/20">
                      <div className="h-16 w-16 rounded-xl overflow-hidden shrink-0">
                        <img src={e.thumbnail_path} alt={e.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">{new Date(e.start_datetime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        <h3 className="font-bold text-dark text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">{e.title}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: RSVP Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* RSVP Card */}
              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-8 space-y-6">
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Date & Time</p>
                  <p className="text-2xl font-black text-dark">{eventDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  <p className="text-gray-500 font-medium mt-1">{eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>

                <div className="h-px bg-gray-50" />

                {/* Attendee count */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm font-bold text-dark">
                      <Users className="h-4 w-4 text-primary" />
                      <span>{event.rsvp_count} attending</span>
                    </div>
                    {event.max_attendees && (
                      <span className="text-xs text-gray-400 font-medium">{event.max_attendees - event.rsvp_count} spots left</span>
                    )}
                  </div>
                  {event.max_attendees && (
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-primary to-accent transition-all"
                        style={{ width: `${Math.min(capacityPercent, 100)}%` }}
                      />
                    </div>
                  )}
                </div>

                <div className="h-px bg-gray-50" />

                {/* RSVP Action */}
                {isSoldOut ? (
                  <div className="text-center">
                    <p className="font-black text-red-600 mb-3">This event is at capacity</p>
                    <button className="w-full py-4 rounded-2xl border-2 border-red-200 text-red-500 font-bold text-sm cursor-not-allowed opacity-60">
                      Join Waitlist
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link
                      href="/register"
                      className="w-full btn-primary justify-center py-5 text-lg rounded-2xl shadow-2xl shadow-primary/20 text-center block font-black"
                      id="event-rsvp-btn"
                    >
                      RSVP Now — It's Free
                    </Link>
                    <p className="text-center text-xs text-gray-400 font-medium">
                      Members only. <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link> or <Link href="/register" className="text-primary font-bold hover:underline">create an account</Link>
                    </p>
                  </div>
                )}

                {/* Share */}
                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-gray-200 text-sm font-bold text-gray-500 hover:border-primary/30 hover:text-primary transition-all">
                  <Share2 className="h-4 w-4" /> Share Event
                </button>
              </div>

              {/* Quick Info Card */}
              <div className="bg-purple-50 rounded-3xl p-8 space-y-4 border border-purple-100">
                <h3 className="font-black text-dark text-sm uppercase tracking-widest">Event Details</h3>
                {[
                  { label: 'Category', value: event.category },
                  { label: 'Format', value: event.location_name?.toLowerCase().includes('virtual') ? 'Virtual / Online' : 'In-Person' },
                  { label: 'Open To', value: 'BUPEXSA USA Members' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 font-medium">{item.label}</span>
                    <span className="font-bold text-dark">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
