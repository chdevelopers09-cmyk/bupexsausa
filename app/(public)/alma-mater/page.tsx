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
        image="/images/gallery/school-13.jpg"
      />

      {/* Featured Story: First Senior Prefect */}
      <section className="section-padding bg-white">
        <div className="container-wide max-w-5xl mx-auto">
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-dark mb-6 leading-tight">
                What the First Senior Prefect Boy of PCSS Buea Town Has to Say
              </h2>
              <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
            </div>
            
            <div className="space-y-8 text-gray-600 leading-relaxed text-lg md:text-xl font-medium">
              <p>If you ever want proof that life has a sense of humor, look no further than my story. Looking back at the unexpected leadership journey that began 33 years ago in September 1993, when PCSS Buea Town had just opened its doors, I walked almost two weeks late. Not because I was trying to be dramatic, but because my family had a few issues going on. I arrived expecting to quietly blend into the boys’ dormitory (dorm). Instead, destiny was waiting for me with an unforgettable exposure, literally.</p>
              <p>At the time, the principal, Dr. Ebune Joseph, had already appointed a senior prefect. I was just a normal Form One boy but there was a political crisis that shut down schools, so we all went home. When classes resumed a month later, the senior prefect never returned. One afternoon during manual labor, I was cutting grass with the seriousness of a boy who didn’t want trouble. Suddenly, I noticed someone cutting grass beside me. I turned and there was the principal himself, watching me like he was studying a specimen. He asked my name, asked how I was performing in class, and told me to see him in his office the next morning. I didn’t sleep well that night.</p>
              <p>The next day, he asked about my primary school background. I told him I had been head boy. He nodded thoughtfully. I still didn’t know what he was planning. But at assembly, he called out three boys including me. He pointed to the first boy and asked the entire school, “Do you want this boy to be senior prefect?” A few hands went up. Same thing for the second boy. Then he pointed at me. Before he even finished the question, the whole school erupted. Hands shot up, voices screamed my name, and even I was shocked. That’s how I became the first Senior Prefect Boy of PCSS Buea Town. I thought it was just a title. I went back to the dormitory, cleaned my morning portion like everyone else, and minded my business. But most of my classmates had abandoned their morning work. One day, the principal came to my class, called me out, and marched me to the boys’ dormitory area. He showed me the mess, the toilets, surroundings, everything. Then he said, Clean it! I thought he was joking. He was not. I cleaned everything alone. That day, leadership slapped me awake. I became strict, serious, and intentional. I realized the position wasn’t a crown, it was a responsibility.</p>
              <p>From that moment, I took my role seriously. Back then, there was no staff quarter. On weekends, I was practically the administrator of the entire school. I stood in front of the staff room receiving visitors and parents. I helped the food master in the kitchen opening the store, measuring ingredients, and handing out supplies. I was everywhere. We, the first batch, laid the foundation of the school, literally. We did physical work that shaped the campus which future generations enjoyed. The following year, senior prefects were elected through a formal student election. I didn’t campaign. I didn’t buy sweets. I didn’t make speeches. Meanwhile, the other boys were distributing biscuits and cookies like politicians handing out rice during elections. But I had my secret weapon: my biological seniors in other boarding schools. They told me, “Don’t talk too much. Don’t campaign. Just behave well.” And it worked. My classmates re‑reelected me. The juniors loved me because I protected them. They were the majority, so I treated them like the majority.</p>
              <p>Meanwhile, my supporters were something else. They wrote my name on bedsheets and paraded around campus shouting it. They wrote my name on walls. People in town were asking, “Who is this boy?” Even I was curious. But their confidence in me pushed me to be better. I was senior prefect for all five years. Four years of “campaigning” without ever campaigning. Looking back now, I smile at the boy I was; confident, clueless, hardworking, and sometimes hilariously strict. I made mistakes, of course. Some awkward, some funny, some due to pure ignorance. But I also know I impacted lives. I led with my heart, even when I didn’t fully understand the weight of the role.</p>
              <p>This is the first time I’m writing down this story from 33 years ago. It brings back memories that make me laugh, shake my head, and smile with pride. I didn’t plan to lead a school. I didn’t even arrive on time. But somehow, I became the boy whose name echoed across campus, the boy who helped build a school from scratch, and the boy who learned that leadership is not about noise, it’s about service. And if you’re wondering who I am after all this… Well, come closer. You’ll want to meet me in person but in the meantime, I present my humble self in the picture below.</p>
            </div>

            <div className="mt-16 flex flex-col md:flex-row items-center gap-10 p-10 md:p-12 bg-gray-50 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50">
              <div className="h-48 w-48 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl flex-shrink-0 bg-white">
                <img 
                  src="/images/awachek-walter.png" 
                  alt="Mr Awachek Walter" 
                  className="w-full h-full object-cover object-top" 
                />
              </div>
              <div>
                <p className="text-primary font-black text-xs uppercase tracking-[0.2em] mb-3">Founding Batch Leader</p>
                <h4 className="text-dark font-black text-3xl mb-2">Mr Awachek Walter</h4>
                <p className="text-gray-500 font-bold text-xl mb-4">First Senior Prefect Boy</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                  <p className="text-dark/70 font-bold text-sm">PCSS Alumnus (1993 Batch)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-dark mb-6">Life at PCSS Buea</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* Gallery Images - Campus & Community */}
            {[
              "/images/gallery/school-1.jpg",
              "/images/gallery/school-2.jpg",
              "/images/gallery/school-3.jpg",
              "/images/gallery/school-4.jpg",
              "/images/gallery/school-5.jpg",
              "/images/gallery/school-6.jpg",
              "/images/gallery/school-7.jpg",
              "/images/gallery/school-8.jpg",
              "/images/gallery/school-9.jpg",
              "/images/gallery/school-10.jpg",
              "/images/gallery/school-11.jpg",
              "/images/gallery/school-12.jpg",
              "/images/gallery/legacy-1.jpg"
            ].map((img, idx) => (
              <div key={`img-campus-${idx}`} className="bg-white rounded-3xl p-3 shadow-xl shadow-primary/5 border border-gray-100 group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 relative">
                  <img src={img} alt="BUPEXSA Campus Life" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
            ))}

            {/* Gallery Images - Historical Memories & Legacy */}
            {[

            ].map((img, idx) => (
              <div key={`img-history-${idx}`} className="bg-white rounded-3xl p-3 shadow-xl shadow-primary/5 border border-gray-100 group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 relative">
                  <img src={img} alt="BUPEXSA History" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
            ))}



            {/* Videos */}
            {[
              "Alma Matar-video-1.mp4",
              "Alma Matar-video-2.mp4",

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
