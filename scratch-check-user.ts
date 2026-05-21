import { createAdminClient } from './lib/supabase/admin';

async function checkUser() {
  const supabase = await createAdminClient();
  const email = 'Cordelian2@gmail.com';

  console.log(`Checking for email: ${email}`);

  // 1. Check Auth Users
  const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
  if (authError) {
    console.error('Auth Error:', authError);
  } else {
    const authUser = users.find(u => u.email?.toLowerCase() === email.toLowerCase());
    if (authUser) {
      console.log('Found in Auth Users:', {
        id: authUser.id,
        email: authUser.email,
        app_metadata: authUser.app_metadata,
        user_metadata: authUser.user_metadata
      });
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
    console.log('Found in Members Table:', member);
  } else {
    console.log('Not found in Members Table');
  }
}

checkUser();
