interface FullWidthImageSectionProps {
  image: string;
  caption?: string;
}

export default function FullWidthImageSection({
  image,
  caption,
}: FullWidthImageSectionProps) {
  return (
    <section className="bg-white">
      <div className="w-full relative h-[400px] md:h-[600px] overflow-hidden">
        <img
          src={image}
          alt={caption || 'Full width section image'}
          className="w-full h-full object-cover"
        />
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
