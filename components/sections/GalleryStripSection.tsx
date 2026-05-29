'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Camera, Play, Image as ImageIcon, Video, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_GALLERY } from '@/lib/mock-data';

interface GalleryStripSectionProps {
  heading?: string;
  count?: number;
}

const MOCK_VIDEOS = [
  { id: 'v1', title: '2026 BUPEXSA USA Convention Highlight', duration: '20:17', thumbnail: '/images/gallery/1.jpg', videoUrl: '/videos/CURRENT-ANTHEM.mp4' },
  { id: 'v2', title: '2025 Annual Reunion', duration: '1:42', thumbnail: '/images/gallery/2.jpg', videoUrl: '/videos/OLD-ANTHEM.mp4' },
  { id: 'v3', title: '2024 Gala Dinner', duration: '3:36', thumbnail: '/images/gallery/3.jpg', videoUrl: '/videos/CURRENT-ANTHEM.mp4' },
  { id: 'v4', title: '2023 Charity Drive', duration: '35:56', thumbnail: '/images/gallery/4.jpg', videoUrl: '/videos/OLD-ANTHEM.mp4' },
  { id: 'v5', title: '2022 Scholarship Award Ceremony', duration: '21:53', thumbnail: '/images/gallery/5.jpg', videoUrl: '/videos/CURRENT-ANTHEM.mp4' },
];

export default function GalleryStripSection({
  heading = 'Life at BUPEXSA USA',
  count = 18,
}: GalleryStripSectionProps) {
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');
  const [activeVideo, setActiveVideo] = useState(MOCK_VIDEOS[0]);
  const [selectedImage, setSelectedImage] = useState<typeof MOCK_GALLERY[0] | null>(null);

  const images = MOCK_GALLERY.filter(item => !item.path?.endsWith('.mp4')).slice(0, count);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedImage) return;
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    setSelectedImage(images[prevIndex]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedImage) return;
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    setSelectedImage(images[nextIndex]);
  };

  return (
    <section className="bg-white overflow-hidden py-16 border-t border-gray-100">
      <div className="container-wide">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tight">{heading}</h2>
          
          <div className="flex items-center bg-gray-100 p-1.5 rounded-xl">
            <button
              onClick={() => setActiveTab('images')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'images' 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-gray-500 hover:text-dark'
              }`}
            >
              <ImageIcon className="h-4 w-4" />
              Images
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'videos' 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-gray-500 hover:text-dark'
              }`}
            >
              <Video className="h-4 w-4" />
              Videos
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[500px]">
          {activeTab === 'images' ? (
            /* Images Grid Layout */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className="aspect-square relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl group transition-all cursor-pointer"
                >
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  {image.path ? (
                    <Image
                      src={image.path}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <Camera className="h-8 w-8 text-gray-300" />
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-[10px] font-bold uppercase tracking-wider text-primary-light">{image.category}</p>
                    <p className="text-white/90 text-sm font-medium truncate mt-0.5">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Videos Playlist Layout */
            <div className="bg-slate-50 rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col lg:flex-row h-[600px]">
              
              {/* Playlist Sidebar */}
              <div className="w-full lg:w-[350px] bg-white border-r border-gray-200 flex flex-col h-full">
                <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
                  <h3 className="font-black text-dark">PLAYLIST</h3>
                  <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2.5 py-1 rounded-full">{MOCK_VIDEOS.length} Videos</span>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  {MOCK_VIDEOS.map((video, idx) => (
                    <button
                      key={video.id}
                      onClick={() => setActiveVideo(video)}
                      className={`w-full flex items-center gap-4 p-4 text-left transition-colors border-b border-gray-50 last:border-0 ${
                        activeVideo.id === video.id 
                          ? 'bg-primary/5 border-l-4 border-l-primary' 
                          : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                      }`}
                    >
                      <div className="relative h-16 w-24 rounded-lg overflow-hidden flex-shrink-0 bg-black">
                        <Image src={video.thumbnail} alt={video.title} fill className="object-cover opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className={`h-6 w-6 ${activeVideo.id === video.id ? 'text-primary' : 'text-white'} fill-current`} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm font-bold line-clamp-2 ${activeVideo.id === video.id ? 'text-primary' : 'text-dark'}`}>
                          {video.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{video.duration}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Video Player */}
              <div className="flex-1 bg-black flex flex-col relative h-full">
                <video
                  key={activeVideo.id} // force remount to autoplay new source
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
                
                {/* Overlay Title (optional, fades out) */}
                <div className="absolute top-0 inset-x-0 p-6 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                  <h2 className="text-white text-xl md:text-2xl font-bold">{activeVideo.title}</h2>
                  <p className="text-white/70 text-sm mt-1">BUPEXSA USA</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-sm animate-fade-in">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-colors z-50"
          >
            <X className="h-6 w-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-3 transition-colors z-50"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              
              <button
                onClick={handleNext}
                className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-3 transition-colors z-50"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}
          
          <div className="relative w-full h-full max-w-6xl max-h-[80vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {selectedImage.path && (
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage.path}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  quality={100}
                />
              </div>
            )}
            <div className="absolute bottom-[-40px] left-0 right-0 text-center">
              <p className="text-white font-medium">{selectedImage.alt}</p>
              <p className="text-white/60 text-sm uppercase tracking-wider mt-1">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
