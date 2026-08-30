"use client";

import { useState, useEffect, useRef } from 'react';
import { MOCK_GALLERY } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Maximize2, X } from 'lucide-react';
import Image from 'next/image';

interface GalleryGridSectionProps {
  heading?: string;
  count?: number;
}

export default function GalleryGridSection({
  heading = 'Photo Gallery',
  count = 24,
}: GalleryGridSectionProps) {
  const images = MOCK_GALLERY.slice(0, count);
  const categories = ['All', ...Array.from(new Set(images.map((img) => img.category)))];
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState<typeof images[0] | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const filteredImages = filter === 'All'
    ? images
    : images.filter((img) => img.category === filter);

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-dark mb-8">{heading}</h2>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-bold transition-all",
                  filter === cat
                    ? "bg-primary text-white shadow-purple"
                    : "bg-gray-100 text-gray-500 hover:bg-bg-purple hover:text-primary"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-md cursor-pointer"
              onClick={() => setLightbox(image)}
            >
              <div className="relative w-full h-full">
                <Image src={image.path} alt={image.alt} fill sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Maximize2 className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="bg-white/90 backdrop-blur-sm text-primary text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded">
                  {image.category}
                </span>
                <p className="text-white text-xs font-medium mt-2 truncate">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${lightbox.alt}`}
          className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-lg flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            ref={closeBtnRef}
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="max-w-5xl w-full max-h-screen relative flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full">
              <Image src={lightbox.path} alt={lightbox.alt} width={1600} height={900} loading="lazy" className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl" />
            </div>
            <div className="mt-8 text-center text-white">
              <span className="text-accent font-black uppercase tracking-widest text-xs">
                {lightbox.category}
              </span>
              <h3 className="text-xl md:text-2xl font-bold mt-2">{lightbox.alt}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard & focus management for lightbox */}
      {lightbox && (
        <_LightboxKeybinds
          images={filteredImages}
          current={lightbox}
          onClose={() => setLightbox(null)}
          onNavigate={(img) => setLightbox(img)}
          closeRef={closeBtnRef}
        />
      )}
    </section>
  );
}

function _LightboxKeybinds({ images, current, onClose, onNavigate, closeRef } : {
  images: any[];
  current: any;
  onClose: () => void;
  onNavigate: (img: any) => void;
  closeRef: React.RefObject<HTMLButtonElement | null>;
}) {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const prevFocus = document.activeElement as HTMLElement | null;

    // Focus close button when available
    setTimeout(() => closeRef.current?.focus(), 50);

    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const idx = images.findIndex((i) => i.id === current.id);
        if (idx === -1) return;
        const nextIdx = e.key === 'ArrowLeft' ? (idx === 0 ? images.length - 1 : idx - 1) : (idx === images.length - 1 ? 0 : idx + 1);
        onNavigate(images[nextIdx]);
      }
    }

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = prevOverflow;
      try { prevFocus?.focus?.(); } catch {}
    };
  }, [images, current, onClose, onNavigate, closeRef]);

  return null;
}
