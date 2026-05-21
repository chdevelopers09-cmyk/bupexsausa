const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://uvssieyftrokvxtcwfqg.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2c3NpZXlmdHJva3Z4dGN3ZnFnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjYxNzA0MSwiZXhwIjoyMDkyMTkzMDQxfQ.xHrJEDUbak083ZKA2ntxCnzkPgtipMVqTuKwC6K9IxM';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkUser() {
  const email = 'Cordelian2@gmail.com';

  console.log(`Checking for email: ${email}`);

  // 1. Check Auth Users
  const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
  if (authError) {
    console.error('Auth Error:', authError);
  } else {
    const authUser = users.find(u => u.email?.toLowerCase() === email.toLowerCase());
    if (authUser) {
      console.log('Found in Auth Users:', JSON.stringify({
        id: authUser.id,
        email: authUser.email,
        app_metadata: authUser.app_metadata,
        user_metadata: authUser.user_metadata
      }, null, 2));
    } else {
      console.log('Not found in Auth Users');
    }
  }

  // 2. Check Members Table
  const { data: member, error: memberError } = await supabase
    .from('members')
    .select('*')
    .ilike('email', email)
    .maybeSingle();

  if (memberError) {
    console.error('Member Table Error:', memberError);
  } else if (member) {
    console.log('Found in Members Table:', JSON.stringify(member, null, 2));
  } else {
    console.log('Not found in Members Table');
  }
}

checkUser();
