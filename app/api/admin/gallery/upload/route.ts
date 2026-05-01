import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 60 // 1 minute for large uploads

export async function POST(req: Request) {
  try {
    const supabase = await createAdminClient()
    const formData = await req.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string
    const altText = formData.get('altText') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`

    // 1. Use the new Premium Bucket (gallery-pro)
    const bucketName = 'gallery-pro'
    
    // 2. Upload to Supabase Storage (Now fully unlocked)
    console.log(`BUPEXSA: Attempting pro upload of ${file.name} to ${bucketName}`)
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type // Use real type now that bucket allows it
      })

    if (uploadError) {
      console.error('Final Upload Error:', uploadError)
      return NextResponse.json({ 
        error: `Storage Error: ${uploadError.message}. Type: ${file.type}`,
        details: uploadError
      }, { status: 500 })
    }

    // 3. Insert into database (include bucket prefix in storage_path)
    const { error: dbError } = await supabase.from('gallery_images').insert({
      storage_path: `${bucketName}/${uploadData.path}`,
      category,
      alt_text: altText,
    })

    if (dbError) {
      console.error('DB Error:', dbError)
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    revalidatePath('/admin/gallery')
    revalidatePath('/gallery')

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Upload API Critical Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
