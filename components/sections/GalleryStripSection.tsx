import Link from 'next/link';
import { ArrowRight, Camera } from 'lucide-react';
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
              <img
                src={image.path}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
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
