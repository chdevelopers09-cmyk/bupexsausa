'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Building, GraduationCap, Briefcase, Camera, Save, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function ProfileClient({ initialSession, initialProfile }: { initialSession: any, initialProfile: any }) {
  const [profile, setProfile] = useState(initialProfile || {
    full_name: '',
    email: '',
    phone: '',
    graduation_year: '',
    batch: '',
    us_state: '',
    profession: '',
    avatar_path: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingAvatar(true);
      setError('');
      if (!e.target.files || e.target.files.length === 0) return;
      
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${initialSession.user.id}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setProfile({ ...profile, avatar_path: publicUrl });

      // Save immediately to profile
      await supabase.from('members').update({ avatar_path: publicUrl }).eq('id', initialSession.user.id);
      
    } catch (error: any) {
      setError(error.message || 'Error uploading image');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error } = await supabase.from('members')
        .update({
          full_name: profile.full_name,
          phone: profile.phone,
          graduation_year: profile.graduation_year,
          batch: profile.batch,
          us_state: profile.us_state,
          profession: profile.profession,
        })
        .eq('id', initialSession.user.id);

      if (error) throw error;
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      router.refresh();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!initialProfile) {
    return <div className="p-8 text-center text-gray-500">Profile data not found. Please contact support.</div>;
  }

  return (
    <div className="max-w-4xl space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar Upload */}
          <div className="relative group">
            <div className="h-28 w-28 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-100 shrink-0">
              {profile.avatar_path ? (
                <img src={profile.avatar_path} alt={profile.full_name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-purple-50 text-primary">
                  <User size={40} />
                </div>
              )}
            </div>
            
            <label className="absolute bottom-0 right-0 h-10 w-10 bg-primary hover:bg-primary-dark text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-colors border-2 border-white">
              {uploadingAvatar ? <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" /> : <Camera size={18} />}
              <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" disabled={uploadingAvatar} />
            </label>
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black text-dark">{profile.full_name}</h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2">
              <span className={`px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest`}>
                {profile.status} MEMBER
              </span>
              {profile.membership_id && (
                <span className="text-gray-500 font-medium text-sm flex items-center gap-1">
                  ID: <span className="font-bold text-dark">{profile.membership_id}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-8">
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-2xl flex items-center gap-2 text-sm font-bold">
            <CheckCircle2 size={18} /> Profile updated successfully.
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm font-medium">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Identity */}
          <div className="space-y-6">
            <h3 className="text-lg font-black text-dark flex items-center gap-2 pb-2 border-b border-gray-50">
              <User className="h-5 w-5 text-gray-400" /> Personal Details
            </h3>
            
            <div>
              <label className="label-field">Full Name</label>
              <input 
                type="text" 
                value={profile.full_name} 
                onChange={e => setProfile({...profile, full_name: e.target.value})} 
                className="input-field" 
                required 
              />
            </div>
            
            <div>
              <label className="label-field">Email Address</label>
              <input 
                type="email" 
                value={profile.email} 
                className="input-field bg-gray-50 text-gray-500 cursor-not-allowed" 
                disabled 
              />
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed directly.</p>
            </div>

            <div>
              <label className="label-field">Phone Number</label>
              <input 
                type="tel" 
                value={profile.phone || ''} 
                onChange={e => setProfile({...profile, phone: e.target.value})} 
                className="input-field" 
              />
            </div>
            
            <div>
              <label className="label-field">US State</label>
              <input 
                type="text" 
                value={profile.us_state || ''} 
                onChange={e => setProfile({...profile, us_state: e.target.value})} 
                className="input-field" 
                required 
              />
            </div>
          </div>

          {/* Education / Career */}
          <div className="space-y-6">
            <h3 className="text-lg font-black text-dark flex items-center gap-2 pb-2 border-b border-gray-50">
              <GraduationCap className="h-5 w-5 text-gray-400" /> PCSS Buea & Career
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-field">Graduation Year</label>
                <input 
                  type="number" 
                  value={profile.graduation_year || ''} 
                  onChange={e => setProfile({...profile, graduation_year: e.target.value})} 
                  className="input-field" 
                  required 
                />
              </div>
              <div>
                <label className="label-field">Batch/Class Name</label>
                <input 
                  type="text" 
                  value={profile.batch || ''} 
                  onChange={e => setProfile({...profile, batch: e.target.value})} 
                  className="input-field" 
                  placeholder="e.g. 2010" 
                />
              </div>
            </div>

            <div>
              <label className="label-field">Profession</label>
              <input 
                type="text" 
                value={profile.profession || ''} 
                onChange={e => setProfile({...profile, profession: e.target.value})} 
                className="input-field" 
              />
            </div>
            
            <div>
              <label className="label-field">Chapter Affiliation</label>
              <input 
                type="text" 
                value={initialProfile.chapters?.name || 'Not Assigned'} 
                className="input-field bg-gray-50 text-gray-500 cursor-not-allowed" 
                disabled 
              />
              <p className="text-xs text-gray-400 mt-1">Contact admin to change chapter.</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <button type="submit" disabled={loading} className="btn-primary py-3 px-8 text-sm">
            {loading ? 'Saving...' : <><Save className="h-4 w-4 mr-2" /> Save Changes</>}
          </button>
        </div>
      </form>
    </div>
  );
}
