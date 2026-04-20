'use client';

import { useState } from 'react';
import { 
    Plus, MapPin, Users, Globe, Edit, Trash2, 
    ChevronRight, MoreVertical, ShieldCheck, CheckCircle, 
    XCircle, ArrowUpRight 
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function AdminChaptersClient({ initialChapters }: { initialChapters: any[] }) {
    const [chapters, setChapters] = useState(initialChapters);
    const supabase = createClient();

    const toggleStatus = async (id: string, current: boolean) => {
        const { error } = await supabase.from('chapters').update({ is_active: !current }).eq('id', id);
        if (!error) {
            setEvents(chapters.map(c => c.id === id ? { ...c, is_active: !current } : c));
        }
    };

    function setEvents(arg0: any) {
        setChapters(arg0);
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-end">
                <Link href="/admin/chapters/new" className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all">
                    <Plus size={16} /> Create New Chapter
                </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chapters.map(chapter => (
                    <div key={chapter.id} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-primary/20 transition-all">
                        <div className="h-40 relative overflow-hidden bg-slate-100">
                             <img 
                                src={chapter.banner_image_path || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400'} 
                                alt={chapter.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                            <div className="absolute top-4 right-4">
                                <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md ${chapter.is_active ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'}`}>
                                    {chapter.is_active ? 'Active' : 'Hidden'}
                                </span>
                            </div>
                            <div className="absolute bottom-4 left-6">
                                <h3 className="text-xl font-black text-white leading-tight">{chapter.name}</h3>
                            </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                                    <MapPin size={14} className="text-primary" /> {chapter.state}
                                </div>
                                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                                    <Users size={14} className="text-primary" /> {chapter.member_count || 0} Members
                                </div>
                            </div>

                            <p className="text-[13px] text-slate-600 line-clamp-2 leading-relaxed mb-6">
                                {chapter.description || 'No description provided for this chapter.'}
                            </p>

                            <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-50">
                                <div className="flex items-center gap-2">
                                    <Link 
                                        href={`/admin/chapters/${chapter.id}`}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-white hover:border-primary hover:text-primary hover:shadow-sm transition-all"
                                    >
                                        <Edit size={14} /> Edit Detail
                                    </Link>
                                    <Link href={`/chapters/${chapter.slug}`} target="_blank" className="p-2 text-slate-300 hover:text-primary transition-colors">
                                        <ArrowUpRight size={18} />
                                    </Link>
                                </div>
                                <button className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
