'use client';
// Version: 1.0.1 - Force refresh for Password Generator UI

import { useState } from 'react';
import { Search, ShieldCheck, User, XCircle, Settings, Edit2, Trash2, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { updateAdminUser, deleteAdminUser } from './actions';

export default function UsersClient({ initialUsers }: { initialUsers: any[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [editingUser, setEditingUser] = useState<any>(null);
  const [deletingUser, setDeletingUser] = useState<any>(null);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const filtered = users.filter(u => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      if (!u.full_name?.toLowerCase().includes(q) && !u.email?.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const getRoleBadge = (role: string) => {
    const map: Record<string, { label: string, color: string, bg: string }> = {
      superadmin: { label: 'Super Admin', color: 'text-purple-700', bg: 'bg-purple-100 border-purple-200' },
      admin: { label: 'Admin', color: 'text-blue-700', bg: 'bg-blue-100 border-blue-200' },
      web_manager: { label: 'Web Manager', color: 'text-emerald-700', bg: 'bg-emerald-100 border-emerald-200' },
      portal_manager: { label: 'Portal Manager', color: 'text-amber-700', bg: 'bg-amber-100 border-amber-200' },
      orphan: { label: 'Orphaned Account', color: 'text-rose-700', bg: 'bg-rose-100 border-rose-200' },
    };
    const s = map[role] || { label: role, color: 'text-slate-700', bg: 'bg-slate-100 border-slate-200' };
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${s.bg} ${s.color}`}>
        {s.label}
      </span>
    );
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setLoading(true);
    setMessage(null);
    
    const result = await updateAdminUser(editingUser.id, {
      full_name: editingUser.full_name,
      username: editingUser.username || '',
      role: editingUser.role,
      status: editingUser.status,
      password: editingUser.password
    });

    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
      setEditingUser(null);
    }
    setLoading(false);
  };

  const handleDeleteUser = async () => {
    if (!deletingUser) return;
    setLoading(true);
    setMessage(null);
    
    const result = await deleteAdminUser(deletingUser.id);
    
    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setUsers(users.filter(u => u.id !== deletingUser.id));
      setDeletingUser(null);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-900/20 outline-none transition-shadow"
            />
          </div>
        </div>

        {message && (
          <div className={`m-4 p-4 rounded-2xl border flex items-center gap-3 animate-shake ${
            message.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-700'
          }`}>
            {message.type === 'success' ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
            <span className="text-sm font-bold flex-1">{message.text}</span>
            <button onClick={() => setMessage(null)} className="p-1 hover:bg-black/5 rounded-full"><X className="h-4 w-4" /></button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">User Info</th>
                <th className="px-6 py-4">Role & Access</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center gap-3">
                      <ShieldCheck className="h-8 w-8 text-slate-300" />
                      <p className="font-medium">No admin users found.</p>
                    </div>
                  </td>
                </tr>
              ) : filtered.map(user => (
                <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden shrink-0 flex items-center justify-center text-slate-500 font-bold">
                        {user.avatar_path ? (
                          <img src={user.avatar_path} alt={user.full_name} className="w-full h-full object-cover" />
                        ) : (
                          <User className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{user.full_name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    {getRoleBadge(user.role)}
                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">
                      {user.role === 'superadmin' ? 'Full System Access' : user.role === 'web_manager' ? 'Content & Pages' : user.role === 'orphan' ? '⚠️ Linked to deleted member' : 'Members & Payments'}
                    </p>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      user.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'
                    }`}>
                      {user.status === 'ACTIVE' ? 'Active' : 'Suspended'}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {user.is_protected && (
                        <div className="p-2 text-slate-300" title="System Protected Account">
                          <ShieldCheck className="h-4 w-4" />
                        </div>
                      )}
                      <button onClick={() => setEditingUser({...user})} className="p-2 text-slate-400 hover:text-primary rounded-lg hover:bg-primary/10 transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      {!user.is_protected && (
                        <button onClick={() => setDeletingUser(user)} className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Edit2 className="h-4 w-4 text-primary" /> Edit User Profile
              </h3>
              <button onClick={() => setEditingUser(null)} className="p-1 hover:bg-slate-100 rounded-full transition-colors"><X className="h-5 w-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleUpdateUser} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                  <input
                    type="text"
                    value={editingUser.full_name || ''}
                    onChange={e => setEditingUser({...editingUser, full_name: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Username</label>
                  <input
                    type="text"
                    value={editingUser.username || ''}
                    onChange={e => setEditingUser({...editingUser, username: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">System Role</label>
                <select
                  value={editingUser.role || 'admin'}
                  onChange={e => setEditingUser({...editingUser, role: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none"
                >
                  <option value="admin">Administrator</option>
                  <option value="web_manager">Web Manager</option>
                  <option value="portal_manager">Portal Manager</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Account Status</label>
                <select
                  value={editingUser.status || 'ACTIVE'}
                  onChange={e => setEditingUser({...editingUser, status: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="SUSPENDED">Suspended</option>
                </select>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Reset Password (Optional)</label>
                  <button 
                    type="button" 
                    onClick={() => {
                      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
                      const pass = Array.from({length: 12}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
                      setEditingUser({...editingUser, password: pass});
                    }}
                    className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
                  >
                    Generate Strong Password
                  </button>
                </div>
                <input
                  type="text"
                  value={editingUser.password || ''}
                  onChange={e => setEditingUser({...editingUser, password: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none font-mono"
                  placeholder="Enter new password (min 8 chars)..."
                  minLength={8}
                />
                <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">Leave blank to keep current password</p>
              </div>
              <div className="pt-4 mt-2 flex justify-end gap-3 border-t border-slate-100">
                <button type="button" onClick={() => setEditingUser(null)} className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-900">Cancel</button>
                <button type="submit" disabled={loading} className="px-6 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-colors">
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deletingUser && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-6 text-center animate-fade-in">
            <div className="h-14 w-14 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-7 w-7" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Delete {deletingUser.full_name}?</h3>
            <p className="text-slate-500 text-sm mb-6">This action cannot be undone. This user will lose all access immediately.</p>
            
            <div className="flex gap-3">
              <button disabled={loading} onClick={() => setDeletingUser(null)} className="flex-1 px-4 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
              <button disabled={loading} onClick={handleDeleteUser} className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-rose-600 rounded-xl hover:bg-rose-700 transition-colors">
                {loading ? 'Deleting...' : 'Delete User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
