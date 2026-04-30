'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveChapter, deleteChapter } from './actions';
import { Save, Trash2, ArrowLeft, MapPin, Globe, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { US_STATES } from '@/lib/utils';

export default function ChapterEditor({ chapter }: { chapter?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: chapter?.id || null,
    name: chapter?.name || '',
    slug: chapter?.slug || '',
    state: chapter?.state || 'Texas',
    description: chapter?.description || '',
    banner_image_path: chapter?.banner_image_path || '',
    is_active: chapter?.is_active ?? true,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await saveChapter(formData);
    setLoading(false);
    if (res.error) alert(res.error);
    else router.push('/admin/chapters');
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this chapter?')) return;
    setLoading(true);
    const res = await deleteChapter(chapter.id);
    setLoading(false);
    if (res.error) alert(res.error);
    else router.push('/admin/chapters');
  };

  return (
    <div className="max-w-4xl space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/chapters" className="p-2 bg-white rounded-xl border border-slate-200 text-slate-500 hover:text-primary transition-all">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-black text-slate-900">{chapter ? 'Edit Chapter' : 'Initialize New Chapter'}</h1>
        </div>
        {chapter && (
          <button onClick={handleDelete} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
            <Trash2 size={20} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
        {/* Main Info */}
        <div className="md:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Chapter Name</label>
              <input 
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:border-primary/20 outline-none transition-all"
                placeholder="e.g. Texas Chapter"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <MapPin size={14} /> Headquartered State
              </label>
              <select 
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:border-primary/20 outline-none transition-all appearance-none"
              >
                {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Description</label>
            <textarea 
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-slate-900 font-medium focus:border-primary/20 outline-none transition-all resize-none"
              placeholder="About this chapter..."
            />
          </div>
        </div>

        {/* Media & Status */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <ImageIcon size={14} /> Banner Image URL
            </label>
            <input 
              name="banner_image_path"
              value={formData.banner_image_path}
              onChange={handleChange}
              className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:border-primary/20 outline-none transition-all"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
             <div>
                <p className="text-sm font-bold text-slate-900">Active Status</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Visible in chapter listing</p>
             </div>
             <input 
               type="checkbox"
               name="is_active"
               checked={formData.is_active}
               onChange={handleChange}
               className="h-6 w-6 rounded-md border-slate-200 text-primary focus:ring-primary"
             />
          </div>
        </div>

        <div className="md:col-span-2">
           <button 
             type="submit"
             disabled={loading}
             className="w-full py-5 bg-primary text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
           >
              {loading ? 'Processing...' : <><Save size={22} /> Update Chapter Details</>}
           </button>
        </div>
      </form>
    </div>
  );
}
