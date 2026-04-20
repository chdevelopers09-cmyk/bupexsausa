import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import CheckoutClient from './CheckoutClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Membership Checkout | Dashboard',
};

export default async function CheckoutPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  // Load site settings for the current fee
  const { data: feeSetting } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'membership_fee')
    .single();

  const feeAmount = feeSetting?.value || 100;

  return (
    <div className="max-w-6xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/payments" className="p-2 bg-white rounded-xl border border-gray-100 hover:border-primary/30 transition-all text-gray-400 hover:text-primary">
            <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
            <h1 className="text-2xl font-black text-dark leading-tight">Complete Membership Payment</h1>
            <p className="text-gray-500 text-sm font-medium mt-1">Activate your BUPEXSA USA status for the current year.</p>
        </div>
      </div>

      <CheckoutClient fee={feeAmount} memberId={session.user.id} />
    </div>
  );
}
