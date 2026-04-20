'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bell, 
  Shield, 
  Eye, 
  Lock, 
  Smartphone,
  ChevronRight,
  Mail,
  CheckCircle2
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [notifications, setNotifications] = useState({
    email_updates: true,
    event_reminders: true,
    payment_confirmations: true,
    newsletter: false
  });
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    async function getProfile() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error && error.message.includes('lock')) {
           console.warn('Supabase session lock contention caught gracefully.', error);
        }

        const user = session?.user;
        
        if (user) {
          const { data } = await supabase
            .from('members')
            .select('*')
            .eq('id', user.id)
            .single();
          setProfile(data);
          
          // In a real app, we would fetch notification preferences from a settings table
          // For now, we'll use local state
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    }
    getProfile();
  }, []);

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    alert('Settings saved successfully!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-10">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-dark">Account Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account preferences and security settings.</p>
      </div>

      <div className="grid gap-8">
        {/* Notifications Section */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50">
            <h2 className="text-lg font-bold text-dark flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </h2>
            <p className="text-sm text-gray-500 mt-1">Choose how you want to be notified about BUPEXSA updates.</p>
          </div>
          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-dark">Email Updates</p>
                <p className="text-sm text-gray-500">Receive important announcements via email.</p>
              </div>
              <button 
                onClick={() => handleToggle('email_updates')}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  notifications.email_updates ? "bg-primary" : "bg-gray-200"
                )}
              >
                <div className={cn(
                  "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform",
                  notifications.email_updates && "translate-x-6"
                )} />
              </button>
            </div>
            <div className="h-px bg-gray-50"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-dark">Event Reminders</p>
                <p className="text-sm text-gray-500">Get notified 24 hours before events you've RSVPed to.</p>
              </div>
              <button 
                onClick={() => handleToggle('event_reminders')}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  notifications.event_reminders ? "bg-primary" : "bg-gray-200"
                )}
              >
                <div className={cn(
                  "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform",
                  notifications.event_reminders && "translate-x-6"
                )} />
              </button>
            </div>
            <div className="h-px bg-gray-50"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-dark">Payment Confirmations</p>
                <p className="text-sm text-gray-500">Receive digital receipts for your dues and donations.</p>
              </div>
              <button 
                onClick={() => handleToggle('payment_confirmations')}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  notifications.payment_confirmations ? "bg-primary" : "bg-gray-200"
                )}
              >
                <div className={cn(
                  "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform",
                  notifications.payment_confirmations && "translate-x-6"
                )} />
              </button>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50">
            <h2 className="text-lg font-bold text-dark flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Security
            </h2>
            <p className="text-sm text-gray-500 mt-1">Keep your account secure with these settings.</p>
          </div>
          <div className="p-8 space-y-6">
            <Link href="/dashboard/profile" className="flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-purple-50 text-primary flex items-center justify-center">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-dark">Password</p>
                  <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-primary transition-colors" />
            </Link>
            <div className="h-px bg-gray-50"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-blue-50 text-accent flex items-center justify-center">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-dark">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
                </div>
              </div>
              <button className="text-sm font-bold text-primary hover:underline">Enable</button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-primary text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
          >
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
