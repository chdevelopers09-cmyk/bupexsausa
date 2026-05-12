import { createAdminClient } from '@/lib/supabase/admin'
import GalleryClient from './GalleryClient'

export const metadata = {
  title: 'Gallery Admin - BUPEXSA USA',
}

export default async function GalleryAdminPage() {
  const supabase = await createAdminClient()
  
  const { data: images } = await supabase
    .from('gallery_images')
    .select('*')
    .order('uploaded_at', { ascending: false })

  return <GalleryClient initialImages={images || []} />
}
