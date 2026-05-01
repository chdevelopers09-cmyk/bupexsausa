'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function uploadMedia(formData: FormData) {
  const supabase = await createAdminClient()
  const file = formData.get('file') as File
  const category = formData.get('category') as string
  const altText = formData.get('altText') as string

  if (!file) return { error: 'No file provided' }

  const isVideo = file.type.startsWith('video/')
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`

  // Ensure bucket exists and allows videos
  const { data: buckets } = await supabase.storage.listBuckets()
  const bucketExists = buckets?.some(b => b.name === 'gallery')
  
  if (!bucketExists) {
    await supabase.storage.createBucket('gallery', {
      public: true,
      allowedMimeTypes: null,
      fileSizeLimit: 104857600 // 100MB
    })
  } else {
    // Force update the existing bucket to allow all types
    await supabase.storage.updateBucket('gallery', {
      public: true,
      allowedMimeTypes: null,
      fileSizeLimit: 104857600 // 100MB
    })
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


export async function addVideo(formData: FormData) {
  const supabase = await createAdminClient()
  const videoUrl = formData.get('videoUrl') as string
  const category = formData.get('category') as string
  const altText = formData.get('altText') as string

  if (!videoUrl) return { error: 'No video URL provided' }

  const { error: dbError } = await supabase.from('gallery_images').insert({
    storage_path: videoUrl, // We store the URL in the same column
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

  // Only try to remove from storage if it's not a video URL (doesn't start with http)
  if (!storagePath.startsWith('http')) {
    const { error: storageError } = await supabase.storage
      .from('gallery')
      .remove([storagePath])
    if (storageError) console.error('Storage removal error:', storageError.message)
  }

  const { error: dbError } = await supabase.from('gallery_images').delete().eq('id', id)

  if (dbError) return { error: dbError.message }

  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
  return { success: true }
}

