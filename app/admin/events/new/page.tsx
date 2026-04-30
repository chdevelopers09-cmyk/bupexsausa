import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import EventEditor from '../EventEditor';

export const metadata = {
  title: 'Create Event | Admin Panel',
};

export default async function NewEventPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/login');

  return <EventEditor />;
}
