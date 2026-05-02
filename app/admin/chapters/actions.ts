'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';
import { slugify } from '@/lib/utils';

export async function saveChapter(formData: any) {
  const supabase = await createAdminClient();
  const id = formData.id;
  
  const chapterData = {
    name: formData.name,
    slug: formData.slug || slugify(formData.name),
    state: formData.state,
    description: formData.description,
    banner_image_path: formData.banner_image_path,
    is_active: formData.is_active ?? true,
  };

  let error;
  if (id) {
    const { error: err } = await supabase.from('chapters').update(chapterData).eq('id', id);
    error = err;
  } else {
    const { error: err } = await supabase.from('chapters').insert([chapterData]);
    error = err;
  }

  if (error) return { error: error.message };

  revalidatePath('/admin/chapters');
  revalidatePath('/chapters');
  if (chapterData.slug) revalidatePath(`/chapters/${chapterData.slug}`);

  return { success: true };
}

export async function deleteChapter(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from('chapters').delete().eq('id', id);
  
  if (error) return { error: error.message };

  revalidatePath('/admin/chapters');
  return { success: true };
}
export async function uploadChapterMedia(formData: FormData) {
  const supabase = await createAdminClient();
  const file = formData.get('file') as File;
  if (!file) return { error: 'No file provided' };

  const fileName = `chapters/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const bucketName = 'gallery'; // Reusing established bucket

  // Upload with professional bypass
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: 'application/x-binary'
    });

  if (error) return { error: error.message };

  // Return the public path
  return { 
    success: true, 
    path: `${bucketName}/${data.path}` 
  };
}
