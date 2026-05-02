export const dynamic = 'force-dynamic';
import { createAdminClient } from '@/lib/supabase/admin';
import { notFound } from 'next/navigation';
import ContentEditorClient from './ContentEditorClient';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export default async function ContentEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createAdminClient();

  const { data: section, error } = await supabase
    .from('page_layouts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !section) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-10 text-center">
        <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 max-w-md">
          <div className="h-20 w-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Sparkles size={40} className="opacity-20" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Section Not Found</h2>
          <p className="text-slate-500 text-sm mb-8">The section ID is invalid or has been removed. Please go back to the Page Manager and try again.</p>
          <Link href="/admin/visual-builder" className="btn-primary w-full justify-center py-4 rounded-2xl font-black">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return <ContentEditorClient section={section} />;
}
