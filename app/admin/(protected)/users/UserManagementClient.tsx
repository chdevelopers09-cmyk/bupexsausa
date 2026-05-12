'use client';

import { useState, useTransition } from 'react';
import { UserPlus, Mail, Lock, ShieldCheck, AlertCircle, CheckCircle2, User, Key } from 'lucide-react';
import { createAdminUser } from './actions';
import { useRouter } from 'next/navigation';

export default function UserManagementClient() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    role: 'admin',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    startTransition(async () => {
      const data = new FormData();
      data.append('full_name', formData.full_name);
      data.append('username', formData.username);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('role', formData.role);

      const result = await createAdminUser(data);

      if (result.error) {
        setMessage({ type: 'error', text: result.error });
      } else {
        setMessage({ type: 'success', text: 'New user created successfully!' });
        setTimeout(() => {
          router.push('/admin/users');
        }, 1500);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Account Details</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Configure access privileges</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                    <input
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-primary outline-none transition-all font-bold text-sm text-slate-900"
                      placeholder="Jane Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Username</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                    <input
                      type="text"
                      required
                      value={formData.username || ''}
                      onChange={e => setFormData({ ...formData, username: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-primary outline-none transition-all font-bold text-sm text-slate-900"
                      placeholder="janedoe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">System Role</label>
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                    <select
                      value={formData.role}
                      onChange={e => setFormData({ ...formData, role: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-primary outline-none transition-all font-bold text-sm text-slate-900"
                    >
                      <option value="admin">Administrator</option>
                      <option value="web_manager">Web Manager</option>
                      <option value="portal_manager">Portal Manager</option>
                      <option value="superadmin">Super Admin</option>
                    </select>
                  </div>
                </div>

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
                className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-sm shadow-xl shadow-slate-900/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center gap-2 mt-8"
              >
                {isPending ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="h-5 w-5" />
                    CREATE USER
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
              Access Roles
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                   <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider leading-relaxed">
                  <span className="text-white block mb-1">Super Admin</span>
                  Full unrestricted access to all modules and user management.
                </p>
              </li>
              <li className="flex gap-3">
                <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider leading-relaxed">
                  <span className="text-white block mb-1">Web Manager</span>
                  Controls website content, pages, events, and news.
                </p>
              </li>
              <li className="flex gap-3">
                <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                   <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider leading-relaxed">
                  <span className="text-white block mb-1">Portal Manager</span>
                  Handles member directory, applications, and payments.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
