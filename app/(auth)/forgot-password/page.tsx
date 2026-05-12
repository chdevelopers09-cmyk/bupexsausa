'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { SITE_CONFIG } = await import('@/lib/mock-data');
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${SITE_CONFIG.url}/auth/callback?next=/reset-password`,
    });

    if (resetError) {
      setError(resetError.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6 animate-fade-in bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-purple-100/20 border border-gray-100">
          <div className="h-20 w-20 rounded-3xl bg-emerald-50 flex items-center justify-center mx-auto border border-emerald-100">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-black text-dark">Check your email</h1>
          <p className="text-gray-500 leading-relaxed text-sm">
            We have sent a password reset link to <span className="font-bold text-dark">{email}</span>.
          </p>
          <div className="pt-4">
            <Link href="/login" className="text-primary font-black uppercase tracking-widest text-xs hover:underline inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full animate-fade-in">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-[#8B5CF6] flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-sm">BX</span>
            </div>
            <span className="font-black text-dark text-lg uppercase tracking-tight">BUPEXSA USA</span>
          </Link>
          <h1 className="text-3xl font-black text-dark mb-2">Forgot Password?</h1>
          <p className="text-gray-500 text-sm">No worries, we'll send you reset instructions.</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-purple-100/20 p-10 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 text-dark focus:bg-white focus:border-primary outline-none transition-all font-bold"
                  placeholder="Enter your registered email"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl animate-shake">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full py-4 rounded-2xl bg-[#8B5CF6] text-white font-black text-lg shadow-xl shadow-purple-100 hover:shadow-purple-200 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Reset Password
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-8">
          <Link href="/login" className="text-gray-400 font-bold hover:text-dark transition-colors inline-flex items-center gap-2 text-sm">
            <ArrowLeft className="h-4 w-4" /> Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
