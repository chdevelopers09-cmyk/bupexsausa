'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Camera, Play } from 'lucide-react';
import { MOCK_GALLERY } from '@/lib/mock-data';

interface GalleryStripSectionProps {
  heading?: string;
  ctaLabel?: string;
  count?: number;
}

export default function GalleryStripSection({
  heading = 'Life at BUPEXSA USA',
  ctaLabel = 'Follow us on Instagram',
  count = 6,
}: GalleryStripSectionProps) {
  const images = MOCK_GALLERY.slice(0, count);

  return (
    <section className="bg-white overflow-hidden">
      <div className="container-wide py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <h2 className="text-2xl font-black text-dark">{heading}</h2>
        <a
          href="https://instagram.com/bupexsausa"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-primary font-bold hover:underline"
        >
          <Camera className="h-5 w-5" />
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <div className="flex overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory">
        <div className="flex gap-4 px-4 min-w-full lg:grid lg:grid-cols-6 lg:gap-4 lg:px-0">
          {images.map((image) => (
            <div
              key={image.id}
              className="flex-shrink-0 w-64 md:w-80 lg:w-full aspect-square relative rounded-xl overflow-hidden shadow-lg snap-center group"
            >
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              {image.path ? (
                image.path.endsWith('.mp4') ? (
                  <div className="relative h-full w-full">
                    <video
                      src={image.path}
                      muted
                      loop
                      playsInline
                      preload="none"
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => e.currentTarget.pause()}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 bg-black"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                      <div className="h-12 w-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
                        <Play className="h-6 w-6 text-white fill-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-full w-full">
                    <Image
                      src={image.path}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                )
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <Camera className="h-8 w-8 text-gray-300" />
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs font-bold uppercase tracking-wider">{image.category}</p>
                <p className="text-white/80 text-xs truncate mt-1">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* For mobile horizontal scrolling hint */}
      <div className="lg:hidden flex justify-center py-4">
        <div className="flex gap-1">
          {images.map((_, i) => (
            <div key={i} className="h-1.5 w-1.5 rounded-full bg-gray-200"></div>
          ))}
        </div>
      </div>
    </section>
  );
}
