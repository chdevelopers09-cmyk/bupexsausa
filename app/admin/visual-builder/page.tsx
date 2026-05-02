import { createAdminClient } from '@/lib/supabase/admin';
import VisualBuilderList from './VisualBuilderList';
import NewPageButton from './NewPageButton';

export const metadata = {
  title: 'Visual Builder | Admin Panel',
};

export default async function VisualBuilderPage() {
  const supabase = await createAdminClient();

  const { data: allLayouts, error } = await supabase
    .from('page_layouts')
    .select('*')
    .order('page_key', { ascending: true })
    .order('order_index', { ascending: true });

  if (error) console.error('Error:', error);

  // Group by page_key to show unique pages
  const uniquePages = Object.values((allLayouts || []).reduce((acc: any, item: any) => {
    if (!acc[item.page_key]) {
      acc[item.page_key] = {
        ...item,
        sectionCount: 0
      };
    }
    acc[item.page_key].sectionCount++;
    return acc;
  }, {}));

  return (
    <div className="max-w-7xl">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-black text-slate-900 leading-tight">Visual Page Builder</h1>
          <p className="text-slate-500 mt-1">Select a page to modify its sections, hero content, and layout dynamically.</p>
        </div>
        <NewPageButton />
      </div>

      <VisualBuilderList initialPages={uniquePages} />
    </div>
  );
}
