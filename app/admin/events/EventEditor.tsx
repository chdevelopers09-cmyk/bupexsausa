'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveEvent, deleteEvent } from './actions';
import { Save, Trash2, ArrowLeft, Calendar, MapPin, Tag, Users, Globe } from 'lucide-react';
import Link from 'next/link';

export default function EventEditor({ event }: { event?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: event?.id || null,
    title: event?.title || '',
    slug: event?.slug || '',
    description: event?.description || '',
    start_datetime: event?.start_datetime ? new Date(event.start_datetime).toISOString().slice(0, 16) : '',
    end_datetime: event?.end_datetime ? new Date(event.end_datetime).toISOString().slice(0, 16) : '',
    location_name: event?.location_name || '',
    location_address: event?.location_address || '',
    category: event?.category || 'Gala',
    thumbnail_path: event?.thumbnail_path || '',
    max_attendees: event?.max_attendees || '',
    is_published: event?.is_published ?? false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await saveEvent(formData);
    setLoading(false);
    if (res.error) alert(res.error);
    else router.push('/admin/events');
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    setLoading(true);
    const res = await deleteEvent(event.id);
    setLoading(false);
    if (res.error) alert(res.error);
    else router.push('/admin/events');
  };

  return (
    <div className="max-w-4xl space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/events" className="p-2 bg-white rounded-xl border border-slate-200 text-slate-500 hover:text-primary transition-all">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-black text-slate-900">{event ? 'Edit Event' : 'Create New Event'}</h1>
        </div>
        {event && (
          <button onClick={handleDelete} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
            <Trash2 size={20} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
        {/* Main Info */}
        <div className="md:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Event Title</label>
            <input 
              required
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:border-primary/20 outline-none transition-all"
              placeholder="e.g. Annual Convention 2024"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Calendar size={14} /> Start Date & Time
              </label>
              <input 
                required
                type="datetime-local"
                name="start_datetime"
                value={formData.start_datetime}
                onChange={handleChange}
                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:border-primary/20 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Calendar size={14} /> End Date & Time
              </label>
              <input 
                type="datetime-local"
                name="end_datetime"
                value={formData.end_datetime}
                onChange={handleChange}
                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:border-primary/20 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Location & Details */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <MapPin size={14} /> Venue Name
            </label>
            <input 
              required
              name="location_name"
              value={formData.location_name}
              onChange={handleChange}
              className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:border-primary/20 outline-none transition-all"
              placeholder="e.g. Hilton Austin"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Address</label>
            <input 
              name="location_address"
              value={formData.location_address}
              onChange={handleChange}
              className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:border-primary/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Configuration */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Tag size={14} /> Category
              </label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:border-primary/20 outline-none transition-all appearance-none"
              >
                <option value="Gala">Gala</option>
                <option value="Meeting">Meeting</option>
                <option value="Fundraiser">Fundraiser</option>
                <option value="Social">Social</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Users size={14} /> Max Capacity
              </label>
              <input 
                type="number"
                name="max_attendees"
                value={formData.max_attendees}
                onChange={handleChange}
                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:border-primary/20 outline-none transition-all"
                placeholder="Unlimited"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
             <div>
                <p className="text-sm font-bold text-slate-900">Publish Event</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Visible to all members</p>
             </div>
             <input 
               type="checkbox"
               name="is_published"
               checked={formData.is_published}
               onChange={handleChange}
               className="h-6 w-6 rounded-md border-slate-200 text-primary focus:ring-primary"
             />
          </div>
        </div>

        <div className="md:col-span-2">
           <button 
             type="submit"
             disabled={loading}
             className="w-full py-5 bg-primary text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
           >
              {loading ? 'Saving Changes...' : <><Save size={22} /> Save Event Configuration</>}
           </button>
        </div>
      </form>
    </div>
  );
}
