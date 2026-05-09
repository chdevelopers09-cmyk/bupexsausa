import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://uvssieyftrokvxtcwfqg.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2c3NpZXlmdHJva3Z4dGN3ZnFnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjYxNzA0MSwiZXhwIjoyMDkyMTkzMDQxfQ.xHrJEDUbak083ZKA2ntxCnzkPgtipMVqTuKwC6K9IxM';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function updateChapter() {
  // First, let's see all chapters
  const { data: all } = await supabase.from('chapters').select('id, name, slug, state');
  console.log('All chapters:', JSON.stringify(all, null, 2));

  // Update by slug
  const { data, error } = await supabase
    .from('chapters')
    .update({ 
      name: 'DC/Maryland/VA Chapter', 
      state: 'DC/Maryland/VA',
      description: 'Serving alumni in the DC, Maryland, and Virginia area. One of our most engaged communities.'
    })
    .eq('slug', 'maryland-dc')
    .select();

  if (error) {
    console.error('Error updating by slug:', error.message);
    
    // Try updating by name pattern
    const { data: data2, error: error2 } = await supabase
      .from('chapters')
      .update({ 
        name: 'DC/Maryland/VA Chapter', 
        state: 'DC/Maryland/VA' 
      })
      .ilike('name', '%Maryland%')
      .select();
      
    if (error2) {
      console.error('Error updating by name:', error2.message);
    } else {
      console.log('Updated by name match:', JSON.stringify(data2, null, 2));
    }
  } else {
    console.log('Updated successfully:', JSON.stringify(data, null, 2));
  }
}

updateChapter();
