import 'dotenv/config';
import { createAdminClient } from './lib/supabase/admin';

async function checkDatabase() {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from('chapters')
    .select('slug, name')
    .limit(20);

  if (error) {
    console.error('DB Error:', error);
  } else {
    console.log('--- Chapters ---');
    data.forEach(row => {
      console.log(`Slug: ${row.slug} | Name: ${row.name}`);
    });
  }
}

checkDatabase();
