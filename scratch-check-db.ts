import 'dotenv/config';
import { createAdminClient } from './lib/supabase/admin';

async function checkDatabase() {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from('page_layouts')
    .select('id, page_key, component')
    .limit(20);

  if (error) {
    console.error('DB Error:', error);
  } else {
    console.log('--- Page Layouts Snapshot ---');
    data.forEach(row => {
      console.log(`ID: ${row.id} | Key: ${row.page_key} | Component: ${row.component}`);
    });
  }
}

checkDatabase();
