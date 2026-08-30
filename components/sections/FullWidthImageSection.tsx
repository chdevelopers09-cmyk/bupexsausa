interface FullWidthImageSectionProps {
  image: string;
  caption?: string;
}

import Image from 'next/image';

export default function FullWidthImageSection({
  image,
  caption,
}: FullWidthImageSectionProps) {
  return (
    <section className="bg-white">
      <div className="w-full relative h-[400px] md:h-[600px] overflow-hidden">
        <Image src={image} alt={caption || 'Full width section image'} fill sizes="100vw" className="object-cover" />
        {caption && (
          <div className="absolute bottom-10 left-10 z-10">
            <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-lg border border-white/20">
               <p className="text-white text-sm font-medium">{caption}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
