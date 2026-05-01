'use client';

import { useState } from 'react';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { updateMemberDetails } from '../actions';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function MemberEditorForm({ member }: { member: any }) {
  const [formData, setFormData] = useState({
    full_name: member.full_name,
    email: member.email,
    phone: member.phone || '',
    graduation_year: member.graduation_year?.toString() || '',
    batch: member.batch || '',
    us_state: member.us_state || '',
    profession: member.profession || '',
    status: member.status,
    role: member.role,
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const supabase = createClient();
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: '', text: '' });

    try {
      const result = await updateMemberDetails(member.id, {
        full_name: formData.full_name,
        phone: formData.phone,
        graduation_year: parseInt(formData.graduation_year, 10),
        batch: formData.batch,
        us_state: formData.us_state,
        profession: formData.profession,
        status: formData.status,
        role: formData.role,
      });

      if (result.error) throw new Error(result.error);
      
      setMsg({ type: 'success', text: 'Member updated successfully.' });
      router.refresh();
      setTimeout(() => setMsg({ type: '', text: '' }), 3000);
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      
      {msg.text && (
        <div className={`px-4 py-3 rounded-2xl flex items-center gap-2 text-sm font-bold ${msg.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
          {msg.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          {msg.text}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
          <input
            type="text"
            value={formData.full_name}
            onChange={e => setFormData({ ...formData, full_name: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
          <input
            type="email"
            value={formData.email}
            className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed outline-none"
            disabled
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Phone</label>
          <input
            type="text"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">US State</label>
          <input
            type="text"
            value={formData.us_state}
            onChange={e => setFormData({ ...formData, us_state: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Grad Year</label>
          <input
            type="number"
            value={formData.graduation_year}
            onChange={e => setFormData({ ...formData, graduation_year: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Profession</label>
          <input
            type="text"
            value={formData.profession}
            onChange={e => setFormData({ ...formData, profession: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Account Status</label>
          <select
            value={formData.status}
            onChange={e => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none"
          >
            <option value="ACTIVE">Active</option>
            <option value="PENDING">Pending</option>
            <option value="EXPIRED">Expired</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">System Role</label>
          <select
            value={formData.role}
            onChange={e => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none"
          >
            <option value="member">Standard Member</option>
            <option value="admin">Administrator</option>
          </select>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
        <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto justify-center px-8 py-3 text-sm">
          {loading ? 'Saving...' : <><Save className="h-4 w-4 mr-2" /> Save Changes</>}
        </button>
      </div>
    </form>
  );
}
