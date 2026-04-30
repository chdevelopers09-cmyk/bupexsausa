import { createAdminClient } from '@/lib/supabase/server';
import VisualBuilderList from './VisualBuilderList';

export const metadata = {
  title: 'Visual Builder | Admin Panel',
};

export default async function VisualBuilderPage() {
  const supabase = await createAdminClient();

  const { data: pages, error } = await supabase
    .from('page_layouts')
    .select('*')
    .order('page_key', { ascending: true });

  if (error) console.error('Error:', error);

  return (
    <div className="max-w-7xl">
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-black text-slate-900 leading-tight">Visual Page Builder</h1>
        <p className="text-slate-500 mt-1">Select a page to modify its sections, hero content, and layout dynamically.</p>
      </div>

      <VisualBuilderList initialPages={pages || []} />
    </div>
  );
}
