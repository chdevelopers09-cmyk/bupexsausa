import HeroSection from '@/components/sections/HeroSection';
import AlmaMaterSection from '@/components/sections/AlmaMaterSection';
import GalleryStripSection from '@/components/sections/GalleryStripSection';
import TextBlockSection from '@/components/sections/TextBlockSection';

export const metadata = {
  title: 'Our Alma Mater',
  description: 'The history and spirit of Presbyterian College Secondary School (PCSS) Buea.',
};

export default function AlmaMaterPage() {
  return (
    <>
      <HeroSection
        variant="centered-primary"
        heading="Our Alma Mater"
        subheading="PCSS Buea: A beacon of knowledge, character, and excellence set against the backdrop of Mount Cameroon."
        badge="PCSS Buea Legacy"
      />

      <AlmaMaterSection 
        body="<p>Our roots in Buea are the foundation of everything we achieve today. Founded in 1985, PCSS Buea has been a cradle of excellence, shaping minds and building character under the watchful eye of Mount Cameroon.</p><p>For those of us now in the USA, these memories remain the heartbeat of our community.</p>" 
        image="/images/roots-1.jpg" 
      />

      <TextBlockSection
        variant="centered"
        heading="The Spirit of Buea"
        body={`
          <p>The spirit of PCSS Buea transcends borders. It is a spirit of resilience, integrity, and lifelong fellowship. Whether in Cameroon or the United States, we carry the torch of our alma mater with pride.</p>
        `}
      />

      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-dark mb-6">Life at BUPEXSA USA</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* New Images */}
            {[
              "/images/life-1.jpg",
              "/images/life-2.jpg"
            ].map((img, idx) => (
              <div key={`img-${idx}`} className="bg-white rounded-3xl p-3 shadow-xl shadow-primary/5 border border-gray-100 group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 relative">
                  <img src={img} alt="BUPEXSA Life" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
            ))}

            {/* Videos */}
            {[
              "Alma Matar-video-1.mp4",
              "Alma Matar-video-2.mp4",
              "life-at-bupexausa-video-1.mp4",
              "life-at-bupexausa-video-2.mp4",
              "life-at-bupexausa-video-3.mp4",
              "life-at-bupexausa-video-4.mp4",
              "life-at-bupexausa-video-5.mp4",
              "life-at-bupexausa-video-6.mp4",
              "life-at-bupexausa-video-7.mp4"
            ].map((video, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-3 shadow-xl shadow-primary/5 border border-gray-100 group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 relative">
                  <video 
                    controls 
                    preload="metadata"
                    className="w-full h-full object-cover"
                  >
                    <source src={`/videos/${video}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
