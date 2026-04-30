'use client';

import Link from 'next/link';
import { Mail, Lock, LogIn, ArrowLeft, CheckCircle, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { useState } from 'react';

import { Suspense } from 'react';
import { login, signInWithGoogle } from '../actions';
import { useSearchParams } from 'next/navigation';

export default function LoginClient() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const message = searchParams.get('message');
  const next = searchParams.get('next') || '/dashboard';
  const [showPassword, setShowPassword] = useState(false);

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
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl flex items-center gap-3 animate-shake">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              {error}
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
                <Link href="/reset-password" className="text-[10px] text-[#8B5CF6] font-black uppercase tracking-widest hover:underline">
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

          <div className="relative my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-[10px] uppercase font-black text-gray-300 tracking-widest">Social</span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          <button type="button" onClick={() => signInWithGoogle()} className="w-full py-3.5 rounded-2xl border border-gray-100 bg-white flex items-center justify-center gap-3 font-bold text-gray-700 hover:bg-gray-50 transition-all text-sm">
            <svg className="h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Sign in with Google
          </button>

          <p className="text-center text-gray-400 text-[12px] mt-8 font-medium">
            New? <Link href="/register" className="text-[#8B5CF6] font-black hover:underline underline-offset-4">Join now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
