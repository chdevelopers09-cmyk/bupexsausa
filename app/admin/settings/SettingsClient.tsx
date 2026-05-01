'use client';

import { useState } from 'react';
import { 
    Save, ShieldCheck, Mail, Globe, Palette, 
    CreditCard, CheckCircle2, AlertCircle, Trash2, 
    Plus, DollarSign, Info 
} from 'lucide-react';
import { updateSystemSettings } from './actions';

export default function AdminSettingsClient({ initialSettings }: { initialSettings: any[] }) {
    const [settings, setSettings] = useState<Record<string, any>>(
        initialSettings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {})
    );
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ type: '', text: '' });

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMsg({ type: '', text: '' });

        const res = await updateSystemSettings(settings);
        
        if (res.success) {
            setMsg({ type: 'success', text: 'All settings saved successfully.' });
            setTimeout(() => setMsg({ type: '', text: '' }), 3000);
        } else {
            setMsg({ type: 'error', text: res.error || 'Failed to save settings' });
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSave} className="space-y-10 animate-fade-in pb-20">
            {msg.text && (
                <div className={`fixed top-24 right-8 z-[60] px-6 py-4 rounded-2xl flex items-center gap-3 shadow-2xl animate-scale-in border ${
                    msg.type === 'success' ? 'bg-white text-emerald-600 border-emerald-100' : 'bg-white text-rose-600 border-rose-100'
                }`}>
                    {msg.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                    <span className="font-black pt-0.5">{msg.text}</span>
                </div>
            )}

            <div className="grid lg:grid-cols-2 gap-10">
                {/* Brand & Identity */}
                <div className="space-y-8">
                    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8 pb-10">
                        <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
                            <Palette className="h-6 w-6 text-primary" /> Brand & Identity
                        </h3>
                        <div className="space-y-8">
                            <div>
                                <label className="label-field !text-slate-500">Site Name</label>
                                <input 
                                    type="text" 
                                    value={settings.site_name || ''} 
                                    onChange={e => setSettings({...settings, site_name: e.target.value})}
                                    className="input-field font-black text-lg h-14" 
                                    placeholder="e.g. BUPEXSA USA"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <label className="label-field !text-slate-500">Primary Color</label>
                                    <div className="flex gap-4">
                                        <input 
                                            type="color" 
                                            value={settings.color_primary || '#6B21A8'} 
                                            onChange={e => setSettings({...settings, color_primary: e.target.value})}
                                            className="h-14 w-14 rounded-2xl border-2 border-slate-100 cursor-pointer overflow-hidden p-0 bg-white" 
                                        />
                                        <input 
                                            type="text" 
                                            value={settings.color_primary || '#6B21A8'} 
                                            onChange={e => setSettings({...settings, color_primary: e.target.value})}
                                            className="input-field text-sm font-mono flex-1 uppercase font-bold" 
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="label-field !text-slate-500">Accent Color</label>
                                    <div className="flex gap-4">
                                        <input 
                                            type="color" 
                                            value={settings.color_accent || '#0EA5E9'} 
                                            onChange={e => setSettings({...settings, color_accent: e.target.value})}
                                            className="h-14 w-14 rounded-2xl border-2 border-slate-100 cursor-pointer overflow-hidden p-0 bg-white" 
                                        />
                                        <input 
                                            type="text" 
                                            value={settings.color_accent || '#0EA5E9'} 
                                            onChange={e => setSettings({...settings, color_accent: e.target.value})}
                                            className="input-field text-sm font-mono flex-1 uppercase font-bold" 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="label-field !text-slate-500">Slogan / Tagline</label>
                                <input 
                                    type="text" 
                                    value={settings.site_slogan || ''} 
                                    onChange={e => setSettings({...settings, site_slogan: e.target.value})}
                                    className="input-field font-bold" 
                                    placeholder="Enter site slogan..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact & Social */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8 pb-10">
                        <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
                            <Mail className="h-6 w-6 text-primary" /> Contact & Channels
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <label className="label-field !text-slate-500">Official Support Email</label>
                                <input 
                                    type="email" 
                                    value={settings.support_email || ''} 
                                    onChange={e => setSettings({...settings, support_email: e.target.value})}
                                    className="input-field" 
                                />
                            </div>
                            <div>
                                <label className="label-field !text-slate-500">Phone Contact</label>
                                <input 
                                    type="text" 
                                    value={settings.support_phone || ''} 
                                    onChange={e => setSettings({...settings, support_phone: e.target.value})}
                                    className="input-field" 
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="label-field !text-slate-500">Facebook URL</label>
                                    <input type="text" className="input-field" placeholder="https://..." />
                                </div>
                                <div>
                                    <label className="label-field !text-slate-500">Instagram Handle</label>
                                    <input type="text" className="input-field" placeholder="@bupexsausa" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Membership & Financials */}
                <div className="space-y-8">
                    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8 pb-10">
                        <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
                            <CreditCard className="h-6 w-6 text-primary" /> Membership Config
                        </h3>
                        <div className="space-y-6">
                            <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100 flex items-start gap-4 mb-8">
                                <Info className="h-5 w-5 text-blue-500 mt-1" />
                                <p className="text-xs text-blue-700 leading-relaxed font-medium">
                                    Updating the annual fee will apply to all new registrations and future renewals. Current active memberships will not be affected until they expire.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <label className="label-field !text-slate-500">Annual Member Fee (USD)</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 flex justify-center border-r border-slate-100 pr-2">
                                            <DollarSign className="h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                                        </div>
                                        <input 
                                            type="number" 
                                            value={settings.membership_fee || 100} 
                                            onChange={e => setSettings({...settings, membership_fee: parseFloat(e.target.value)})}
                                            className="input-field font-black text-lg" 
                                            style={{ paddingLeft: '4rem' }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="label-field !text-slate-500">Grace Period (Days)</label>
                                    <div className="relative group">
                                        <input 
                                            type="number" 
                                            value={settings.membership_grace_period || 30} 
                                            onChange={e => setSettings({...settings, membership_grace_period: parseInt(e.target.value)})}
                                            className="input-field font-bold" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8 pb-10">
                        <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
                            <ShieldCheck className="h-6 w-6 text-primary" /> Payment Handles (Manual)
                        </h3>
                        <p className="text-xs text-slate-400 mb-6 font-medium italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                            These handles are displayed to users choosing Zelle or CashApp during registration.
                        </p>
                        <div className="space-y-8">
                            <div>
                                <label className="label-field !text-slate-500">Zelle Recipient Info</label>
                                <input 
                                    type="text" 
                                    value={settings.zelle_handle || ''} 
                                    onChange={e => setSettings({...settings, zelle_handle: e.target.value})}
                                    className="input-field font-mono font-bold text-primary bg-purple-50/30 border-purple-100" 
                                    placeholder="email@example.com or phone number"
                                />
                            </div>
                            <div>
                                <label className="label-field !text-slate-500">CashApp Handle</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 flex justify-center border-r border-slate-100 pr-2">
                                        <span className="font-black text-slate-400 group-focus-within:text-primary transition-colors">$</span>
                                    </div>
                                    <input 
                                        type="text" 
                                        value={settings.cashapp_handle || ''} 
                                        onChange={e => setSettings({...settings, cashapp_handle: e.target.value})}
                                        className="input-field font-mono font-bold text-primary bg-purple-50/30 border-purple-100" 
                                        style={{ paddingLeft: '4rem' }}
                                        placeholder="your-cashtag"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sticky bottom-10 left-0 right-0 z-40">
                <div className="max-w-4xl mx-auto bg-[#0F172A] p-4 rounded-3xl shadow-2xl flex items-center justify-between">
                    <div className="px-6 flex items-center gap-3">
                        <div className="h-10 w-10 bg-slate-800 rounded-xl flex items-center justify-center">
                            <ShieldCheck className="text-emerald-400 animate-pulse" />
                        </div>
                        <p className="text-slate-400 text-xs font-bold leading-tight uppercase tracking-widest hidden sm:block">Configuration Mode</p>
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="btn-primary py-3 px-10 rounded-2xl shadow-xl shadow-primary/30"
                    >
                        {loading ? 'Processing...' : <><Save size={18} /> Update System Settings</>}
                    </button>
                </div>
            </div>
        </form>
    );
}
