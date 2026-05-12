'use client';

import { useState } from 'react';
import { Palette, Type, Layout as LayoutIcon, LayoutGrid, Eye, Save, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ThemeEditor() {
  const [primaryColor, setPrimaryColor] = useState('#6B21A8');
  const [accentColor, setAccentColor] = useState('#0EA5E9');
  const [headingFont, setHeadingFont] = useState('Inter');
  const [bodyFont, setBodyFont] = useState('Inter');

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
         <h1 className="text-3xl font-black text-slate-900">Theme Editor</h1>
         <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition-all">
               <RotateCcw className="h-4 w-4" /> Reset Defaults
            </button>
            <button className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold bg-primary text-white shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
               <Save className="h-4 w-4" /> Save & Apply
            </button>
         </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
         {/* Controls */}
         <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-shadow shadow-sm space-y-8">
               {/* Colors */}
               <div className="space-y-6">
                  <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-slate-400">
                     <Palette className="h-4 w-4" /> Brand Colors
                  </div>

                  <div className="space-y-4">
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600 block">Primary Brand Color</label>
                        <div className="flex items-center gap-3">
                           <input
                             type="color"
                             value={primaryColor}
                             onChange={(e) => setPrimaryColor(e.target.value)}
                             className="h-12 w-12 rounded-lg border-2 border-slate-100 p-1 cursor-pointer"
                           />
                           <input
                             type="text"
                             value={primaryColor}
                             onChange={(e) => setPrimaryColor(e.target.value)}
                             className="flex-1 input-field"
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600 block">Accent Color</label>
                        <div className="flex items-center gap-3">
                           <input
                             type="color"
                             value={accentColor}
                             onChange={(e) => setAccentColor(e.target.value)}
                             className="h-12 w-12 rounded-lg border-2 border-slate-100 p-1 cursor-pointer"
                           />
                           <input
                             type="text"
                             value={accentColor}
                             onChange={(e) => setAccentColor(e.target.value)}
                             className="flex-1 input-field"
                           />
                        </div>
                     </div>
                  </div>
               </div>

               <div className="h-px bg-slate-50"></div>

               {/* Typography */}
               <div className="space-y-6">
                  <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-slate-400">
                     <Type className="h-4 w-4" /> Typography
                  </div>

                  <div className="space-y-4">
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600 block">Heading Font</label>
                        <select
                           className="input-field cursor-pointer"
                           value={headingFont}
                           onChange={(e) => setHeadingFont(e.target.value)}
                        >
                           <option>Inter</option>
                           <option>Roboto</option>
                           <option>Outfit</option>
                           <option>Poppins</option>
                           <option>Montserrat</option>
                        </select>
                     </div>

                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600 block">Body Font</label>
                        <select
                           className="input-field cursor-pointer"
                           value={bodyFont}
                           onChange={(e) => setBodyFont(e.target.value)}
                        >
                           <option>Inter</option>
                           <option>Roboto</option>
                           <option>Open Sans</option>
                           <option>Lato</option>
                           <option>System Default</option>
                        </select>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Preview Area */}
         <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Live Preview</h3>
               <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <Eye className="h-3 w-3" /> Auto-rendering
               </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-1 shadow-2xl border border-slate-200 aspect-[16/10] overflow-hidden flex flex-col">
               <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-6 gap-2 shrink-0">
                  <div className="flex gap-1.5">
                     <div className="h-3 w-3 rounded-full bg-red-400" />
                     <div className="h-3 w-3 rounded-full bg-orange-400" />
                     <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <div className="mx-auto bg-white px-4 py-1 rounded-full text-[10px] font-medium text-slate-400 border border-slate-200">
                     bupexsausa.org/preview
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto bg-gray-50">
                  <div className="p-12 space-y-12">
                     <div className="space-y-4">
                        <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest" style={{ background: `${primaryColor}20`, color: primaryColor }}>Preview Hero</span>
                        <h1 className="text-5xl font-black text-slate-900 leading-tight" style={{ fontFamily: headingFont }}>
                           Connect. Give. Grow.
                        </h1>
                        <p className="max-w-md text-slate-500 leading-relaxed" style={{ fontFamily: bodyFont }}>
                           Join the BUPEXSA USA alumni community and stay connected with graduates across the nation.
                        </p>
                        <div className="pt-4 flex gap-4">
                           <button className="px-8 py-3 rounded-xl font-bold text-white shadow-xl" style={{ backgroundColor: primaryColor }}>
                              Action Button
                           </button>
                           <button className="px-8 py-3 rounded-xl font-bold border-2 transition-colors" style={{ color: primaryColor, borderColor: primaryColor }}>
                              Secondary
                           </button>
                        </div>
                     </div>

                     <div className="grid grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                           <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-lg">
                              <div className="h-10 w-10 rounded-xl mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                                 <LayoutGrid className="h-5 w-5 m-2.5" />
                              </div>
                              <h4 className="font-bold mb-2">Feature {i}</h4>
                              <div className="h-2 w-full bg-slate-100 rounded-full mb-2" />
                              <div className="h-2 w-2/3 bg-slate-100 rounded-full" />
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
