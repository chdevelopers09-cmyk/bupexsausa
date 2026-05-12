'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';
import { slugify } from '@/lib/utils';

export async function saveEvent(formData: any) {
  const supabase = await createAdminClient();
  const id = formData.id;
  
  const eventData = {
    title: formData.title,
    slug: formData.slug || slugify(formData.title),
    description: formData.description,
    start_datetime: formData.start_datetime,
    end_datetime: formData.end_datetime,
    location_name: formData.location_name,
    location_address: formData.location_address,
    category: formData.category,
    thumbnail_path: formData.thumbnail_path,
    max_attendees: parseInt(formData.max_attendees) || null,
    is_published: formData.is_published ?? false,
  };

  let error;
  if (id) {
    const { error: err } = await supabase.from('events').update(eventData).eq('id', id);
    error = err;
  } else {
    const { error: err } = await supabase.from('events').insert([eventData]);
    error = err;
  }

  if (error) return { error: error.message };

  revalidatePath('/admin/events');
  revalidatePath('/events');
  if (eventData.slug) revalidatePath(`/events/${eventData.slug}`);

  return { success: true };
}

export async function deleteEvent(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from('events').delete().eq('id', id);
  
  if (error) return { error: error.message };

  revalidatePath('/admin/events');
  return { success: true };
}

