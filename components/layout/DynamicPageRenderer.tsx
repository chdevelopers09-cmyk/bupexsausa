import { getSectionComponent } from '@/lib/section-registry';
import { createClient } from '@/lib/supabase/server';

interface DynamicPageRendererProps {
  pageKey: string;
}

export default async function DynamicPageRenderer({ pageKey }: DynamicPageRendererProps) {
  const supabase = await createClient();

  // Fetch sections for this page from Supabase
  const { data: sections, error } = await supabase
    .from('page_layouts')
    .select('*')
    .eq('page_key', pageKey)
    .eq('visible', true)
    .order('order_index', { ascending: true });

  if (error) {
    console.error(`Error fetching sections for page ${pageKey}:`, error);
  }

  // If no sections found in DB, we could return a fallback or nothing
  if (!sections || sections.length === 0) {
    return (
      <div className="py-20 text-center text-slate-400 font-bold bg-slate-50 border-y border-slate-100">
        <p>No sections configured for this page in Visual Builder.</p>
      </div>
    );
  }

  return (
    <>
      {sections.map((section) => {
        const Component = getSectionComponent(section.component);
        if (!Component) {
          console.warn(`Component ${section.component} not found in registry.`);
          return null;
        }

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
