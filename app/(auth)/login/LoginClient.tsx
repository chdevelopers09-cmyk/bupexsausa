'use client';

import Link from 'next/link';
import { Mail, Lock, LogIn, ArrowLeft, CheckCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/mock-data';

import { Suspense } from 'react';
import { login, signInWithGoogle } from '../actions';
import { useSearchParams } from 'next/navigation';

export default function LoginClient() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const message = searchParams.get('message');

  return (
    <div className="min-h-screen bg-bg-purple/30 flex items-center justify-center p-6">
      <div className="max-w-md w-full animate-fade-in">
        <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:gap-3 transition-all">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-50">
          <div className="bg-primary p-10 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="relative z-10">
              <div className="h-20 w-20 rounded-2xl bg-white p-2 flex items-center justify-center mx-auto mb-6 shadow-2xl transform transition-transform hover:rotate-3">
                <img src="/bupexsausa.png" alt="BUPEXSA USA Logo" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-3xl font-black tracking-tight">Member Login</h1>
              <p className="text-white/80 text-sm mt-2 font-medium">Welcome back to the BUPEXSA family</p>
            </div>
          </div>

          <div className="p-10">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-bold rounded-2xl animate-shake flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                {error}
              </div>
            )}
            {message && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold rounded-2xl flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                {message}
              </div>
            )}

            <form action={login} className="space-y-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-dark uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-all group-focus-within:text-primary group-focus-within:scale-110" />
                  <input
                    name="email"
                    type="email"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-300 font-medium text-dark placeholder:text-gray-300"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between mb-1 px-1">
                  <label className="text-xs font-black text-dark uppercase tracking-widest">Password</label>
                  <Link href="/reset-password" title="Recover your password" className="text-[10px] text-primary font-black uppercase tracking-widest hover:underline">
                    Forgot?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-all group-focus-within:text-primary group-focus-within:scale-110" />
                  <input
                    name="password"
                    type="password"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-300 font-medium text-dark placeholder:text-gray-300"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                <input type="checkbox" id="remember" className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" />
                <label htmlFor="remember" className="text-sm font-medium text-gray-500 cursor-pointer">Stay logged in for 30 days</label>
              </div>

              <button type="submit" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white text-lg font-black py-4 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                Sign In to Account
              </button>
            </form>

            <div className="relative my-10 flex items-center gap-4">
               <div className="h-px flex-1 bg-gray-100" />
               <span className="text-[10px] uppercase font-black tracking-widest text-gray-400">Security Login</span>
               <div className="h-px flex-1 bg-gray-100" />
            </div>

            <form action={signInWithGoogle}>
              <button type="submit" className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-100 py-3.5 rounded-2xl font-black text-dark hover:bg-gray-50 hover:border-primary/20 transition-all duration-300">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5" />
                Sign in with Google
              </button>
            </form>

            <p className="text-center text-gray-500 text-sm mt-12 font-medium">
              New to BUPEXSA? <Link href="/register" className="text-primary font-black hover:underline underline-offset-4">Join now</Link>
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} {SITE_CONFIG.name}<br />
            Powered by Supabase Secure Auth
          </p>
        </div>
      </div>
    </div>
  );
}
