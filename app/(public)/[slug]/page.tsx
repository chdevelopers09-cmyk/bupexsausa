export const dynamic = 'force-dynamic';

import { createAdminClient } from '@/lib/supabase/admin';
import { notFound } from 'next/navigation';

// Import all possible sections
import HeroSection from '@/components/sections/HeroSection';
import StatsBarSection from '@/components/sections/StatsBarSection';
import CardGridSection from '@/components/sections/CardGridSection';
import EventsPreviewSection from '@/components/sections/EventsPreviewSection';
import AnnouncementsSection from '@/components/sections/AnnouncementsSection';
import ChapterSpotlightSection from '@/components/sections/ChapterSpotlightSection';
import DonationCtaSection from '@/components/sections/DonationCtaSection';
import GalleryStripSection from '@/components/sections/GalleryStripSection';

const SectionMap: Record<string, any> = {
  'HeroSection': HeroSection,
  'StatsBarSection': StatsBarSection,
  'CardGridSection': CardGridSection,
  'EventsPreviewSection': EventsPreviewSection,
  'AnnouncementsSection': AnnouncementsSection,
  'ChapterSpotlightSection': ChapterSpotlightSection,
  'DonationCtaSection': DonationCtaSection,
  'GalleryStripSection': GalleryStripSection,
};

export default async function DynamicPage({ 
    params, 
    searchParams 
}: { 
    params: Promise<{ slug: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug } = await params;
  const { preview } = await searchParams;
  const isPreview = preview === 'true';
  const supabase = await createAdminClient();

  // Fetch sections for this slug
  let query = supabase
    .from('page_layouts')
    .select('*')
    .eq('slug', slug)
    .eq('visible', true)
    .order('order_index', { ascending: true });

  if (!isPreview) {
    query = query.eq('is_draft', false);
  }

  const { data: sections, error } = await query;

  if (error || !sections || sections.length === 0) {
    // If no published sections, try to find if the page exists at all
    const { data: exists } = await supabase
        .from('page_layouts')
        .select('page_key')
        .eq('slug', slug)
        .limit(1);
    
    if (!exists || exists.length === 0) notFound();
    
    // If it exists but no sections are published, show a friendly message or draft
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-10 text-center">
            <h1 className="text-4xl font-black text-slate-900 mb-4">Coming Soon</h1>
            <p className="text-slate-500 max-w-md mx-auto">This page is currently being designed and will be available soon. Please check back later!</p>
        </div>
    );
  }

  return (
    <>
      {sections.map((section) => {
        const Component = SectionMap[section.component];
        if (!Component) return null;

        return (
          <Component 
            key={section.id}
            variant={section.variant}
            {...section.content}
          />
        );
      })}
    </>
  );
}
