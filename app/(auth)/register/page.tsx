import { Suspense } from 'react';
import RegisterClient from './RegisterClient';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Register - BUPEXSA USA',
  description: 'Join BUPEXSA USA today.',
};

import { createAdminClient } from '@/lib/supabase/admin';

export default async function RegisterPage() {
  const supabase = await createAdminClient();
  const { data: settingsData } = await supabase.from('site_settings').select('*');
  
  const settings = settingsData?.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {}) || {};

  return (
    <>
      <Navbar />
      
      {/* Title Area */}
      <section className="relative pt-36 pb-20 bg-[#090915] overflow-hidden flex items-center justify-center border-b border-slate-900">
        {/* Subtle mesh background pattern or gradient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,81,206,0.18)_0%,rgba(0,0,0,0)_75%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="container-wide relative z-10 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight font-serif text-white/95 leading-tight">
            Join BUPEXSA USA
          </h1>
        </div>
      </section>

      {/* Register Card Section */}
      <section className="py-20 bg-slate-50/50 min-h-[50vh] flex items-center justify-center">
        <div className="container-wide flex justify-center px-4 w-full">
          <Suspense fallback={<div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />}>
            <RegisterClient settings={settings} />
          </Suspense>
        </div>
      </section>

      <Footer />
    </>
  );
}
