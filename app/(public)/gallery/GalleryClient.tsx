'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Download, Grid, Layers } from 'lucide-react';
import { MOCK_GALLERY } from '@/lib/mock-data';

// Helper categories will be derived inside the component

export default function GalleryClient({ initialImages = [] }: { initialImages?: any[] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [layout, setLayout] = useState<'masonry' | 'grid'>('masonry');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  
  const realImages = initialImages.map(img => ({
    id: img.id,
    category: img.category || 'Other',
    alt: img.alt_text || 'BUPEXSA Image',
    path: `${supabaseUrl}/storage/v1/object/public/gallery/${img.storage_path}`
  }));

  const ALL_IMAGES = [...realImages, ...MOCK_GALLERY];
  
  const CATEGORIES = ['All', ...Array.from(new Set(ALL_IMAGES.map(i => i.category)))];

  const filtered = ALL_IMAGES.filter(img =>
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
                    ({cat === 'All' ? ALL_IMAGES.length : ALL_IMAGES.filter(i => i.category === cat).length})
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
              <p className="text-2xl font-black text-dark mb-2">No Images</p>
              <p className="text-gray-500">No photos in this category yet.</p>
            </div>
          ) : layout === 'masonry' ? (
            /* Masonry: 3 columns */
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filtered.map((img, index) => (
                <div
                  key={img.id}
                  className="break-inside-avoid group relative cursor-pointer rounded-3xl overflow-hidden shadow-card hover:shadow-2xl transition-all duration-500"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={img.path}
                    alt={img.alt}
                    className="w-full h-auto block group-hover:scale-105 transition-transform duration-700"
                    style={{ aspectRatio: index % 3 === 0 ? '4/5' : index % 3 === 1 ? '16/10' : '1/1' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-between p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex justify-end">
                      <div className="h-9 w-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                        <ZoomIn className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-accent text-white mb-2">
                        {img.category}
                      </span>
                      <p className="text-white text-sm font-semibold leading-tight">{img.alt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Uniform Grid */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((img, index) => (
                <div
                  key={img.id}
                  className="group relative aspect-square cursor-pointer rounded-2xl overflow-hidden shadow-card hover:shadow-2xl transition-all duration-500"
                  onClick={() => openLightbox(index)}
                >
                  <img src={img.path} alt={img.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn className="h-8 w-8 text-white" />
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
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm font-bold tabular-nums">
            {lightboxIndex + 1} / {filtered.length}
          </div>

          {/* Prev */}
          <button
            onClick={e => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all hover:scale-110 z-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Image */}
          <div
            className="max-w-5xl max-h-[85vh] mx-16 animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={filtered[lightboxIndex].path}
              alt={filtered[lightboxIndex].alt}
              className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <div className="mt-4 flex items-center justify-between px-2">
              <div>
                <span className="text-[10px] font-black text-accent uppercase tracking-widest">{filtered[lightboxIndex].category}</span>
                <p className="text-white font-semibold mt-1">{filtered[lightboxIndex].alt}</p>
              </div>
              <a
                href={filtered[lightboxIndex].path}
                download
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-colors"
              >
                <Download className="h-4 w-4" /> Save
              </a>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={e => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all hover:scale-110 z-10"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}
