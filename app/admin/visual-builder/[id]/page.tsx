export const dynamic = 'force-dynamic';
import { createAdminClient } from '@/lib/supabase/admin';
import { notFound } from 'next/navigation';
import LayoutManager from '../layout/page';

export default async function PageBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createAdminClient();

  // 1. Get the page_key for this ID
  const { data: sourcePage } = await supabase
    .from('page_layouts')
    .select('page_key')
    .eq('id', id)
    .single();

  if (!sourcePage) notFound();

  // 2. Get all sections for this page_key
  const { data: sections } = await supabase
    .from('page_layouts')
    .select('*')
    .eq('page_key', sourcePage.page_key)
    .order('order_index', { ascending: true });

  return (
    <LayoutManager 
      initialSections={sections || []} 
      pageKey={sourcePage.page_key} 
    />
  );
}
