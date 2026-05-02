'use client';

import { useState } from 'react';
import { Plus, Loader2, X } from 'lucide-react';
import { createPage } from './actions';
import { useRouter } from 'next/navigation';
import { slugify } from '@/lib/utils';

export default function NewPageButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageName, setPageName] = useState('');
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pageName) return;

    setLoading(true);
    const slug = slugify(pageName);
    const res = await createPage(pageName, slug);
    
    if (res.error) {
      alert(res.error);
      setLoading(false);
    } else {
      setIsOpen(false);
      setLoading(false);
      // Redirect to the new page's builder
      router.push(`/admin/visual-builder/${res.id}`);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-sm font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
      >
        <Plus className="h-4 w-4" /> Initialize New Page
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden animate-scale-in">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-xl font-black text-slate-900">Create New Page</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Initialize dynamic layout</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white rounded-xl text-slate-300 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-10 space-y-8">
               <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Page Name (Display)</label>
                  <input 
                    autoFocus
                    type="text" 
                    value={pageName} 
                    onChange={(e) => setPageName(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:border-primary/20 outline-none transition-all"
                    placeholder="e.g. Our Services"
                    required
                  />
                  <p className="text-[10px] text-slate-400 font-medium italic">Slug will be auto-generated: /{slugify(pageName)}</p>
               </div>

               <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 px-6 py-4 rounded-2xl text-sm font-bold text-slate-400 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    disabled={loading || !pageName}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-2xl text-sm font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Create Page'}
                  </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
