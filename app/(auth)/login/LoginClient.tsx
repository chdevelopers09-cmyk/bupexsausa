'use client';

import Link from 'next/link';
import { Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { login, resendVerification } from '../actions';
import { useSearchParams } from 'next/navigation';

export default function LoginClient() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const message = searchParams.get('message');
  const emailParam = searchParams.get('email');
  const next = searchParams.get('next') || '/dashboard';
  const [showPassword, setShowPassword] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState({ type: '', text: '' });

  const handleResend = async () => {
    if (!emailParam) return;
    setResending(true);
    const res = await resendVerification(emailParam);
    setResending(false);
    if (res.error) setResendMsg({ type: 'error', text: res.error });
    else setResendMsg({ type: 'success', text: 'Verification link sent! Please check your email.' });
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-[2rem] shadow-xl shadow-slate-100 border border-slate-100 p-8 md:p-12 relative z-10 animate-fade-in">
      
      {/* Header/Logo Section */}
      <div className="mb-8">
        <p className="text-xs font-black text-amber-600 uppercase tracking-[0.15em] mb-1.5">Member Access</p>
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-none">BUPEXSA USA Member Login</h2>
      </div>

      {/* Error / Feedback Alerts */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl space-y-2 animate-shake">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse shrink-0" />
            {error}
          </div>
          {emailParam && !resendMsg.text && (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="ml-4 text-purple-600 hover:underline uppercase tracking-widest text-[10px] font-black"
            >
              {resending ? 'Sending...' : 'Resend Verification Link'}
            </button>
          )}
        </div>
      )}

      {resendMsg.text && (
        <div className={cn(
          'mb-6 p-4 text-xs font-bold rounded-xl flex items-center gap-3',
          resendMsg.type === 'success'
            ? 'bg-emerald-50 border border-emerald-100 text-emerald-600'
            : 'bg-red-50 border border-red-100 text-red-600'
        )}>
          {resendMsg.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <span className="h-2 w-2 rounded-full bg-red-500" />}
          {resendMsg.text}
        </div>
      )}

      {message && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold rounded-xl flex items-center gap-3">
          <CheckCircle className="h-4 w-4" />
          {message}
        </div>
      )}

      {/* Credentials Form */}
      <form action={login} className="space-y-6">
        <input type="hidden" name="next" value={next} />

        {/* Email field */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 block">Email or Username</label>
          <input
            name="email"
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:border-purple-600 focus:ring-4 focus:ring-purple-100 outline-none transition-all placeholder:text-slate-300 font-semibold text-sm"
            required
          />
        </div>

        {/* Password field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-700 block">Password</label>
          </div>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 text-slate-900 focus:border-purple-600 focus:ring-4 focus:ring-purple-100 outline-none transition-all placeholder:text-slate-300 font-semibold text-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-600 transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Remember me option */}
        <div className="flex items-center gap-2.5">
          <input
            type="checkbox"
            id="remember"
            className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-600 cursor-pointer accent-purple-600"
          />
          <label htmlFor="remember" className="text-sm font-bold text-slate-700 cursor-pointer hover:text-slate-900 transition-colors">
            Remember me
          </label>
        </div>

        {/* Submit button - left-aligned pill to match Oroko USA */}
        <div className="flex flex-col gap-4 items-start pt-2">
          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-[#4C1D95] text-white font-black text-sm shadow-lg shadow-purple-200 hover:bg-[#5B21B6] hover:shadow-purple-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
            id="login-submit"
          >
            Log In
            <ArrowRight className="h-4 w-4" />
          </button>
          
          <div className="flex items-center justify-between w-full text-xs text-slate-400 font-medium">
            <p>
              Not registered yet?{' '}
              <Link href="/register" className="text-purple-600 font-black hover:underline">
                Join BUPEXSA USA
              </Link>
              .
            </p>
            <Link href="/forgot-password" className="text-purple-600 font-black hover:underline uppercase tracking-wider text-[10px]">
              Forgot Password?
            </Link>
          </div>
        </div>
      </form>

    </div>
  );
}
