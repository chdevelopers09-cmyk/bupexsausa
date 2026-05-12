'use client';

import Link from 'next/link';
import { Mail, Lock, LogIn, ArrowLeft, CheckCircle, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';
import { cn } from '@/lib/utils';
import { useState } from 'react';

import { Suspense } from 'react';
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
    <div className="min-h-screen bg-gray-50/30 py-10 px-6 flex items-center justify-center">
      <div className="max-w-[480px] w-full animate-fade-in border border-gray-100 rounded-[2.5rem] bg-white overflow-hidden shadow-xl shadow-purple-100/10">
        {/* Header Section - Compact */}
        <div className="bg-[#8B5CF6] py-10 px-10 text-center text-white relative">
          <div className="h-20 w-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-2xl p-1.5 border border-white/20 overflow-hidden">
             <img src="/bupexsausa.png" alt="BUPEXSA USA Logo" className="w-full h-full object-contain scale-110" />
          </div>
          <h1 className="text-2xl font-black mb-1 tracking-tight">Member Login</h1>
          <p className="text-white/80 text-xs font-medium">Welcome back to the BUPEXSA family</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl space-y-3 animate-shake">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                {error}
              </div>
              {emailParam && !resendMsg.text && (
                <button 
                  type="button" 
                  onClick={handleResend}
                  disabled={resending}
                  className="ml-5 text-[#8B5CF6] hover:underline uppercase tracking-widest text-[10px] font-black"
                >
                  {resending ? 'Sending...' : 'Resend Verification Link'}
                </button>
              )}
            </div>
          )}

          {resendMsg.text && (
            <div className={cn(
              "mb-6 p-4 text-xs font-bold rounded-xl flex items-center gap-3 animate-in fade-in zoom-in duration-300",
              resendMsg.type === 'success' ? "bg-emerald-50 border border-emerald-100 text-emerald-600" : "bg-red-50 border border-red-100 text-red-600"
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

          <form action={login} className="space-y-6">
            <input type="hidden" name="next" value={next} />
            <div className="space-y-2">
              <label className="text-[12px] font-black text-gray-600 ml-1">Email or Username</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400 z-10" />
                <input
                  name="email"
                  type="text"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none transition-all placeholder:text-gray-300 font-bold text-sm shadow-sm"
                  placeholder="name@example.com or username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1 px-1">
                <label className="text-[12px] font-black text-gray-600">Password</label>
                <Link href="/forgot-password" title="Click to reset your password" className="text-[10px] text-[#8B5CF6] font-black uppercase tracking-widest hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400 z-10" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none transition-all placeholder:text-gray-300 font-bold text-sm shadow-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8B5CF6] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 py-1 px-1">
              <input type="checkbox" id="remember" className="h-4 w-4 rounded-md border-gray-300 text-[#8B5CF6] focus:ring-[#8B5CF6] cursor-pointer" />
              <label htmlFor="remember" className="text-[12px] font-bold text-gray-400 cursor-pointer hover:text-gray-600 transition-colors">Stay logged in</label>
            </div>

            <button type="submit" className="w-full py-4 rounded-2xl bg-[#8B5CF6] text-white font-black text-lg shadow-xl shadow-purple-100 hover:shadow-purple-200 transition-all group">
              Sign In
              <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="text-center text-gray-400 text-[12px] mt-8 font-medium">
            New? <Link href="/register" className="text-[#8B5CF6] font-black hover:underline underline-offset-4">Join now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
