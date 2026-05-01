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

    // 1. Ensure bucket allows videos
    const bucketName = 'gallery-media'
    const { data: buckets } = await supabase.storage.listBuckets()
    let bucketExists = buckets?.some(b => b.name === bucketName)
    
    const bucketOptions = {
      public: true,
      allowedMimeTypes: null,
      fileSizeLimit: 209715200 // 200MB
    }

    if (!bucketExists) {
      console.log(`BUPEXSA: Creating fresh bucket ${bucketName}`)
      const { error: createError } = await supabase.storage.createBucket(bucketName, bucketOptions)
      if (createError) {
        console.error('Create Bucket Error:', createError)
        // If we can't create it, we'll try to use the old one as fallback
      } else {
        // Wait a moment for Supabase to propagate the new bucket
        await new Promise(resolve => setTimeout(resolve, 1000))
        bucketExists = true
      }
    } else {
      await supabase.storage.updateBucket(bucketName, bucketOptions)
    }

    // 2. Upload to Supabase Storage with explicit contentType override if needed
    console.log(`BUPEXSA: Attempting upload of ${file.name} (${file.type}) to ${bucketName}`)
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type // Ensure we send the real type
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
