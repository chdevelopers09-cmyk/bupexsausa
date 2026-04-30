import { createAdminClient } from '@/lib/supabase/admin';
import { notFound } from 'next/navigation';
import EventEditor from '../EventEditor';

export const metadata = {
  title: 'Edit Event | Admin Panel',
};

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createAdminClient();

  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (!event) notFound();

  return <EventEditor event={event} />;
}
