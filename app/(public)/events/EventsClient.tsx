'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Users, ArrowRight, Filter, List, Grid3X3 } from 'lucide-react';
import { MOCK_EVENTS } from '@/lib/mock-data';

const CATEGORIES = ['All', 'Gala', 'Social', 'Fundraiser', 'Meeting'];

const categoryColors: Record<string, string> = {
  Gala: 'bg-purple-100 text-purple-700',
  Social: 'bg-blue-100 text-blue-700',
  Fundraiser: 'bg-green-100 text-green-700',
  Meeting: 'bg-orange-100 text-orange-700',
};

export default function EventsPageClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showPast, setShowPast] = useState(false);

  const now = new Date();
  const filtered = MOCK_EVENTS.filter(e => {
    const isPast = new Date(e.start_datetime) < now;
    if (!showPast && isPast) return false;
    if (activeCategory !== 'All' && e.category !== activeCategory) return false;
    return true;
  });

  return (
    <>
      {/* Filter Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-sm">
        <div className="container-wide py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-gray-400 shrink-0" />
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
              <button
                onClick={() => setShowPast(!showPast)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 border ${
                  showPast ? 'border-primary text-primary bg-purple-50' : 'border-gray-200 text-gray-500 hover:border-primary/40'
                }`}
              >
                {showPast ? '✓ ' : ''}Past Events
              </button>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-primary'}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-primary'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid / List */}
      <section className="section-padding bg-gray-50/50">
        <div className="container-wide">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <Calendar className="h-16 w-16 text-gray-200 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-dark mb-3">No Events Found</h3>
              <p className="text-gray-500 mb-8">Try adjusting your filters or check back soon for upcoming events.</p>
              <button onClick={() => { setActiveCategory('All'); setShowPast(false); }} className="btn-primary">
                Clear Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filtered.map(event => {
                const isPast = new Date(event.start_datetime) < now;
                return (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className={`group relative bg-white rounded-[2.5rem] overflow-hidden shadow-card hover:shadow-2xl transition-all duration-500 flex flex-col border border-gray-100 ${isPast ? 'opacity-75' : ''}`}
                    id={`event-card-${event.id}`}
                  >
                    {isPast && (
                      <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-[10px] font-black uppercase tracking-widest">
                        Past Event
                      </div>
                    )}
                    {/* Date Badge */}
                    <div className="absolute top-6 left-6 z-20">
                      <div className="bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg text-center w-14">
                        <div className="bg-primary py-1 text-[10px] font-black text-white uppercase">
                          {new Date(event.start_datetime).toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                        <div className="py-2 text-xl font-black text-dark">
                          {new Date(event.start_datetime).getDate()}
                        </div>
                      </div>
                    </div>

                    <div className="h-64 relative overflow-hidden">
                      <img src={event.thumbnail_path} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                      <div className="absolute bottom-5 right-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-accent text-white`}>{event.category}</span>
                      </div>
                    </div>

                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-xl font-black text-dark group-hover:text-primary transition-colors mb-4 leading-tight flex-1">{event.title}</h3>
                      <div className="space-y-2 pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin className="h-4 w-4 text-primary shrink-0" />
                          <span className="truncate">{event.location_name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Users className="h-4 w-4 text-primary shrink-0" />
                          <span>{event.rsvp_count} Attending</span>
                          {event.max_attendees && <span className="text-gray-400">/ {event.max_attendees} max</span>}
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <span className="text-primary font-black text-sm uppercase tracking-widest">
                          {isPast ? 'View Recap' : 'RSVP Now'}
                        </span>
                        <div className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center group-hover:translate-x-2 transition-transform shadow-md shadow-primary/20">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            // List View
            <div className="space-y-4 max-w-4xl mx-auto">
              {filtered.map(event => {
                const isPast = new Date(event.start_datetime) < now;
                return (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className={`flex gap-6 bg-white p-6 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all group ${isPast ? 'opacity-75' : ''}`}
                  >
                    <div className="h-20 w-20 rounded-2xl overflow-hidden shrink-0">
                      <img src={event.thumbnail_path} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className={`text-xs font-black px-2.5 py-1 rounded-full ${categoryColors[event.category] || 'bg-gray-100 text-gray-700'}`}>{event.category}</span>
                        {isPast && <span className="text-xs text-gray-400 font-bold">Past Event</span>}
                      </div>
                      <h3 className="font-black text-dark group-hover:text-primary transition-colors text-lg leading-tight mb-2">{event.title}</h3>
                      <div className="flex items-center gap-5 text-sm text-gray-500 flex-wrap">
                        <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{new Date(event.start_datetime).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{event.location_name}</span>
                        <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{event.rsvp_count} RSVPs</span>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center shrink-0">
                      <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
