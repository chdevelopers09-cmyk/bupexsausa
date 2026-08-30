import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('proof') as File | null;
    const type = (formData.get('type') as string) || 'MEMBERSHIP';
    const method = (formData.get('method') as string) || 'MANUAL';
    const amount = Number(formData.get('amount') || 0);

    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

    let filePath: string | null = null;
    if (file) {
      const fileExt = (file.name || 'proof').split('.').pop();
      filePath = `${user.id}/proof-${Date.now()}.${fileExt}`;
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer]);

      const { error: uploadError } = await supabase.storage
        .from('payment-proofs')
        .upload(filePath, blob as any);

      if (uploadError) {
        console.error('Upload error', uploadError);
        return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
      }
    }

    const { error: insertError } = await supabase.from('payments').insert({
      member_id: user.id,
      type,
      amount,
      method: method.toUpperCase(),
      status: 'PENDING_VERIFICATION',
      proof_storage_path: filePath,
    });

    if (insertError) {
      console.error('Insert payment error', insertError);
      return NextResponse.json({ error: 'Failed to record payment' }, { status: 500 });
    }

    // Notify admins and send transactional email to member
    try {
      const { sendEmail } = await import('@/lib/mailer');
      await sendEmail({
        to: user.email || '',
        subject: 'Payment Received — Pending Verification',
        text: `We received your payment of $${amount}. Our team will verify and activate your membership shortly.`
      });
    } catch (e) {
      console.warn('Mailer failed (non-fatal)', e);
    }

    revalidatePath('/admin/payments');
    revalidatePath(`/admin/members/${user.id}`);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}
