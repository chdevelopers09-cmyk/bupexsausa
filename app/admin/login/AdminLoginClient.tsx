'use client';

import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { login } from '../../(auth)/actions';
import { useSearchParams } from 'next/navigation';

export default function AdminLoginClient() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6">
      <div className="max-w-[440px] w-full space-y-8 animate-fade-in">
        {/* Logo & Header */}
        <div className="text-center space-y-4">
          <div className="h-16 w-16 bg-primary rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-primary/20 ring-4 ring-primary/10">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-white tracking-tight">Portal Access</h1>
            <p className="text-slate-400 text-sm font-medium">Restricted Administrative Environment</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-[#1E293B] border border-slate-800 rounded-[2rem] p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-xl flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              {error}
            </div>
          )}

          <form 
            action={async (formData) => {
              setLoading(true);
              await login(formData);
              setLoading(false);
            }} 
            className="space-y-6"
          >
            <input type="hidden" name="next" value="/admin" />
            
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Admin Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900/50 border border-slate-800 text-white focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-600 font-bold text-sm"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1 px-1">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Security Key</label>
                <Link href="/forgot-password" size="sm" className="text-[10px] text-primary font-black uppercase tracking-widest hover:underline transition-all">
                  Reset
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-slate-900/50 border border-slate-800 text-white focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-600 font-bold text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 rounded-xl bg-primary text-white font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none group"
            >
              {loading ? 'Authenticating...' : 'Establish Access'}
              {!loading && <ArrowRight className="inline-block ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center">
           <Link href="/" className="text-[11px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
             &larr; Return to Website
           </Link>
        </div>
      </div>
    </div>
  );
}
