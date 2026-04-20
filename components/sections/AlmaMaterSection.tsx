import Link from 'next/link';
import { ArrowRight, BookOpen, Music, History } from 'lucide-react';

interface AlmaMaterSectionProps {
  heading?: string;
  body: string;
  image: string;
  linkLabel?: string;
}

export default function AlmaMaterSection({
  heading = 'The PCSS Buea Legacy',
  body = 'Presbyterian College Secondary School (PCSS) Buea has a rich history of academic excellence and character building. Founded in 1985, our alma mater has produced some of the finest professionals serving across the globe today.',
  image,
  linkLabel = 'Learn more about PCSS Buea',
}: AlmaMaterSectionProps) {
  return (
    <section className="section-padding bg-dark text-white overflow-hidden relative">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[120px] -mr-64 -mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent rounded-full blur-[120px] -ml-64 -mb-64"></div>
      </div>

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-4 border-2 border-primary/30 rounded-3xl translate-x-8 translate-y-8 pointer-events-none hidden lg:block"></div>
            <div className="rounded-2xl overflow-hidden shadow-2xl relative z-20 aspect-[4/5] bg-gray-800">
               <img src={image} alt="PCSS Buea Alumni" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>

          <div className="order-1 lg:order-2 animate-slide-up">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] bg-white/10 text-accent mb-6">
              Our Roots
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">{heading}</h2>
            <div className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 space-y-6">
              <div dangerouslySetInnerHTML={{ __html: body }} />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Music className="h-8 w-8 text-accent mb-4" />
                <h4 className="font-bold mb-2">School Anthem</h4>
                <p className="text-sm text-white/50">Listen to or read the lyrics of our powerful school anthem.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <History className="h-8 w-8 text-primary mb-4" />
                <h4 className="font-bold mb-2">History & Traditions</h4>
                <p className="text-sm text-white/50">Explore the timeline of our school from 1985 to today.</p>
              </div>
            </div>

            <Link href="/alma-mater" className="btn-accent inline-flex items-center gap-2 px-8">
              {linkLabel} <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
