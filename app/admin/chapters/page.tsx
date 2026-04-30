import { createAdminClient } from '@/lib/supabase/server';
import AdminChaptersClient from './ChaptersClient';

export const metadata = {
  title: 'Manage Regional Chapters | Admin Panel',
};

export default async function AdminChaptersPage() {
  const supabase = await createAdminClient();

  const { data: chapters, error } = await supabase
    .from('chapters')
    .select('*')
    .order('name', { ascending: true });

  if (error) console.error('Error:', error);

  return (
    <div className="max-w-7xl">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-black text-slate-900 leading-tight">Regional Chapters</h1>
        <p className="text-slate-500 mt-1">Manage state-based alumni groups, their leadership (EXCO), and local activities.</p>
      </div>

      <AdminChaptersClient initialChapters={chapters || []} />
    </div>
  );
}
