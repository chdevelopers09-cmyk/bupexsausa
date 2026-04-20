'use client';

import { useState } from 'react';
import {
  GripVertical,
  Eye,
  EyeOff,
  Edit2,
  Copy,
  Trash2,
  Plus,
  Save,
  ArrowLeft,
  Search,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Mock initial layout
const initialSections = [
  { id: '1', type: 'HeroSection', variant: 'centered-primary', name: 'Main Hero', visible: true },
  { id: '2', type: 'StatsBarSection', variant: 'primary', name: 'Member Stats', visible: true },
  { id: '3', type: 'CardGridSection', variant: 'three-col', name: 'Our Values', visible: true },
  { id: '4', type: 'EventsPreviewSection', variant: 'cards', name: 'Upcoming Events', visible: true },
  { id: '5', type: 'AnnouncementsSection', variant: 'standard', name: 'Latest News', visible: false },
  { id: '6', type: 'DonationCtaSection', variant: 'fullwidth', name: 'Support CTA', visible: true },
  { id: '7', type: 'GalleryStripSection', variant: 'strip', name: 'Photo Strip', visible: true },
];

export default function LayoutManager() {
  const [sections, setSections] = useState(initialSections);
  const [activePage, setActivePage] = useState('home');
  const [previewMode, setPreviewMode] = useState('desktop');

  const toggleVisibility = (id: string) => {
    setSections(sections.map(s => s.id === id ? { ...s, visible: !s.visible } : s));
  };

  const deleteSection = (id: string) => {
    if (confirm('Are you sure you want to remove this section from the page?')) {
      setSections(sections.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-primary transition-colors">
               <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
               <h1 className="text-3xl font-black text-slate-900">Page Manager</h1>
               <div className="flex items-center gap-2 mt-1">
                  <Globe className="h-3 w-3 text-slate-400" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Editing Website Structure</span>
               </div>
            </div>
         </div>

         <div className="flex items-center gap-3">
            <div className="bg-white border border-slate-200 rounded-xl p-1 flex mr-3">
               <button
                 onClick={() => setPreviewMode('desktop')}
                 className={cn("p-2 rounded-lg transition-all", previewMode === 'desktop' ? "bg-primary text-white" : "text-slate-400")}
               >
                  <Smartphone className="h-4 w-4 hidden" />
                  <Monitor className="h-4 w-4" />
               </button>
               <button
                 onClick={() => setPreviewMode('mobile')}
                 className={cn("p-2 rounded-lg transition-all", previewMode === 'mobile' ? "bg-primary text-white" : "text-slate-400")}
               >
                  <Smartphone className="h-4 w-4" />
               </button>
            </div>
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-primary text-white shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
               <Save className="h-4 w-4" /> Publish Changes
            </button>
         </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
         {/* Left: Page/Section List */}
         <div className="lg:col-span-12 xl:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
               <div className="p-6 border-b border-slate-50">
                  <div className="flex items-center justify-between mb-6">
                     <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Section Stack</h3>
                     <span className="px-2 py-1 rounded bg-slate-100 text-[10px] font-bold text-slate-500">{sections.length} Sections</span>
                  </div>

                  <div className="space-y-3">
                     {sections.map((section, index) => (
                        <div
                           key={section.id}
                           className={cn(
                              "group flex items-center justify-between bg-white border-2 p-4 rounded-2xl transition-all cursor-move",
                              section.visible ? "border-slate-50 hover:border-primary/20 shadow-sm" : "border-slate-50 opacity-50 grayscale"
                           )}
                        >
                           <div className="flex items-center gap-4 min-w-0">
                              <GripVertical className="h-4 w-4 text-slate-300 shrink-0 group-hover:text-primary transition-colors" />
                              <div className="truncate">
                                 <p className="text-sm font-black text-slate-900 mb-0.5">{section.name}</p>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{section.type} • {section.variant}</p>
                              </div>
                           </div>

                           <div className="flex items-center gap-1 shrink-0 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                 onClick={() => toggleVisibility(section.id)}
                                 className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-primary transition-all"
                                 title={section.visible ? "Hide" : "Show"}
                              >
                                 {section.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                              </button>
                              <Link
                                 href={`/admin/visual-builder/content/${section.id}`}
                                 className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-green-600 transition-all"
                                 title="Edit Content"
                              >
                                 <Edit2 className="h-4 w-4" />
                              </Link>
                              <button
                                 className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-orange-500 transition-all"
                                 title="Duplicate"
                              >
                                 <Copy className="h-4 w-4" />
                              </button>
                              <button
                                 onClick={() => deleteSection(section.id)}
                                 className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-red-500 transition-all"
                                 title="Delete"
                              >
                                 <Trash2 className="h-4 w-4" />
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>

                  <button className="w-full mt-6 py-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 font-bold text-sm hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 group">
                     <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
                     Add Section from Library
                  </button>
               </div>

               <div className="p-6 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="flex -space-x-3">
                        {[1, 2, 3].map(i => (
                           <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 shadow-sm" />
                        ))}
                     </div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Draft edited by 3 admins</p>
                  </div>
                  <button className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest">Discard Draft</button>
               </div>
            </div>
         </div>

         {/* Right: Actual Page Canvas */}
         <div className="lg:col-span-12 xl:col-span-7 bg-white rounded-[2.5rem] shadow-2xl p-1 border border-slate-200 sticky top-28 overflow-hidden h-[800px] flex flex-col">
            <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-6 gap-2 shrink-0">
               <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-orange-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
               </div>
               <div className="mx-auto bg-white px-4 py-1 rounded-full text-[10px] font-medium text-slate-400 border border-slate-200">
                  bupexsausa.org/home
               </div>
            </div>

            <div className={cn(
              "flex-1 overflow-y-auto bg-gray-50 flex justify-center p-2 transition-all duration-300",
              previewMode === 'mobile' ? "px-24" : "p-2"
            )}>
               <div className={cn(
                 "bg-white h-fit shadow-lg transition-all duration-300",
                 previewMode === 'mobile' ? "w-[375px]" : "w-full"
               )}>
                  {/* Mock content representation */}
                  {sections.filter(s => s.visible).map((s, i) => (
                     <div key={s.id} className="relative group/canvas">
                        <div className="w-full min-h-[150px] border-b border-dashed border-slate-100 p-8 flex flex-col items-center justify-center text-center">
                           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-2">{s.name}</p>
                           <h4 className="font-bold text-slate-400">{s.type} :: {s.variant}</h4>
                           <div className="mt-4 flex gap-2 w-full max-w-sm">
                              <div className="h-2 flex-1 bg-slate-50 rounded" />
                              <div className="h-2 flex-1 bg-slate-50 rounded" />
                              <div className="h-2 flex-1 bg-slate-50 rounded" />
                           </div>
                        </div>

                        {/* Overlay actions on canvas */}
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover/canvas:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                           <div className="bg-white px-4 py-2 rounded-full shadow-xl flex items-center gap-3 border border-primary/20 pointer-events-auto">
                              <Link href={`/admin/visual-builder/content/${s.id}`} className="p-1.5 hover:text-primary transition-colors border-r border-slate-100 pr-3">
                                 <Edit2 className="h-4 w-4" />
                              </Link>
                              <span className="text-xs font-bold text-slate-400">Section Content Editor</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

