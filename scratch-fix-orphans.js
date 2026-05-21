const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://uvssieyftrokvxtcwfqg.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2c3NpZXlmdHJva3Z4dGN3ZnFnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjYxNzA0MSwiZXhwIjoyMDkyMTkzMDQxfQ.xHrJEDUbak083ZKA2ntxCnzkPgtipMVqTuKwC6K9IxM';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixOrphans() {
  console.log('Fixing orphaned auth users...');

  const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
  if (authError) {
    console.error('Auth Error:', authError);
    return;
  }

  const { data: members, error: memberError } = await supabase
    .from('members')
    .select('id');

  if (memberError) {
    console.error('Member Table Error:', memberError);
    return;
  }

  const memberIds = new Set(members.map(m => m.id));
  const orphans = users.filter(u => !memberIds.has(u.id));

  console.log(`Found ${orphans.length} orphaned users to fix.`);

  for (const u of orphans) {
    console.log(`Fixing ${u.email}...`);
    
    const meta = u.user_metadata || {};
    const role = u.app_metadata?.role || 'member';

    const memberData = {
      id: u.id,
      email: u.email,
      full_name: meta.full_name || 'New Member',
      graduation_year: parseInt(meta.graduation_year || '2000'),
      us_state: meta.us_state || 'Unknown',
      phone: meta.phone || null,
      batch: meta.batch || null,
      profession: meta.profession || null,
      how_did_you_hear: meta.how_did_you_hear || null,
      status: meta.membership_status || (role === 'superadmin' || role === 'admin' ? 'ACTIVE' : 'PENDING'),
      role: role === 'superadmin' ? 'admin' : (role || 'member')
    };

    const { error: insertError } = await supabase
      .from('members')
      .insert(memberData);

    if (insertError) {
      console.error(`Failed to fix ${u.email}:`, insertError.message);
    } else {
      console.log(`Successfully fixed ${u.email}`);
    }
  }
}

fixOrphans();
