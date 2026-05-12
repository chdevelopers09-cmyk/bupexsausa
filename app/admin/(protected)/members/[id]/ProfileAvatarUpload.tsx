'use client';

import { useState, useRef, useTransition } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import { uploadAvatar } from '../actions';

export default function ProfileAvatarUpload({ 
  memberId, 
  currentAvatar, 
  fallback 
}: { 
  memberId: string;
  currentAvatar: string | null;
  fallback: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [optimisticAvatar, setOptimisticAvatar] = useState<string | null>(currentAvatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      setOptimisticAvatar(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('avatar', file);

    startTransition(async () => {
      const result = await uploadAvatar(memberId, formData);
      if (result?.error) {
        alert('Failed to upload avatar: ' + result.error);
        setOptimisticAvatar(currentAvatar); // Revert on failure
      } else if (result?.avatarUrl) {
        setOptimisticAvatar(result.avatarUrl);
      }
    });
  };

  return (
    <div className="relative group cursor-pointer h-24 w-24 shrink-0" onClick={() => fileInputRef.current?.click()}>
      <div className="h-full w-full rounded-full bg-slate-100 overflow-hidden flex items-center justify-center text-slate-400 font-bold text-xl border-4 border-white shadow-xl relative z-10 transition-transform group-hover:scale-105">
        {optimisticAvatar ? (
          <img src={optimisticAvatar} alt="avatar" className="h-full w-full object-cover" />
        ) : (
          fallback
        )}
      </div>
      
      {/* Overlay on hover */}
      <div className="absolute inset-0 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
        {isPending ? <Loader2 className="h-6 w-6 animate-spin" /> : <Camera className="h-6 w-6" />}
      </div>

      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
      />
    </div>
  );
}
