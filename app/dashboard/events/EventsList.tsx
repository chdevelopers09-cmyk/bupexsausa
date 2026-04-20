'use client';

import { useState } from 'react';
import { Calendar, MapPin, Clock, ExternalLink, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function EventsList({ initialRsvps, memberId }: { initialRsvps: any[], memberId: string }) {
  const [rsvps, setRsvps] = useState(initialRsvps);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const supabase = createClient();

  const now = new Date();

  // Filter events that actually exist (handling deleted events gracefully)
  const validRsvps = rsvps.filter(r => r.events != null);

  const upcomingEvents = validRsvps.filter(r => new Date(r.events.start_datetime) >= now);
  const pastEvents = validRsvps.filter(r => new Date(r.events.start_datetime) < now);

  const displayEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  const handleCancelRsvp = async (eventId: string, rsvpId: string) => {
    if (!confirm('Are you sure you want to cancel your RSVP to this event?')) return;
    
    setCancellingId(rsvpId);
    try {
      const { error } = await supabase
        .from('rsvps')
        .delete()
        .eq('id', rsvpId);
        
      if (error) throw error;
      
      // Update local state
      setRsvps(prev => prev.filter(r => r.id !== rsvpId));
    } catch (error) {
      console.error('Error cancelling RSVP:', error);
      alert('Failed to cancel RSVP. Please try again.');
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex border-b border-gray-50">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={cn(
            "flex-1 py-4 text-sm font-bold transition-all",
            activeTab === 'upcoming' ? "text-primary border-b-2 border-primary bg-primary/5" : "text-gray-400 hover:text-dark hover:bg-gray-50/50"
          )}
        >
          Upcoming Events ({upcomingEvents.length})
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={cn(
            "flex-1 py-4 text-sm font-bold transition-all",
            activeTab === 'past' ? "text-primary border-b-2 border-primary bg-primary/5" : "text-gray-400 hover:text-dark hover:bg-gray-50/50"
          )}
        >
          Past Events ({pastEvents.length})
        </button>
      </div>

      <div className="p-8">
        {displayEvents.length > 0 ? (
          <div className="space-y-6">
            {displayEvents.map((rsvp) => {
              const event = rsvp.events;
              const startDate = new Date(event.start_datetime);
              return (
                <div key={rsvp.id} className="group p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-xl hover:border-primary/20 transition-all duration-300 md:flex items-center justify-between gap-6">
                  <div className="flex items-center gap-6 mb-6 md:mb-0">
                    <div className="h-20 w-20 rounded-2xl bg-purple-50 flex flex-col items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <span className="text-xs font-black uppercase leading-none">{startDate.toLocaleDateString('en-US', { month: 'short' })}</span>
                      <span className="text-3xl font-black">{startDate.getDate()}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-dark mb-2">{event.title}</h3>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {event.location_name}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-gray-400" />
                          {startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 md:w-auto w-full justify-between md:justify-end">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shrink-0",
                      activeTab === 'upcoming' 
                        ? "bg-green-50 text-green-600 border-green-100" 
                        : "bg-gray-50 text-gray-500 border-gray-200"
                    )}>
                      {activeTab === 'upcoming' ? 'CONFIRMED' : 'ATTENDED'}
                    </span>
                    
                    <div className="flex gap-2">
                       <Link href={`/events/${event.slug}`} target="_blank" className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:text-primary hover:border-primary transition-colors bg-white shadow-sm hover:shadow-md" title="View Event Page">
                         <ExternalLink className="h-5 w-5" />
                       </Link>
                       {activeTab === 'upcoming' && (
                         <button 
                           title="Cancel RSVP"
                           onClick={() => handleCancelRsvp(event.id, rsvp.id)}
                           disabled={cancellingId === rsvp.id}
                           className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-500 hover:bg-red-50 transition-colors bg-white shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                         >
                           {cancellingId === rsvp.id ? (
                              <div className="h-5 w-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                           ) : (
                              <XCircle className="h-5 w-5" />
                           )}
                         </button>
                       )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="h-24 w-24 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6">
               <Calendar className="h-10 w-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-dark mb-2">No {activeTab} events</h3>
            <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
              {activeTab === 'upcoming' 
                ? "You haven't RSVP'd to any upcoming events yet. Check out the events page to see what's happening."
                : "You don't have any past events in your history."
              }
            </p>
            {activeTab === 'upcoming' && (
               <Link href="/events" className="btn-primary mt-8 inline-flex">
                 Browse Events
               </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
