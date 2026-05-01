import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  'https://uvssieyftrokvxtcwfqg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2c3NpZXlmdHJva3Z4dGN3ZnFnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjYxNzA0MSwiZXhwIjoyMDkyMTkzMDQxfQ.xHrJEDUbak083ZKA2ntxCnzkPgtipMVqTuKwC6K9IxM'
)

async function fixStorage() {
  console.log('BUPEXSA: Configuring gallery-pro for videos...')
  
  const bucketName = 'gallery-pro'
  
  const { data, error: updateError } = await supabase.storage.updateBucket(bucketName, {
    public: true,
    allowedMimeTypes: null,
    fileSizeLimit: 52428800 // 50MB for now
  })

  if (updateError) {
    console.error('BUPEXSA: UPDATE FAILED:', updateError)
  } else {
    console.log('BUPEXSA: gallery-pro is now fully UNLOCKED.')
  }
}

fixStorage()
