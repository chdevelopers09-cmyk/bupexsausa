'use client'

import { useState } from 'react'
import { Bell, Send, Users, ShieldAlert, Info, History, Clock, CheckCircle2 } from 'lucide-react'
import { sendBulkNotification } from './actions'
import { cn } from '@/lib/utils'

export default function NotificationsClient({ recentNotifications }: { recentNotifications: any[] }) {
  const [isSending, setIsSending] = useState(false)
  const [activeTab, setActiveTab] = useState<'compose' | 'history'>('compose')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!confirm('Are you sure you want to send this notification to all targeted members?')) return
    
    setIsSending(true)
    const formData = new FormData(e.currentTarget)
    const res = await sendBulkNotification(formData)
    
    if (res.success) {
      alert(`Successfully sent to ${res.count} members!`)
      window.location.reload()
    } else {
      alert(res.error)
    }
    setIsSending(false)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Bulk Notifications</h1>
          <p className="text-sm text-slate-500 font-medium">Broadcast messages across the alumni network</p>
        </div>
        <div className="flex p-1 bg-slate-100 rounded-xl">
          <button 
            onClick={() => setActiveTab('compose')}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
              activeTab === 'compose' ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
            )}
          >
            Compose
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
              activeTab === 'history' ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
            )}
          >
            History
          </button>
        </div>
      </div>

      {activeTab === 'compose' ? (
        <div className="grid lg:grid-cols-3 gap-8 animate-fade-in">
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Notification Type</label>
                  <select name="type" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-purple-100 transition-all">
                    <option value="GENERAL">General Announcement</option>
                    <option value="URGENT">Urgent Alert</option>
                    <option value="EVENT">Event Update</option>
                    <option value="RENEWAL">Membership Renewal</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Target Audience</label>
                  <select name="target" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-purple-100 transition-all">
                    <option value="ALL">All Members</option>
                    <option value="ACTIVE">Active Members Only</option>
                    <option value="PENDING">Pending Registrations Only</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Message Title</label>
                <input 
                  name="title"
                  type="text" 
                  placeholder="Enter a compelling subject line..."
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Message Body</label>
                <textarea 
                  name="body"
                  rows={8}
                  placeholder="Compose your message here..."
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-purple-100 transition-all resize-none"
                />
              </div>

              <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
                <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-700 leading-relaxed">
                  <p className="font-bold mb-1 underline">Security Reminder</p>
                  <p>Sending a bulk notification will broadcast both an in-app dashboard alert and a transactional email to all selected members. This action cannot be undone.</p>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSending}
                className="w-full btn-primary py-5 rounded-2xl shadow-xl shadow-purple-100 flex items-center justify-center gap-3 group"
              >
                {isSending ? (
                  <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    <span className="text-lg">Broadcast Notification</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="space-y-6">
             <div className="bg-[#0F172A] rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                <div className="absolute -top-10 -right-10 h-40 w-40 bg-primary/20 rounded-full blur-3xl"></div>
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Quick Tips
                </h3>
                <ul className="space-y-4 text-sm text-slate-400">
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                    <span>Use clear, concise titles to improve open rates.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                    <span>Target "Active Members" for dues-related announcements.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                    <span>In-app alerts appear instantly on member dashboards.</span>
                  </li>
                </ul>
             </div>

             <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Live Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Reach</span>
                    <span className="text-lg font-black text-primary">542</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sent Today</span>
                    <span className="text-lg font-black text-emerald-500">2</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-fade-in">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Broadcast Details</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Recipient Type</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Sent Date</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentNotifications.map(n => (
                <tr key={n.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5">
                    <p className="font-bold text-slate-900 text-sm">{n.title}</p>
                    <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{n.body}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest">
                      <Users className="h-3 w-3" />
                      Individual Log
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-500 font-medium">
                    {new Date(n.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border",
                      n.type === 'URGENT' ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-blue-50 text-blue-600 border-blue-100"
                    )}>
                      {n.type}
                    </span>
                  </td>
                </tr>
              ))}
              {recentNotifications.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <History className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-400 font-bold">No broadcast history found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
