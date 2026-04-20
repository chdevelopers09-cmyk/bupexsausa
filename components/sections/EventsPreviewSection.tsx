import Link from 'next/link';
import { Calendar, MapPin, Users, ArrowRight, Clock } from 'lucide-react';
import { formatDate, formatDateTime } from '@/lib/utils';
import { MOCK_EVENTS } from '@/lib/mock-data';

interface EventsPreviewProps {
  variant?: 'cards' | 'list';
  heading?: string;
  count?: number;
  ctaLabel?: string;
  ctaUrl?: string;
}

export default function EventsPreviewSection({
  variant = 'cards',
  heading = 'Upcoming Events',
  count = 3,
  ctaLabel = 'View All Events',
  ctaUrl = '/events',
}: EventsPreviewProps) {
  const events = MOCK_EVENTS.slice(0, count);

  const categoryColors: Record<string, string> = {
    Gala: 'bg-purple-100 text-purple-700',
    Social: 'bg-blue-100 text-blue-700',
    Fundraiser: 'bg-green-100 text-green-700',
    Meeting: 'bg-orange-100 text-orange-700',
  };

  if (variant === 'list') {
    return (
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black text-dark">{heading}</h2>
            <Link href={ctaUrl} className="btn-secondary text-sm py-2" id="events-list-cta">
              {ctaLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="flex gap-5 p-5 rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-200 group bg-white"
              >
                {/* Date badge */}
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                    <div className="bg-primary py-1">
                      <p className="text-white text-xs font-semibold uppercase">
                        {new Date(event.start_datetime).toLocaleDateString('en-US', { month: 'short' })}
                      </p>
                    </div>
                    <div className="bg-white py-1.5">
                      <p className="text-dark text-2xl font-black">
                        {new Date(event.start_datetime).getDate()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColors[event.category] || 'bg-gray-100 text-gray-700'}`}>
                      {event.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-dark group-hover:text-primary transition-colors text-lg">{event.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1 flex-wrap">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.location_name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(event.start_datetime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {event.rsvp_count} RSVPs
                    </span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center">
                  <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href={ctaUrl} className="btn-primary" id="events-list-bottom-cta">
              {ctaLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-dark mb-4">{heading}</h2>
            <div className="w-20 h-1.5 bg-primary rounded-full"></div>
            <p className="text-gray-500 max-w-xl mt-6 text-lg">
              Don't miss out on upcoming conventions, fundraisers, and chapter socials happening across the country.
            </p>
          </div>
          <Link href={ctaUrl} className="btn-secondary group" id="events-cards-cta">
            {ctaLabel} <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event) => (
            <Link key={event.id} href={`/events/${event.slug}`} className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-card hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-100" id={`event-card-${event.id}`}>
              {/* Date Badge Overlay */}
              <div className="absolute top-6 left-6 z-20">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-white/50 text-center w-14">
                  <div className="bg-primary py-1 text-[10px] font-black text-white uppercase">{new Date(event.start_datetime).toLocaleDateString('en-US', { month: 'short' })}</div>
                  <div className="py-2 text-xl font-black text-dark">{new Date(event.start_datetime).getDate()}</div>
                </div>
              </div>

              {/* Thumbnail */}
              <div className="h-64 relative overflow-hidden">
                <img 
                  src={event.thumbnail_path} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 right-6">
                   <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-accent text-white shadow-lg">
                     {event.category}
                   </span>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-black text-dark group-hover:text-primary transition-colors mb-4 leading-tight flex-1">
                  {event.title}
                </h3>
                
                <div className="space-y-3 pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                    <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center text-primary">
                       <MapPin className="h-4 w-4" />
                    </div>
                    <span className="truncate">{event.location_name}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                    <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center text-primary">
                       <Users className="h-4 w-4" />
                    </div>
                    <span>{event.rsvp_count} Members Confirmed</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-primary font-black text-sm uppercase tracking-widest">RSVP Details</span>
                  <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center group-hover:translate-x-2 transition-transform shadow-lg shadow-primary/20">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
