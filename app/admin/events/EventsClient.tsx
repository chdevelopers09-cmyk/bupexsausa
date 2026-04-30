'use client';

import { useState } from 'react';
import { 
    Plus, Calendar, MapPin, Users, MoreVertical, 
    Eye, Edit, Trash2, CheckCircle, XCircle, Search, 
    ChevronRight, ArrowUpRight, Filter, Download 
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function AdminEventsClient({ initialEvents }: { initialEvents: any[] }) {
    const [events, setEvents] = useState(initialEvents);
    const [searchTerm, setSearchTerm] = useState('');
    const supabase = createClient();

    const filtered = events.filter(e => 
        e.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const togglePublish = async (id: string, current: boolean) => {
        const { error } = await supabase.from('events').update({ is_published: !current }).eq('id', id);
        if (!error) {
            setEvents(events.map(e => e.id === id ? { ...e, is_published: !current } : e));
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header / Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search events by title..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/10 outline-none transition-shadow"
                    />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                        <Download size={14} /> Export RSVPs
                    </button>
                    <Link href="/admin/events/new" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all">
                        <Plus size={16} /> Create Event
                    </Link>
                </div>
            </div>

            {/* Event Cards */}
            <div className="grid lg:grid-cols-2 gap-6">
                {filtered.map(event => (
                    <div key={event.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col sm:flex-row group hover:border-primary/20 transition-all">
                        <div className="sm:w-48 h-48 relative overflow-hidden shrink-0">
                            <img 
                                src={event.thumbnail_path || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400'} 
                                alt={event.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-3 left-3 flex flex-col">
                                <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md ${event.is_published ? 'bg-emerald-500 text-white' : 'bg-slate-500/80 text-white'}`}>
                                    {event.is_published ? 'Published' : 'Draft'}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col min-w-0">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-black text-slate-900 truncate pr-6 group-hover:text-primary transition-colors">{event.title}</h3>
                                <div className="relative group/menu">
                                    <button className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-4 mt-1 text-xs text-slate-500 font-medium">
                                <span className="flex items-center gap-1.5"><Calendar size={13} className="text-primary" /> {new Date(event.start_datetime).toLocaleDateString()}</span>
                                <span className="flex items-center gap-1.5"><MapPin size={13} className="text-primary" /> {event.location_name}</span>
                                <span className="flex items-center gap-1.5 font-bold text-slate-700"><Users size={13} className="text-primary" /> {event.rsvp_count || 0} RSVPs</span>
                            </div>

                            <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-50">
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={() => togglePublish(event.id, event.is_published)}
                                        className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-colors ${event.is_published ? 'text-amber-600 hover:text-amber-700' : 'text-emerald-600 hover:text-emerald-700'}`}
                                    >
                                        {event.is_published ? <XCircle size={12} /> : <CheckCircle size={12} />}
                                        {event.is_published ? 'Unpublish' : 'Publish Now'}
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link 
                                        href={`/admin/events/${event.id}`}
                                        className="p-2 border border-slate-100 rounded-lg hover:bg-slate-50 hover:border-primary/20 text-slate-400 hover:text-primary transition-all"
                                    >
                                        <Edit size={14} />
                                    </Link>
                                    <Link 
                                        href={`/events/${event.slug}`}
                                        target="_blank"
                                        className="p-2 border border-slate-100 rounded-lg hover:bg-slate-50 hover:border-primary/20 text-slate-400 hover:text-primary transition-all"
                                    >
                                        <Eye size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
