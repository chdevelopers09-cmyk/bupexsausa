const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://uvssieyftrokvxtcwfqg.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2c3NpZXlmdHJva3Z4dGN3ZnFnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjYxNzA0MSwiZXhwIjoyMDkyMTkzMDQxfQ.xHrJEDUbak083ZKA2ntxCnzkPgtipMVqTuKwC6K9IxM';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkOrphans() {
  console.log('Checking for orphaned auth users (in Auth but not in Members table)...');

  const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
  if (authError) {
    console.error('Auth Error:', authError);
    return;
  }

  const { data: members, error: memberError } = await supabase
    .from('members')
    .select('id, email');

  if (memberError) {
    console.error('Member Table Error:', memberError);
    return;
  }

  const memberIds = new Set(members.map(m => m.id));
  const orphans = users.filter(u => !memberIds.has(u.id));

  console.log(`Found ${orphans.length} orphaned users.`);

  orphans.forEach(u => {
    console.log(`- ${u.email} (${u.id}) - Role: ${u.app_metadata?.role || 'member'}`);
  });
}

checkOrphans();
