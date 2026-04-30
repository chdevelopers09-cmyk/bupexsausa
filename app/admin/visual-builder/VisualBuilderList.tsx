'use client';

import { useState } from 'react';
import { 
    FileText, Globe, Layout, Edit, 
    Eye, Search, MoreVertical, Settings, 
    ChevronRight, ArrowUpRight 
} from 'lucide-react';
import Link from 'next/link';

export default function VisualBuilderList({ initialPages }: { initialPages: any[] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = initialPages.filter(p => 
        p.page_key?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.slug?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search pages by name or slug..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/10 outline-none transition-shadow"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(page => (
                    <div key={page.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col group hover:border-primary/20 transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="h-12 w-12 rounded-2xl bg-purple-50 text-primary flex items-center justify-center">
                                <FileText size={24} />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${page.is_active ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>
                                    {page.is_active ? 'Online' : 'Draft'}
                                </span>
                            </div>
                        </div>

                        <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors">{page.page_key}</h3>
                        <p className="text-xs text-slate-400 font-mono mt-1">/{page.slug === 'home' ? '' : page.slug}</p>

                        <div className="mt-8 flex items-center gap-3">
                            <Link 
                                href={`/admin/visual-builder/${page.id}`}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#0F172A] text-white rounded-xl text-xs font-bold hover:bg-slate-800 shadow-lg shadow-slate-900/10 transition-all"
                            >
                                <Layout size={14} /> Open Builder
                            </Link>
                            <Link 
                                href={page.slug === 'home' ? '/' : `/${page.slug}`}
                                target="_blank"
                                className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 hover:text-primary hover:border-primary/20 transition-all"
                            >
                                <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
