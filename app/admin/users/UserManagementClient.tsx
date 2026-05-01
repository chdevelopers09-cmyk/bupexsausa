'use client';

import { useState, useTransition } from 'react';
import { UserPlus, Mail, Lock, ShieldCheck, AlertCircle, CheckCircle2, User } from 'lucide-react';
import { createAdminUser } from './actions';

export default function UserManagementClient() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    startTransition(async () => {
      const data = new FormData();
      data.append('email', formData.email);
      data.append('password', formData.password);

      const result = await createAdminUser(data);

      if (result.error) {
        setMessage({ type: 'error', text: result.error });
      } else {
        setMessage({ type: 'success', text: 'New Admin User created successfully!' });
        setFormData({ email: '', password: '' });
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Super Admin User Management</h1>
          <p className="text-slate-500 mt-1">Create additional administrators with full access to the panel.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Create New Admin</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Enter account details below</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-primary outline-none transition-all font-bold text-sm text-slate-900"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Account Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-primary outline-none transition-all font-bold text-sm text-slate-900"
                    placeholder="••••••••••••"
                    minLength={8}
                  />
                </div>
              </div>

              {message && (
                <div className={`p-4 rounded-2xl border flex items-center gap-3 animate-shake ${
                  message.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-700'
                }`}>
                  {message.type === 'success' ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
                  <span className="text-sm font-bold">{message.text}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 rounded-2xl bg-primary text-white font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="h-5 w-5" />
                    CREATE ADMINISTRATIVE USER
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0F172A] rounded-3xl p-8 text-white shadow-xl">
            <h3 className="text-lg font-black tracking-tight mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Security Protocol
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                   <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider leading-relaxed">
                  Users created here gain <span className="text-white">FULL ACCESS</span> to all administrative modules instantly.
                </p>
              </li>
              <li className="flex gap-3">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                   <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider leading-relaxed">
                  The password must be at least <span className="text-white">8 characters</span> long.
                </p>
              </li>
              <li className="flex gap-3">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                   <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider leading-relaxed">
                  New admins can log in using the standard <span className="text-white">Member Login</span> page.
                </p>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center">
             <div className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="h-6 w-6 text-slate-400" />
             </div>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Super Admin Account</p>
             <p className="text-sm font-black text-slate-900">chdevelopers09@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
