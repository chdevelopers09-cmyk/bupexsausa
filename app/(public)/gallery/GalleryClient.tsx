import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Download, Grid, Layers, Play } from 'lucide-react';
import { MOCK_GALLERY } from '@/lib/mock-data';

export default function GalleryClient({ initialImages = [] }: { initialImages?: any[] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [layout, setLayout] = useState<'masonry' | 'grid'>('masonry');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  
  const realMedia = initialImages.map(img => {
    const isVideo = img.storage_path.startsWith('http');
    let thumb = `${supabaseUrl}/storage/v1/object/public/gallery/${img.storage_path}`;
    
    if (isVideo) {
      if (img.storage_path.includes('youtube.com') || img.storage_path.includes('youtu.be')) {
        const id = img.storage_path.includes('v=') ? img.storage_path.split('v=')[1]?.split('&')[0] : img.storage_path.split('/').pop();
        thumb = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
      } else {
        thumb = 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800';
      }
    }

    return {
      id: img.id,
      category: img.category || 'Other',
      alt: img.alt_text || 'BUPEXSA Image',
      path: isVideo ? img.storage_path : thumb,
      thumb: thumb,
      type: isVideo ? 'video' : 'image'
    };
  });

  const ALL_MEDIA = [...realMedia, ...MOCK_GALLERY.map(m => ({ ...m, thumb: m.path, type: 'image' }))];
  
  const CATEGORIES = ['All', ...Array.from(new Set(ALL_MEDIA.map(i => i.category)))];

  const filtered = ALL_MEDIA.filter(img =>
    activeCategory === 'All' || img.category === activeCategory
  );

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex(i => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const next = () => setLightboxIndex(i => (i === null ? null : (i + 1) % filtered.length));

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  const renderLightboxContent = (item: any) => {
    if (item.type === 'video') {
      let embedUrl = item.path;
      if (item.path.includes('youtube.com') || item.path.includes('youtu.be')) {
        const id = item.path.includes('v=') ? item.path.split('v=')[1]?.split('&')[0] : item.path.split('/').pop();
        embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1`;
      }
      return (
        <iframe 
          src={embedUrl} 
          className="w-full aspect-video rounded-2xl shadow-2xl" 
          allow="autoplay; encrypted-media; fullscreen" 
          allowFullScreen
        />
      );
    }
    return (
      <img
        src={item.thumb}
        alt={item.alt}
        className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl"
      />
    );
  };

  return (
    <>
      {/* Filter + Layout Controls */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-sm">
        <div className="container-wide py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-primary'
                  }`}
                >
                  {cat}
                  <span className={`ml-1.5 text-xs ${activeCategory === cat ? 'text-white/70' : 'text-gray-400'}`}>
                    ({cat === 'All' ? ALL_MEDIA.length : ALL_MEDIA.filter(i => i.category === cat).length})
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
              <button onClick={() => setLayout('masonry')} className={`p-2 rounded-lg transition-all ${layout === 'masonry' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-primary'}`}>
                <Layers className="h-4 w-4" />
              </button>
              <button onClick={() => setLayout('grid')} className={`p-2 rounded-lg transition-all ${layout === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-primary'}`}>
                <Grid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="section-padding bg-gray-50/50">
        <div className="container-wide">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-2xl font-black text-dark mb-2">No Media</p>
              <p className="text-gray-500">No photos or videos in this category yet.</p>
            </div>
          ) : layout === 'masonry' ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filtered.map((item, index) => (
                <div
                  key={item.id}
                  className="break-inside-avoid group relative cursor-pointer rounded-3xl overflow-hidden shadow-card hover:shadow-2xl transition-all duration-500"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={item.thumb}
                    alt={item.alt}
                    className="w-full h-auto block group-hover:scale-105 transition-transform duration-700"
                    style={{ aspectRatio: index % 3 === 0 ? '4/5' : index % 3 === 1 ? '16/10' : '1/1' }}
                  />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-16 w-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
                        <Play className="h-8 w-8 text-white fill-white" />
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-between p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex justify-end">
                      <div className="h-9 w-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                        <ZoomIn className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-accent text-white mb-2">
                        {item.category}
                      </span>
                      <p className="text-white text-sm font-semibold leading-tight">{item.alt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative aspect-square cursor-pointer rounded-2xl overflow-hidden shadow-card hover:shadow-2xl transition-all duration-500"
                  onClick={() => openLightbox(index)}
                >
                  <img src={item.thumb} alt={item.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    {item.type === 'video' ? <Play className="h-10 w-10 text-white fill-white" /> : <ZoomIn className="h-8 w-8 text-white" />}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          <button onClick={closeLightbox} className="absolute top-5 right-5 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"><X className="h-5 w-5" /></button>
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm font-bold tabular-nums">{lightboxIndex + 1} / {filtered.length}</div>
          <button onClick={e => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all hover:scale-110 z-10"><ChevronLeft className="h-6 w-6" /></button>

          <div className="w-full max-w-5xl mx-16 animate-scale-in" onClick={e => e.stopPropagation()}>
            {renderLightboxContent(filtered[lightboxIndex])}
            <div className="mt-6 flex items-center justify-between px-2">
              <div>
                <span className="text-[10px] font-black text-accent uppercase tracking-widest">{filtered[lightboxIndex].category}</span>
                <p className="text-white font-semibold mt-1 text-lg">{filtered[lightboxIndex].alt}</p>
              </div>
              {filtered[lightboxIndex].type === 'image' && (
                <a href={filtered[lightboxIndex].thumb} download onClick={e => e.stopPropagation()} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-dark text-sm font-black transition-all hover:scale-105 shadow-xl shadow-white/5"><Download className="h-4 w-4" /> Download Photo</a>
              )}
            </div>
          </div>

          <button onClick={e => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all hover:scale-110 z-10"><ChevronRight className="h-6 w-6" /></button>
        </div>
      )}
    </>
  );
}

