import { createAdminClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import ChapterEditor from '../ChapterEditor';

export const metadata = {
  title: 'Edit Chapter | Admin Panel',
};

export default async function EditChapterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createAdminClient();

  const { data: chapter } = await supabase
    .from('chapters')
    .select('*')
    .eq('id', id)
    .single();

  if (!chapter) notFound();

  return <ChapterEditor chapter={chapter} />;
}
