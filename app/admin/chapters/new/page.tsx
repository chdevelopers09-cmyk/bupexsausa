import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ChapterEditor from '../ChapterEditor';

export const metadata = {
  title: 'Create Chapter | Admin Panel',
};

export default async function NewChapterPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/login');

  return <ChapterEditor />;
}
