'use client';

import { useState } from 'react';
import { 
    Search, Filter, Download, ArrowUpRight, ArrowDownLeft, 
    CheckCircle2, XCircle, Clock, ExternalLink, Image as ImageIcon, 
    MoreVertical, DollarSign, Wallet, CreditCard 
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import ProofModal from './ProofModal';
import { approvePayment } from './actions';

export default function AdminPaymentsClient({ initialPayments }: { initialPayments: any[] }) {
    const [payments, setPayments] = useState(initialPayments);
    const [tab, setTab] = useState<'ALL' | 'MEMBERSHIP' | 'DONATION'>('ALL');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [selectedPayment, setSelectedPayment] = useState<any>(null);
    const supabase = createClient();

    const filtered = payments.filter(p => {
        if (tab !== 'ALL' && p.type !== tab) return false;
        if (statusFilter !== 'ALL' && p.status !== statusFilter) return false;
        return true;
    });

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'COMPLETED': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'PENDING_VERIFICATION': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'FAILED': return 'bg-rose-50 text-rose-600 border-rose-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    const handleQuickApprove = async (id: string, memberId: string) => {
        if (!confirm('Quick approve this payment?')) return;
        const res = await approvePayment(id, memberId);
        if (res.success) {
            setPayments(payments.map(p => p.id === id ? { ...p, status: 'COMPLETED' } : p));
        } else {
            alert(res.error);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Stats Overview */}
            <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                            <DollarSign size={20} />
                        </div>
                    </div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Revenue (MTD)</p>
                    <p className="text-2xl font-black text-slate-900 mt-1">$4,250.00</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="h-10 w-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                            <Wallet size={20} />
                        </div>
                    </div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Membership Dues</p>
                    <p className="text-2xl font-black text-slate-900 mt-1">42 Paid</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="h-10 w-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                            <Clock size={20} />
                        </div>
                    </div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Pending Verification</p>
                    <p className="text-2xl font-black text-slate-900 mt-1">{payments.filter(p => p.status === 'PENDING_VERIFICATION').length} Items</p>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-slate-100 bg-slate-50/50">
                    {['ALL', 'MEMBERSHIP', 'DONATION'].map(t => (
                        <button
                            key={t}
                            onClick={() => setTab(t as any)}
                            className={`px-8 py-5 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${
                                tab === t ? 'border-primary text-primary bg-white' : 'border-transparent text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-3">
                        <select 
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                            className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/10"
                        >
                            <option value="ALL">All Statuses</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="PENDING_VERIFICATION">Pending Approval</option>
                            <option value="FAILED">Failed</option>
                        </select>
                    </div>
                    <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-primary transition-colors">
                        <Download size={14} /> Export CSV
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-4">Transaction</th>
                                <th className="px-8 py-4">Member</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4">Amount / Method</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filtered.length === 0 ? (
                                <tr><td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-medium italic">No transactions found matching filters.</td></tr>
                            ) : filtered.map(p => (
                                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${p.type === 'MEMBERSHIP' ? 'bg-purple-50 text-primary' : 'bg-blue-50 text-blue-600'}`}>
                                                {p.type === 'MEMBERSHIP' ? <CreditCard size={18} /> : <DollarSign size={18} />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{p.type}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{new Date(p.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <Link href={`/admin/members/${p.member_id}`} className="font-bold text-slate-700 hover:text-primary transition-colors flex items-center gap-1">
                                            {p.members?.full_name || 'Member Account'} <ExternalLink size={12} className="opacity-0 group-hover:opacity-100" />
                                        </Link>
                                        <p className="text-xs text-slate-400 mt-0.5">{p.members?.email}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(p.status)}`}>
                                            {p.status === 'COMPLETED' ? <CheckCircle2 size={12} /> : p.status === 'PENDING_VERIFICATION' ? <Clock size={12} /> : <XCircle size={12} />}
                                            {p.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="font-black text-slate-900">${p.amount}</p>
                                        <p className="text-xs text-slate-500 font-medium">{p.method}</p>
                                    </td>
                                    <td className="px-8 py-6 text-right space-x-2">
                                         {p.status === 'PENDING_VERIFICATION' && (
                                             <>
                                                 {p.proof_storage_path && (
                                                     <button 
                                                         onClick={() => setSelectedPayment(p)}
                                                         className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors"
                                                     >
                                                         <ImageIcon size={12} /> View Proof
                                                     </button>
                                                 )}
                                                 <button 
                                                     onClick={() => handleQuickApprove(p.id, p.member_id)}
                                                     className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary-dark shadow-md shadow-primary/20 transition-all"
                                                 >
                                                     Approve
                                                 </button>
                                             </>
                                         )}
                                         <button className="p-2 text-slate-300 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                                             <MoreVertical size={16} />
                                         </button>
                                     </td>
                                 </tr>
                             ))}
                         </tbody>
                     </table>
                 </div>
             </div>

             {selectedPayment && (
                <ProofModal 
                    payment={selectedPayment} 
                    onClose={() => {
                        setSelectedPayment(null);
                        // Refresh status locally if it was approved in modal
                        // This is a bit tricky since modal handles its own actions,
                        // but revalidatePath will handle the server side.
                        // For instant UI update, we could pass a callback.
                    }} 
                />
             )}
         </div>
     );
 }
