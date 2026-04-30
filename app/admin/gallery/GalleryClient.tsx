'use client'

import { useState } from 'react'
import { Image as ImageIcon, Plus, Trash2, Filter, Upload, X } from 'lucide-react'
import { uploadImage, deleteImage } from './actions'
import { cn } from '@/lib/utils'

export default function GalleryClient({ initialImages }: { initialImages: any[] }) {
  const [images, setImages] = useState(initialImages)
  const [isUploading, setIsUploading] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [filter, setFilter] = useState('ALL')

  const categories = ['ALL', 'Convention', 'Meeting', 'Social', 'Chapter', 'Other']

  const filtered = filter === 'ALL' 
    ? images 
    : images.filter(img => img.category === filter)

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsUploading(true)
    const formData = new FormData(e.currentTarget)
    
    const res = await uploadImage(formData)
    if (res.success) {
      setShowUploadModal(false)
      window.location.reload() // Simple refresh to show new image
    } else {
      alert(res.error)
    }
    setIsUploading(false)
  }

  const handleDelete = async (id: string, path: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return
    
    const res = await deleteImage(id, path)
    if (res.success) {
      setImages(images.filter(img => img.id !== id))
    } else {
      alert(res.error)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Gallery Administration</h1>
          <p className="text-sm text-slate-500 font-medium">Manage photo archives and categories</p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="btn-primary flex items-center gap-2 px-6 py-3 rounded-2xl"
        >
          <Plus className="h-5 w-5" />
          <span>Upload New Photo</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Filter className="h-4 w-4 text-slate-400 mr-2 shrink-0" />
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all shrink-0",
              filter === cat 
                ? "bg-[#8B5CF6] text-white shadow-lg shadow-purple-100" 
                : "bg-white border border-slate-100 text-slate-400 hover:text-slate-600"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map(img => (
          <div key={img.id} className="group relative aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-md">
            <img 
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${img.storage_path}`} 
              alt={img.alt_text} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
              <p className="text-white text-[10px] font-black uppercase tracking-widest mb-1 truncate">{img.category}</p>
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-[10px] font-medium truncate pr-2">{img.alt_text || 'No description'}</span>
                <button 
                  onClick={() => handleDelete(img.id, img.storage_path)}
                  className="h-8 w-8 rounded-lg bg-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors flex items-center justify-center shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">
             <ImageIcon className="h-12 w-12 mb-4 opacity-20" />
             <p className="font-bold">No images found in this category</p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-scale-in">
            <div className="bg-[#8B5CF6] py-6 px-8 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <Upload className="h-5 w-5" />
                <h3 className="font-black text-lg">Upload Gallery Photo</h3>
              </div>
              <button onClick={() => setShowUploadModal(false)} className="hover:bg-white/20 p-2 rounded-xl transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Select Image</label>
                <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-purple-300 transition-colors group">
                  <input 
                    type="file" 
                    name="file" 
                    accept="image/*" 
                    required 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                  />
                  <Upload className="h-8 w-8 text-slate-300 mx-auto mb-3 group-hover:text-purple-400 transition-colors" />
                  <p className="text-sm font-bold text-slate-400 group-hover:text-slate-600 transition-colors">Click or drag image to upload</p>
                  <p className="text-[10px] text-slate-300 mt-1 uppercase font-bold tracking-widest">JPG, PNG or WEBP (Max 5MB)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Category</label>
                  <select 
                    name="category" 
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                  >
                    {categories.filter(c => c !== 'ALL').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Alt Text</label>
                  <input 
                    name="altText"
                    type="text"
                    placeholder="Brief description..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isUploading}
                className="w-full btn-primary py-4 rounded-2xl shadow-xl shadow-purple-100 flex items-center justify-center gap-3"
              >
                {isUploading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    <span>Upload to Gallery</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
