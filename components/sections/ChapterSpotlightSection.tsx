import Link from 'next/link';
import { MapPin, Users, ArrowRight, Compass } from 'lucide-react';
import { createAdminClient } from '@/lib/supabase/admin';
import { getImageUrl } from '@/lib/utils';

interface ChapterSpotlightSectionProps {
  heading?: string;
  ctaLabel?: string;
}

export default async function ChapterSpotlightSection({
  heading = 'Explore Our Local Chapters',
  ctaLabel = 'View All Chapters',
}: ChapterSpotlightSectionProps) {
  const supabase = await createAdminClient();
  const { data: chapters } = await supabase
    .from('chapters')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true });

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none">
        <Compass className="h-96 w-96 text-primary" />
      </div>

      <div className="container-wide relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-dark mb-6">{heading}</h2>
            <p className="text-gray-500 text-lg">
              BUPEXSA USA is organized into local chapters across the United States. Join the chapter nearest to you to enjoy local events and networking.
            </p>
          </div>
          <Link href="/chapters" className="btn-secondary whitespace-nowrap hidden md:flex">
            {ctaLabel} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {chapters && chapters.length > 0 ? chapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/chapters/${chapter.slug}`}
              className="group flex flex-col bg-gray-50 rounded-2xl overflow-hidden hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-purple-100"
            >
              <div className="h-56 relative overflow-hidden">
                <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/0 transition-colors z-10" />
                <img
                  src={getImageUrl(chapter.banner_image_path) || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400'}
                  alt={chapter.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-primary font-bold text-xs">
                    <MapPin className="h-3 w-3" />
                    {chapter.state}
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-dark mb-4 group-hover:text-primary transition-colors">{chapter.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {chapter.description}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                    <Users className="h-4 w-4" />
                    {chapter.member_count} Members
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          )) : (
            <div className="md:col-span-2 text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-100">
               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No active chapters found at this time.</p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link href="/chapters" className="btn-primary w-full justify-center">
            {ctaLabel} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
