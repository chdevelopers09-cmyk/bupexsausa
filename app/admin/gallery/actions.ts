'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function uploadImage(formData: FormData) {
  const supabase = await createAdminClient()
  const file = formData.get('file') as File
  const category = formData.get('category') as string
  const altText = formData.get('altText') as string

  if (!file) return { error: 'No file provided' }

  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`

  // Ensure bucket exists
  const { data: buckets } = await supabase.storage.listBuckets()
  const bucketExists = buckets?.some(b => b.name === 'gallery')
  
  if (!bucketExists) {
    const { error: bucketError } = await supabase.storage.createBucket('gallery', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
      fileSizeLimit: 5242880 // 5MB
    })
    if (bucketError) return { error: `Bucket initialization failed: ${bucketError.message}` }
  }

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('gallery')
    .upload(fileName, file)

  if (uploadError) return { error: `Upload failed: ${uploadError.message}` }

  const { error: dbError } = await supabase.from('gallery_images').insert({
    storage_path: uploadData.path,
    category,
    alt_text: altText,
  })

  if (dbError) return { error: dbError.message }

  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
  return { success: true }
}

export async function deleteImage(id: string, storagePath: string) {
  const supabase = await createAdminClient()

  const { error: storageError } = await supabase.storage
    .from('gallery')
    .remove([storagePath])

  if (storageError) return { error: storageError.message }

  const { error: dbError } = await supabase.from('gallery_images').delete().eq('id', id)

  if (dbError) return { error: dbError.message }

  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
  return { success: true }
}
