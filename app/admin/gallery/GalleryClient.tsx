'use client'

import { useState } from 'react'
import { Image as ImageIcon, Plus, Trash2, Filter, Upload, X, Play } from 'lucide-react'
import { uploadMedia, deleteImage, addVideo } from './actions'
import { cn } from '@/lib/utils'

export default function GalleryClient({ initialImages }: { initialImages: any[] }) {
  const [images, setImages] = useState(initialImages)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<{ name: string, size: string, type: string } | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadType, setUploadType] = useState<'PHOTO' | 'VIDEO_UPLOAD' | 'VIDEO_LINK'>('PHOTO')
  const [filter, setFilter] = useState('ALL')

  const categories = ['ALL', 'Convention', 'Meeting', 'Social', 'Chapter', 'Other']

  const filtered = filter === 'ALL' 
    ? images 
    : images.filter(img => img.category === filter)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const size = (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      setSelectedFile({ name: file.name, size, type: file.type })
    }
  }

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsUploading(true)
    setUploadProgress(0)
    const formData = new FormData(e.currentTarget)
    
    if (uploadType === 'PHOTO' || uploadType === 'VIDEO_UPLOAD') {
      const xhr = new XMLHttpRequest()
      
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100)
          setUploadProgress(percentComplete)
        }
      }

      xhr.onload = () => {
        const res = JSON.parse(xhr.responseText)
        if (xhr.status === 200 && res.success) {
          setShowUploadModal(false)
          window.location.reload()
        } else {
          alert(res.error || 'Upload failed')
          setIsUploading(false)
        }
      }

      xhr.onerror = () => {
        alert('Network error')
        setIsUploading(false)
      }

      xhr.open('POST', '/api/admin/gallery/upload')
      xhr.send(formData)
    } else {
      const res = await addVideo(formData)
      if (res.success) {
        setShowUploadModal(false)
        window.location.reload()
      } else {
        alert(res.error)
        setIsUploading(false)
      }
    }
  }

  const handleDelete = async (id: string, path: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    
    const res = await deleteImage(id, path)
    if (res.success) {
      setImages(images.filter(img => img.id !== id))
    } else {
      alert(res.error)
    }
  }

  const getImageUrl = (path: string) => {
    if (path.startsWith('http')) {
      if (path.includes('youtube.com') || path.includes('youtu.be')) {
        const id = path.includes('v=') ? path.split('v=')[1]?.split('&')[0] : path.split('/').pop()
        return `https://img.youtube.com/vi/${id}/mqdefault.jpg`
      }
      return 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=300'
    }
    
    const ext = path.split('.').pop()?.toLowerCase()
    if (['mp4', 'mov', 'webm', 'ogg'].includes(ext || '')) {
      return 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=300'
    }

    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${path}`
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Gallery Administration</h1>
          <p className="text-sm text-slate-500 font-medium">Manage photo archives and videos</p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="btn-primary flex items-center gap-2 px-6 py-3 rounded-2xl shadow-lg shadow-purple-100"
        >
          <Plus className="h-5 w-5" />
          <span>Add Media</span>
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

      {/* Media Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map(img => {
          const isLink = img.storage_path.startsWith('http');
          const ext = img.storage_path.split('.').pop()?.toLowerCase();
          const isDirectVideo = ['mp4', 'mov', 'webm', 'ogg'].includes(ext || '');
          const isVideo = isLink || isDirectVideo;

          return (
            <div key={img.id} className="group relative aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-md">
              <img 
                src={getImageUrl(img.storage_path)} 
                alt={img.alt_text} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {isVideo && (
                <div className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-md">
                  <Play className="h-4 w-4 fill-white" />
                </div>
              )}
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
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">
             <ImageIcon className="h-12 w-12 mb-4 opacity-20" />
             <p className="font-bold">No media found in this category</p>
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
                <h3 className="font-black text-lg">Add to Gallery</h3>
              </div>
              <button onClick={() => setShowUploadModal(false)} className="hover:bg-white/20 p-2 rounded-xl transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex p-2 bg-slate-50 border-b border-slate-100">
               <button 
                 onClick={() => setUploadType('PHOTO')}
                 className={cn("flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all", uploadType === 'PHOTO' ? "bg-white shadow-sm text-purple-600" : "text-slate-400 hover:text-slate-600")}
               >
                 Photo
               </button>
               <button 
                 onClick={() => setUploadType('VIDEO_UPLOAD')}
                 className={cn("flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all", uploadType === 'VIDEO_UPLOAD' ? "bg-white shadow-sm text-purple-600" : "text-slate-400 hover:text-slate-600")}
               >
                 Video Upload
               </button>
               <button 
                 onClick={() => setUploadType('VIDEO_LINK')}
                 className={cn("flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all", uploadType === 'VIDEO_LINK' ? "bg-white shadow-sm text-purple-600" : "text-slate-400 hover:text-slate-600")}
               >
                 Video Link
               </button>
            </div>

            <form onSubmit={handleUpload} className="p-8 space-y-6">
              {uploadType === 'PHOTO' && (
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Select Image</label>
                  <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-purple-300 transition-colors group">
                    <input type="file" name="file" accept="image/*" required onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <Upload className="h-8 w-8 text-slate-300 mx-auto mb-3 group-hover:text-purple-400 transition-colors" />
                    <p className="text-sm font-bold text-slate-400 group-hover:text-slate-600 transition-colors">Click or drag image to upload</p>
                    <p className="text-[10px] text-slate-300 mt-1 uppercase font-bold tracking-widest">JPG, PNG or WEBP (Max 5MB)</p>
                  </div>
                </div>
              )}

              {uploadType === 'VIDEO_UPLOAD' && (
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Select Video File</label>
                  <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-purple-300 transition-colors group">
                    <input type="file" name="file" accept="video/*" required onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <Play className="h-8 w-8 text-slate-300 mx-auto mb-3 group-hover:text-purple-400 transition-colors" />
                    <p className="text-sm font-bold text-slate-400 group-hover:text-slate-600 transition-colors">Select video from computer</p>
                    <p className="text-[10px] text-slate-300 mt-1 uppercase font-bold tracking-widest">MP4, MOV or WEBM (Max 50MB)</p>
                  </div>
                </div>
              )}

              {uploadType === 'VIDEO_LINK' && (
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Video URL (YouTube/Vimeo)</label>
                  <input name="videoUrl" type="url" required placeholder="https://www.youtube.com/watch?v=..." className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-purple-100 transition-all" />
                </div>
              )}

              {selectedFile && (uploadType === 'PHOTO' || uploadType === 'VIDEO_UPLOAD') && (
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 animate-fade-in">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        {uploadType === 'PHOTO' ? <ImageIcon className="h-5 w-5 text-purple-500" /> : <Play className="h-5 w-5 text-purple-500" />}
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-900 truncate max-w-[150px]">{selectedFile.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{selectedFile.type} • {selectedFile.size}</p>
                      </div>
                    </div>
                    {isUploading && (
                      <span className="text-xs font-black text-purple-600 animate-pulse">{uploadProgress}%</span>
                    )}
                  </div>
                  {isUploading && (
                    <div className="h-2 w-full bg-white rounded-full overflow-hidden border border-slate-100">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Category</label>
                  <select name="category" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-purple-100 transition-all">
                    {categories.filter(c => c !== 'ALL').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Title/Alt Text</label>
                  <input name="altText" type="text" placeholder="Brief description..." className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-purple-100 transition-all" />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isUploading}
                className={cn(
                  "w-full py-4 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all",
                  isUploading ? "bg-slate-100 text-slate-400 shadow-none cursor-not-allowed" : "btn-primary shadow-purple-100"
                )}
              >
                {isUploading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-black uppercase tracking-widest">Uploading Media...</span>
                  </div>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    <span className="text-xs font-black uppercase tracking-widest">{uploadType === 'PHOTO' ? 'Upload Photo' : 'Save Video'}</span>
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
