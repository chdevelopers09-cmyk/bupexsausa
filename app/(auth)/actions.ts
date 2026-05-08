'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient, createAdminClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const adminSupabase = await createAdminClient()

  const identifier = formData.get('email') as string
  const password = formData.get('password') as string

  let email = identifier

  // If identifier is not an email, assume it's a username and find the associated email
  if (!identifier.includes('@')) {
    const { data: users, error: listError } = await adminSupabase.auth.admin.listUsers()
    if (!listError) {
      const user = users.users.find(u => u.user_metadata?.username === identifier)
      if (user) {
        email = user.email!
      } else {
        return redirect('/login?error=' + encodeURIComponent('Invalid username or password'))
      }
    }
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  const next = (formData.get('next') as string) || '/dashboard'

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(next)}`)
  }

  revalidatePath('/', 'layout')
  redirect(next)
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const adminSupabase = await createAdminClient()

  const email = formData.get('email') as string
  const username = formData.get('username') as string
  const password = formData.get('password') as string
  const full_name = formData.get('full_name') as string
  const graduation_year = (formData.get('graduation_year') as string) || null
  const us_state = formData.get('us_state') as string
  const phone = formData.get('phone') as string
  const batch = formData.get('batch') as string
  const profession = formData.get('profession') as string
  const how_did_you_hear = formData.get('how_did_you_hear') as string

  const payment_method = formData.get('payment_method') as string
  const payment_proof = formData.get('payment_proof') as File | null
  
  // Check if username is already taken (metadata search)
  const { data: users } = await adminSupabase.auth.admin.listUsers()
  if (users.users.some(u => u.user_metadata?.username === username)) {
    return { error: 'Username is already taken' }
  }

  const isManualPayment = ['paypal', 'zelle', 'cashapp'].includes(payment_method)
  const membership_status = isManualPayment ? 'PENDING_VERIFICATION' : 'ACTIVE'
  const member_id = `BUP-${Math.floor(100000 + Math.random() * 900000)}`

  // Use Admin Client to create user
  const { data: userData, error: createError } = await adminSupabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      username,
      full_name,
      graduation_year,
      us_state,
      phone,
      batch,
      profession,
      how_did_you_hear,
      membership_plan: formData.get('membership_plan') as string,
      membership_status: membership_status,
      member_id: member_id,
    }
  })

  if (createError) {
    return { error: createError.message }
  }

  const userId = userData.user.id
  let proofPath = null

  // Handle manual payment proof upload
  if (isManualPayment && payment_proof) {
    const fileExt = payment_proof.name.split('.').pop()
    proofPath = `${userId}/reg-proof-${Date.now()}.${fileExt}`
    
    await adminSupabase.storage
      .from('payment-proofs')
      .upload(proofPath, payment_proof)
  }

  // Create payment record
  const { data: settingsData } = await adminSupabase.from('site_settings').select('*')
  const settings = settingsData?.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {}) || {}
  const amount = Number(settings.membership_fee || 100) + 50 // Fee + Reg

  await adminSupabase.from('payments').insert({
    member_id: userId,
    type: 'MEMBERSHIP',
    amount: amount,
    method: payment_method.toUpperCase(),
    status: isManualPayment ? 'PENDING_VERIFICATION' : 'COMPLETED',
    proof_storage_path: proofPath,
  })

  // Log in the user immediately
  const { error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (loginError) {
    return { error: 'Registration successful, but login failed. Please log in manually.' }
  }

  revalidatePath('/', 'layout')
  return { 
    success: true, 
    member: {
      id: member_id,
      full_name,
      plan: formData.get('membership_plan')
    }
  }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signInWithGoogle() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (data.url) {
    redirect(data.url)
  }
}
