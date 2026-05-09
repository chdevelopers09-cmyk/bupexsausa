'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Maximize2 } from 'lucide-react';

interface ChapterGalleryClientProps {
  images: string[];
  title?: string;
}

export default function ChapterGalleryClient({ images, title = "SHARED MEMORIES" }: ChapterGalleryClientProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex(i => (i === null ? null : (i - 1 + images.length) % images.length));
  const next = () => setLightboxIndex(i => (i === null ? null : (i + 1) % images.length));

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
    <div className="space-y-8">
      <h2 className="text-2xl font-black text-dark mb-8 pb-4 border-b border-gray-100 uppercase tracking-tight">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((img, index) => (
          <div 
            key={index} 
            onClick={() => openLightbox(index)}
            className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer relative"
          >
            <img 
              src={img} 
              alt={`Gallery image ${index + 1}`} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="h-10 w-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transform scale-50 group-hover:scale-100 transition-all duration-500">
                <ZoomIn className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button 
            onClick={closeLightbox} 
            className="absolute top-6 right-6 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:rotate-90 z-20"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation */}
          <button 
            onClick={e => { e.stopPropagation(); prev(); }} 
            className="absolute left-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110 z-20 backdrop-blur-sm"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button 
            onClick={e => { e.stopPropagation(); next(); }} 
            className="absolute right-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110 z-20 backdrop-blur-sm"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Main Image Container */}
          <div className="w-full max-w-6xl mx-auto px-4 flex flex-col items-center animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="relative group">
              <img
                src={images[lightboxIndex]}
                alt={`Expanded gallery image ${lightboxIndex + 1}`}
                className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <a 
                  href={images[lightboxIndex]} 
                  target="_blank" 
                  className="h-10 w-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-lg"
                  title="Enlarge in new tab"
                >
                  <Maximize2 className="h-4 w-4" />
                </a>
              </div>
            </div>
            
            {/* Counter */}
            <div className="mt-6 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold tracking-widest tabular-nums">
              {lightboxIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
