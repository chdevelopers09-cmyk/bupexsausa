'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  Type, 
  Link as LinkIcon, 
  Eye,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { saveSectionContent } from '../../actions';

export default function ContentEditor() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [section, setSection] = useState<any>(null);
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    async function fetchSection() {
      const { data, error } = await supabase
        .from('page_layouts')
        .select('*')
        .eq('id', params.id)
        .single();

      if (data) {
        setSection(data);
        setContent(data.content || {});
      }
      setLoading(false);
    }
    fetchSection();
  }, [params.id]);

  const handleSave = async () => {
    setSaving(true);
    const res = await saveSectionContent(params.id as string, content);
    setSaving(false);
    if (res.error) alert(res.error);
    else alert('Content saved as draft!');
  };

  const updateField = (key: string, value: string) => {
    setContent({ ...content, [key]: value });
  };

  if (loading) return <div className="p-20 text-center font-bold text-slate-400">Loading editor...</div>;
  if (!section) return <div className="p-20 text-center font-bold text-red-400">Section not found</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin/visual-builder/layout" className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900">{section.component}</h1>
              <span className="px-2 py-0.5 bg-purple-50 text-primary text-[10px] font-black rounded uppercase tracking-widest">{section.variant}</span>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Editing Content Instance</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
           <button 
             onClick={() => window.open('/', '_blank')}
             className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors"
           >
              <Eye className="h-4 w-4" /> Preview Page
           </button>
           <button 
             onClick={handleSave}
             disabled={saving}
             className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-primary text-white shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
           >
              {saving ? 'Saving...' : <><Save className="h-4 w-4" /> Save Content</>}
           </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 p-10">
        {/* Left: Editor Panels */}
        <div className="lg:col-span-12 xl:col-span-6 space-y-8">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
            <div className="p-8 border-b border-slate-50 bg-slate-50/50">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Text Content</h3>
              <p className="text-xs text-slate-400 font-bold mt-1">Manage all text strings for this section</p>
            </div>

            <div className="p-10 space-y-8">
               <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Type className="h-3 w-3" /> Section Title
                  </label>
                  <input 
                    type="text" 
                    value={content.title || ''} 
                    onChange={(e) => updateField('title', e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:border-primary/20 outline-none transition-all"
                    placeholder="Enter heading..."
                  />
               </div>

               <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Sparkles className="h-3 w-3" /> Subtitle / Overline
                  </label>
                  <input 
                    type="text" 
                    value={content.subtitle || ''} 
                    onChange={(e) => updateField('subtitle', e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:border-primary/20 outline-none transition-all"
                    placeholder="Small text above heading..."
                  />
               </div>

               <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Description / Paragraph</label>
                  <textarea 
                    rows={5}
                    value={content.description || ''} 
                    onChange={(e) => updateField('description', e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-slate-900 font-medium focus:border-primary/20 outline-none transition-all resize-none"
                    placeholder="Main body text..."
                  />
               </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
            <div className="p-8 border-b border-slate-50 bg-slate-50/50">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Media & Links</h3>
              <p className="text-xs text-slate-400 font-bold mt-1">Configure images and call-to-action buttons</p>
            </div>

            <div className="p-10 space-y-8">
               <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <LinkIcon className="h-3 w-3" /> CTA Text
                    </label>
                    <input 
                      type="text" 
                      value={content.ctaText || ''} 
                      onChange={(e) => updateField('ctaText', e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-xl px-4 py-3 text-slate-900 font-bold focus:border-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">CTA Link (URL)</label>
                    <input 
                      type="text" 
                      value={content.ctaLink || ''} 
                      onChange={(e) => updateField('ctaLink', e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-xl px-4 py-3 text-slate-900 font-bold focus:border-primary/20 outline-none transition-all"
                    />
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <ImageIcon className="h-3 w-3" /> Background Image URL
                  </label>
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      value={content.image || content.backgroundImage || ''} 
                      onChange={(e) => updateField('backgroundImage', e.target.value)}
                      className="flex-1 bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:border-primary/20 outline-none transition-all"
                      placeholder="https://..."
                    />
                    <button className="px-6 py-4 bg-slate-100 rounded-2xl text-slate-400 hover:text-primary transition-all font-bold text-sm">Upload</button>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Right: Real-time Contextual Preview */}
        <div className="lg:col-span-12 xl:col-span-6 space-y-8">
           <div className="sticky top-28 space-y-6">
              <div className="flex items-center justify-between px-2">
                 <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Live Preview</h3>
                 <span className="text-[10px] font-bold text-slate-400">Syncing changes instantly...</span>
              </div>
              
              <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 aspect-video flex items-center justify-center p-12 bg-gray-50 text-center">
                 <div className="space-y-6">
                    <p className="text-xs font-black text-primary uppercase tracking-[0.3em]">{content.subtitle || 'SUBTITLE'}</p>
                    <h4 className="text-4xl font-black text-slate-900 leading-tight">{content.title || 'SECTION TITLE'}</h4>
                    <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">{content.description || 'This is where your section description will appear. Start typing to see it change in real-time.'}</p>
                    {content.ctaText && (
                      <button className="px-8 py-3 bg-primary text-white rounded-full font-black text-sm shadow-xl shadow-primary/20">{content.ctaText}</button>
                    )}
                 </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 p-8 rounded-3xl flex gap-6">
                 <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                    <Sparkles className="h-6 w-6" />
                 </div>
                 <div>
                    <h4 className="font-bold text-blue-900">Pro Tip: Component Variants</h4>
                    <p className="text-sm text-blue-800/70 mt-1 leading-relaxed">
                      You are using the <span className="font-bold">"{section.variant}"</span> variant. 
                      Some fields might render differently or be ignored depending on the section's design.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
