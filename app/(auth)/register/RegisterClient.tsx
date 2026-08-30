'use client';

import Link from 'next/link';
import { 
  UserPlus, ArrowLeft, Mail, Lock, User, Phone, GraduationCap, 
  MapPin, Briefcase, ChevronDown, ArrowRight, Eye, EyeOff,
  CheckCircle2, CreditCard, ShieldCheck, Check, Sparkles,
  DollarSign, Calendar, Info, Smartphone, X, ExternalLink, Image as ImageIcon
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';
import { US_STATES, GRADUATION_YEARS } from '@/lib/utils';
import { useState, useTransition } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { signup } from '../actions';

export default function RegisterClient({ settings = {} }: { settings?: any }) {
  const membershipFee = parseFloat(settings.membership_fee || SITE_CONFIG.fees.annual.toString());
  const registrationFee = SITE_CONFIG.fees.registration; // Use from config
  const totalDue = membershipFee + registrationFee;

  const gYears = GRADUATION_YEARS();
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get('error');
  const [isPending, startTransition] = useTransition();
  
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationResult, setRegistrationResult] = useState<any>(null);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [passwordFocused, setPasswordFocused] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    batch: '',
    graduation_year: '',
    us_state: '',
    phone: '',
    profession: '',
    how_did_you_hear: '',
    membership_plan: 'annual'
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'stripe' | 'paypal' | 'cashapp' | 'zelle' | 'applepay'>('card');
  const [proofFile, setProofFile] = useState<File | null>(null);
  
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    cardName: ''
  });

  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const validatePassword = (pwd: string) => {
    const errs: string[] = [];
    if (pwd.length < 8) errs.push('At least 8 characters');
    if (!/[A-Z]/.test(pwd)) errs.push('One uppercase letter');
    if (!/[a-z]/.test(pwd)) errs.push('One lowercase letter');
    if (!/[0-9]/.test(pwd)) errs.push('One number');
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) errs.push('One special character (!@#$%^&*)');
    return errs;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'password') {
      setPasswordErrors(validatePassword(value));
    }
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      const formatted = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
      setPaymentData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    if (name === 'expiry') {
      const formatted = value.replace(/\D/g, '').replace(/(.{2})/, '$1/').slice(0, 5);
      setPaymentData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    if (name === 'cvc') {
      const formatted = value.replace(/\D/g, '').slice(0, 4);
      setPaymentData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pwdErrs = validatePassword(formData.password);
    if (pwdErrs.length > 0) {
      setPasswordErrors(pwdErrs);
      setStep(1);
      return;
    }
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    startTransition(async () => {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });
      
      // Add payment info
      submitData.append('payment_method', paymentMethod);
      if (proofFile) {
        submitData.append('payment_proof', proofFile);
      }
      
      const result = await signup(submitData);
      
      if (result?.error) {
        setStep(1);
        router.push(`/register?error=${encodeURIComponent(result.error)}`);
      } else if (result?.success) {
        // Supabase signUp() already sends the verification email automatically.
        if (result.needsVerification) {
          setRegistrationResult({ ...result.member, needsVerification: true });
          setStep(3);
        } else {
          setRegistrationResult(result.member);
          setStep(3);
        }
      }
    });
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-xl shadow-slate-100 border border-slate-100 p-6 md:p-12 relative z-10 animate-fade-in">
      
      {/* Header/Logo Section */}
      <div className="mb-8">
        <p className="text-xs font-black text-amber-600 uppercase tracking-[0.15em] mb-1.5">Member Registration</p>
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-none">Join BUPEXSA USA</h2>
      </div>

        {/* Progress Tracker Section - Ultra Compact */}
        <div className="bg-white py-4 border-b border-slate-100 mb-8 -mx-6 md:-mx-12 px-6 md:px-12">
          <div className="flex items-center justify-between max-w-sm mx-auto">
            <div className="flex items-center gap-2">
              <div className={`h-7 w-7 rounded-full flex items-center justify-center font-black text-[10px] transition-all ${step >= 1 ? 'bg-[#8B5CF6] text-white shadow-sm' : 'bg-gray-100 text-gray-400'}`}>1</div>
              <span className={`text-[9px] font-black uppercase tracking-wider ${step >= 1 ? 'text-[#8B5CF6]' : 'text-gray-400'}`}>Personal</span>
            </div>
            <div className="h-[1px] flex-1 bg-gray-50 mx-3" />
            <div className="flex items-center gap-2">
              <div className={`h-7 w-7 rounded-full flex items-center justify-center font-black text-[10px] transition-all ${step >= 2 ? 'bg-[#8B5CF6] text-white shadow-sm' : 'bg-gray-100 text-gray-400'}`}>2</div>
              <span className={`text-[9px] font-black uppercase tracking-wider ${step >= 2 ? 'text-[#8B5CF6]' : 'text-gray-400'}`}>Payment</span>
            </div>
            <div className="h-[1px] flex-1 bg-gray-50 mx-3" />
            <div className="flex items-center gap-2">
              <div className={`h-7 w-7 rounded-full flex items-center justify-center font-black text-[10px] transition-all ${step >= 3 ? 'bg-[#8B5CF6] text-white shadow-sm' : 'bg-gray-100 text-gray-400'}`}>3</div>
              <span className={`text-[9px] font-black uppercase tracking-wider ${step >= 3 ? 'text-[#8B5CF6]' : 'text-gray-400'}`}>Welcome</span>
            </div>
          </div>
        </div>

        <div className="">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-[11px] font-bold rounded-xl flex items-center gap-2 animate-shake">
              <Info className="h-3.5 w-3.5" />
              {error}
            </div>
          )}

          <form onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()} className="space-y-5">
            
            {/* Step 1: Form Content */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-2 duration-300">
                {/* Account Credentials */}
                <div className="space-y-3">
                  <h2 className="text-[9px] font-black text-gray-300 uppercase tracking-widest ml-1">ACCOUNT CREDENTIALS</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-gray-500 ml-1">Full Legal Name <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-purple-300 z-10" />
                        <input name="full_name" type="text" value={formData.full_name} onChange={handleInputChange} className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none transition-all placeholder:text-gray-300 font-bold text-[13px]" placeholder="e.g. John Doe" required />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-gray-500 ml-1">Username <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-blue-300 z-10" />
                        <input name="username" type="text" value={formData.username} onChange={handleInputChange} className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none transition-all placeholder:text-gray-300 font-bold text-[13px]" placeholder="johndoe123" required />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-gray-500 ml-1">Email Address <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-300 z-10" />
                      <input name="email" type="email" value={formData.email} onChange={handleInputChange} className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none transition-all placeholder:text-gray-300 font-bold text-[13px]" placeholder="email@example.com" required />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-gray-500 ml-1">Password <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-orange-300 z-10" />
                        <input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleInputChange} onFocus={() => setPasswordFocused(true)} onBlur={() => setTimeout(() => setPasswordFocused(false), 200)} className="w-full pl-9 pr-9 py-2 rounded-lg bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none transition-all placeholder:text-gray-300 font-bold text-[13px]" placeholder="••••••••" required />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-gray-500 ml-1">Confirm Password <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-orange-300 z-10" />
                        <input name="confirm_password" type={showConfirmPassword ? "text" : "password"} value={formData.confirm_password} onChange={handleInputChange} className="w-full pl-9 pr-9 py-2 rounded-lg bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none transition-all placeholder:text-gray-300 font-bold text-[13px]" placeholder="••••••••" required />
                      </div>
                    </div>
                  </div>

                  {/* Password Strength Indicator - shows on focus */}
                  {passwordFocused && (
                    <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                      {passwordErrors.length > 0 ? (
                        <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 space-y-1.5">
                          <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Password Requirements</p>
                          {passwordErrors.map((err, i) => (
                            <p key={i} className="text-[11px] text-orange-600 font-bold flex items-center gap-1.5">
                              <X className="h-3 w-3" /> {err}
                            </p>
                          ))}
                        </div>
                      ) : formData.password ? (
                        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-center gap-2">
                          <Check className="h-4 w-4 text-emerald-500" />
                          <p className="text-[11px] text-emerald-600 font-black">Strong password!</p>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>

                {/* PCSS Identity */}
                <div className="space-y-3">
                  <h2 className="text-[9px] font-black text-gray-300 uppercase tracking-widest ml-1">PCSS BUEA IDENTITY</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-gray-500 ml-1">Batch / Class <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-indigo-300 z-10" />
                        <input name="batch" type="text" value={formData.batch} onChange={handleInputChange} className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none transition-all placeholder:text-gray-300 font-bold text-[13px]" placeholder="e.g. 1998" required />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-gray-500 ml-1">Graduation Year <span className="text-gray-300 font-medium">(optional)</span></label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-blue-200 z-10" />
                        <select name="graduation_year" value={formData.graduation_year} onChange={handleInputChange} className="w-full pl-9 pr-8 py-2 rounded-lg bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none appearance-none cursor-pointer font-bold text-[13px]">
                          <option value="">Select</option>
                          {gYears.map(year => <option key={year} value={year}>{year}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location & Reach */}
                <div className="space-y-3">
                  <h2 className="text-[9px] font-black text-gray-300 uppercase tracking-widest ml-1">LOCATION & REACH</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-gray-500 ml-1">US State <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-pink-300 z-10" />
                        <select name="us_state" value={formData.us_state} onChange={handleInputChange} className="w-full pl-9 pr-8 py-2 rounded-lg bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none appearance-none cursor-pointer font-bold text-[13px]" required>
                          <option value="">Select</option>
                          {US_STATES.map(state => <option key={state} value={state}>{state}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-gray-500 ml-1">Phone Number <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-emerald-300 z-10" />
                        <input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none transition-all placeholder:text-gray-300 font-bold text-[13px]" placeholder="+1 (404) 000-0000" required />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Details (Optional) */}
                <div className="space-y-3">
                  <h2 className="text-[9px] font-black text-gray-300 uppercase tracking-widest ml-1">PROFESSIONAL DETAILS</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-gray-500 ml-1">Profession <span className="text-gray-300 font-medium">(optional)</span></label>
                      <div className="relative">
                        <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-blue-300 z-10" />
                        <input name="profession" type="text" value={formData.profession} onChange={handleInputChange} className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none transition-all placeholder:text-gray-300 font-bold text-[13px]" placeholder="e.g. Engineer" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-gray-500 ml-1">How did you hear? <span className="text-gray-300 font-medium">(optional)</span></label>
                      <div className="relative">
                        <Info className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-300 z-10" />
                        <select name="how_did_you_hear" value={formData.how_did_you_hear} onChange={handleInputChange} className="w-full pl-9 pr-8 py-2 rounded-lg bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none appearance-none cursor-pointer font-bold text-[13px]">
                          <option value="">Select</option>
                          <option value="Social Media">Social Media</option>
                          <option value="Friend/Family">Friend/Family</option>
                          <option value="Email">Email</option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>


                <div className="pt-3 space-y-3">
                  <button 
                    type="button" 
                    onClick={() => { 
                      const requiredFields = ['full_name', 'username', 'email', 'password', 'confirm_password', 'batch', 'us_state', 'phone'];
                      const missing = requiredFields.filter(f => !formData[f as keyof typeof formData]);
                      
                      if (missing.length > 0) {
                        alert(`Please fill all required fields marked with *`);
                        return;
                      }
                      
                      if (passwordErrors.length > 0 && formData.password) { 
                        return; 
                      } 
                      
                      if (formData.password !== formData.confirm_password) {
                        alert("Passwords do not match!");
                        return;
                      }
                      
                      setStep(2); 
                    }} 
                    className={`w-full py-3.5 rounded-2xl text-white font-black text-sm transition-all group shadow-md ${formData.password && passwordErrors.length > 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#8B5CF6] hover:shadow-md shadow-purple-100'}`} 
                    disabled={formData.password.length > 0 && passwordErrors.length > 0}
                  >
                    Continue to Membership Fee <ArrowRight className="inline-block ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Membership & Payment */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                {/* Itemized Bill Section */}
                <div className="bg-purple-50/50 rounded-3xl p-5 border border-purple-100/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles className="h-16 w-16 text-[#8B5CF6]" />
                  </div>
                  <h2 className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] mb-4">Registration Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-bold text-sm">🎫 Registration Fee</span>
                      <div className="text-right">
                        <span className="text-dark font-black text-sm">${registrationFee.toFixed(2)}</span>
                        <span className="block text-[9px] text-gray-400 font-bold uppercase tracking-widest">One-time</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-bold text-sm">📅 Annual Member Fee</span>
                      <div className="text-right">
                        <span className="text-dark font-black text-sm">${membershipFee.toFixed(2)}</span>
                        <span className="block text-[9px] text-primary font-bold uppercase tracking-widest">Every 12 Months</span>
                      </div>
                    </div>
                    <div className="h-[1px] bg-purple-100 my-2" />
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-gray-400 font-black text-[9px] uppercase tracking-widest block mb-1">Total Due Today</span>
                        <span className="text-[#8B5CF6] font-black text-3xl tracking-tight leading-none">${totalDue.toFixed(2)}</span>
                      </div>
                      <div className="bg-[#8B5CF6] text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-1 shadow-lg shadow-purple-200">
                        Secure
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-3">
                  <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Payment Method</h2>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'card', label: 'Card', icon: <CreditCard className="h-4 w-4" /> },
                      { id: 'stripe', label: 'Stripe', icon: <ShieldCheck className="h-4 w-4" /> },
                      { id: 'paypal', label: 'PayPal', icon: <DollarSign className="h-4 w-4" /> },
                      { id: 'cashapp', label: 'Cash App', icon: <DollarSign className="h-4 w-4" /> },
                      { id: 'zelle', label: 'Zelle', icon: <Mail className="h-4 w-4" /> },
                      { id: 'applepay', label: 'Apple Pay', icon: <Smartphone className="h-4 w-4" /> },
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`flex flex-col items-center justify-center py-3 px-2 rounded-2xl border-2 transition-all gap-1.5 ${
                          paymentMethod === method.id 
                            ? 'border-[#8B5CF6] bg-purple-50/50 shadow-sm' 
                            : 'border-gray-50 bg-white hover:border-gray-100'
                        }`}
                      >
                        <div className={`${paymentMethod === method.id ? 'text-[#8B5CF6]' : 'text-gray-300'}`}>
                          {method.icon}
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-wider ${paymentMethod === method.id ? 'text-[#8B5CF6]' : 'text-gray-400'}`}>
                          {method.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Details Content */}
                <div className="bg-white rounded-2xl p-1 border border-gray-50">
                  {paymentMethod === 'card' && (
                    <div className="p-4 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-gray-500 ml-1">Cardholder Name</label>
                        <input name="cardName" type="text" value={paymentData.cardName} onChange={handlePaymentChange} className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none font-bold text-[13px]" placeholder="e.g. John Doe" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-gray-500 ml-1">Card Number</label>
                        <div className="relative">
                          <input name="cardNumber" type="text" value={paymentData.cardNumber} onChange={handlePaymentChange} className="w-full pl-4 pr-12 py-3 rounded-xl bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none font-mono text-[14px] font-black" placeholder="0000 0000 0000 0000" />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1 opacity-40">
                            <div className="h-4 w-6 bg-blue-600 rounded-sm" />
                            <div className="h-4 w-6 bg-red-500 rounded-sm" />
                            <div className="h-4 w-6 bg-orange-400 rounded-sm" />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black text-gray-500 ml-1">Expiry</label>
                          <input name="expiry" type="text" value={paymentData.expiry} onChange={handlePaymentChange} className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none font-black text-[13px]" placeholder="MM / YY" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black text-gray-500 ml-1">CVC</label>
                          <div className="relative">
                            <input name="cvc" type="text" value={paymentData.cvc} onChange={handlePaymentChange} className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none font-black text-[13px]" placeholder="123" />
                            <ShieldCheck className="absolute right-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-emerald-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {(paymentMethod === 'stripe') && (
                    <div className="p-6 text-center space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="h-16 w-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto">
                        <CreditCard className="h-8 w-8 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-black text-dark uppercase tracking-widest text-[10px] mb-1">Stripe Secure Checkout</h3>
                        <p className="text-gray-400 text-[11px] font-bold mb-3">You&apos;ll be redirected to Stripe&apos;s hosted checkout for secure payment.</p>
                        <a href={SITE_CONFIG.payments.stripe.checkoutUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-black text-xs hover:bg-indigo-700 transition-colors">
                          <ExternalLink className="h-3.5 w-3.5" /> Open Stripe Checkout
                        </a>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                        <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          <DollarSign className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Send Payment To</h3>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-dark font-black text-sm">{SITE_CONFIG.payments.paypal.email}</span>
                            <button 
                              type="button"
                              onClick={() => copyToClipboard(SITE_CONFIG.payments.paypal.email, 'paypal')}
                              className="text-[9px] font-black text-blue-600 bg-white px-2.5 py-1 rounded-lg border border-blue-200 hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95"
                            >
                              {copied === 'paypal' ? 'COPIED!' : 'COPY'}
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Quick Instructions</h4>
                          <ul className="space-y-3">
                            <li className="flex gap-3 text-[11px] font-bold text-gray-600">
                              <div className="h-5 w-5 bg-[#8B5CF6] text-white rounded-full flex items-center justify-center shrink-0 text-[10px]">1</div>
                              <span>Login to your PayPal account</span>
                            </li>
                            <li className="flex gap-3 text-[11px] font-bold text-gray-600">
                              <div className="h-5 w-5 bg-[#8B5CF6] text-white rounded-full flex items-center justify-center shrink-0 text-[10px]">2</div>
                              <span>Send <strong>${totalDue.toFixed(2)}</strong> to the email above</span>
                            </li>
                            <li className="flex gap-3 text-[11px] font-bold text-gray-600">
                              <div className="h-5 w-5 bg-[#8B5CF6] text-white rounded-full flex items-center justify-center shrink-0 text-[10px]">3</div>
                              <span>Upload the confirmation screenshot below</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Upload Receipt Screenshot</p>
                           <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50 hover:bg-gray-100/50 cursor-pointer transition-all">
                              {proofFile ? (
                                <div className="flex flex-col items-center gap-1 text-emerald-500">
                                  <CheckCircle2 className="h-8 w-8" />
                                  <span className="text-[11px] font-black">{proofFile.name}</span>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center gap-2 text-gray-400">
                                  <ImageIcon className="h-8 w-8 opacity-20" />
                                  <span className="text-[11px] font-bold tracking-tight">Tap to upload proof</span>
                                </div>
                              )}
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden"
                                onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                                required
                              />
                           </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'applepay' && (
                    <div className="p-10 text-center space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="h-20 w-20 bg-gray-900 text-white rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                        <Smartphone className="h-10 w-10" />
                      </div>
                      <div>
                        <h3 className="font-black text-dark uppercase tracking-[0.2em] text-[11px] mb-2">Apple Pay</h3>
                        <p className="text-gray-400 text-[12px] font-bold">Double-click side button to pay</p>
                        <p className="text-[#8B5CF6] font-black text-2xl mt-2">${totalDue.toFixed(2)}</p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'cashapp' && (
                    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      {/* Cash App Card with QR Code */}
                      <div className="bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl shadow-emerald-100">
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                          <DollarSign className="h-32 w-32" />
                        </div>
                        <div className="relative z-10 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-white text-emerald-600 flex items-center justify-center font-black text-sm shadow-sm">
                                $
                              </div>
                              <span className="text-xs font-black tracking-widest uppercase text-emerald-100">Cash App Payment</span>
                            </div>
                            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white">
                              Scan & Pay
                            </span>
                          </div>

                          {/* QR Code Scan Image Display */}
                          <div className="bg-white rounded-2xl p-4 shadow-lg flex flex-col items-center justify-center text-center">
                            <div className="relative group overflow-hidden rounded-xl bg-slate-50 p-2 border border-slate-100">
                              <img 
                                src="/images/payments/cashapp-payment-app.jpg" 
                                alt="Cash App QR Code - Frida Ngoe-Esoe ($Bupexsausa)" 
                                className="w-56 h-auto object-contain rounded-lg shadow-sm max-w-full hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="mt-3 text-slate-800">
                              <p className="font-black text-base leading-tight">Frida Ngoe-Esoe</p>
                              <p className="text-emerald-600 font-extrabold text-sm tracking-wide mt-0.5">$Bupexsausa</p>
                              <p className="text-[11px] font-bold text-slate-400 mt-1 flex items-center justify-center gap-1">
                                <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                                Scan QR code with Cash App or camera to pay
                              </p>
                            </div>
                          </div>

                          {/* Account & Copy Handle */}
                          <div className="flex items-center justify-between bg-black/15 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10">
                            <div>
                              <p className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest">Cashtag</p>
                              <p className="text-lg font-black tracking-tight text-white">{settings.cashapp_handle || '$Bupexsausa'}</p>
                            </div>
                            <button 
                              type="button"
                              onClick={() => copyToClipboard(settings.cashapp_handle || '$Bupexsausa', 'cashapp')}
                              className="bg-white text-emerald-700 hover:bg-emerald-50 font-black text-xs px-4 py-2 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                            >
                              {copied === 'cashapp' ? 'COPIED!' : 'COPY $TAG'}
                            </button>
                          </div>

                          <div className="flex justify-between items-center text-xs font-bold text-emerald-100 pt-1">
                            <span>Amount to Send:</span>
                            <span className="text-white text-base font-black">${totalDue.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Memo & Proof Upload */}
                      <div className="space-y-4">
                        <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-100/80 text-center">
                          <p className="text-[11px] font-bold text-emerald-800 leading-relaxed">
                            💡 Please include your <span className="font-black text-emerald-950">Full Name</span> ({formData.full_name || 'Your Name'}) in the Cash App note/memo.
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Upload Receipt / Confirmation Screen</p>
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-emerald-200 rounded-3xl bg-slate-50 hover:bg-emerald-50/30 cursor-pointer transition-all">
                            {proofFile ? (
                              <div className="flex flex-col items-center gap-1 text-emerald-600">
                                <CheckCircle2 className="h-8 w-8" />
                                <span className="text-[11px] font-black">{proofFile.name}</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-2 text-gray-400">
                                <ImageIcon className="h-8 w-8 opacity-30 text-emerald-500" />
                                <span className="text-[11px] font-bold tracking-tight text-gray-600">Tap to upload receipt screenshot</span>
                                <span className="text-[9px] font-medium text-gray-400">PNG, JPG, JPEG accepted</span>
                              </div>
                            )}
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden"
                              onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                              required
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'zelle' && (
                    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      {/* Zelle Card with QR Code */}
                      <div className="bg-gradient-to-br from-purple-700 via-[#8B5CF6] to-indigo-700 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl shadow-purple-200">
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                          <Mail className="h-32 w-32" />
                        </div>
                        <div className="relative z-10 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-white text-purple-700 flex items-center justify-center font-black text-sm shadow-sm">
                                Z
                              </div>
                              <span className="text-xs font-black tracking-widest uppercase text-purple-100">Zelle Instant Pay</span>
                            </div>
                            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white">
                              No Fees
                            </span>
                          </div>

                          {/* QR Code Scan Image Display */}
                          <div className="bg-white rounded-2xl p-4 shadow-lg flex flex-col items-center justify-center text-center">
                            <div className="relative group overflow-hidden rounded-xl bg-slate-50 p-2 border border-slate-100">
                              <img 
                                src="/images/payments/zelle-payment-app.jpg" 
                                alt="Zelle QR Code - BUEA PCSS EX-STUDENTS ASSOCIATION USA" 
                                className="w-56 h-auto object-contain rounded-lg shadow-sm max-w-full hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="mt-3 text-slate-800">
                              <p className="font-black text-sm leading-tight text-purple-950">BUEA PCSS EX-STUDENTS ASSOCIATION USA</p>
                              <p className="text-purple-600 font-extrabold text-xs tracking-wide mt-0.5 break-all">{settings.zelle_handle || SITE_CONFIG.payments.zelle.email}</p>
                              <p className="text-[11px] font-bold text-slate-400 mt-1 flex items-center justify-center gap-1">
                                <Sparkles className="h-3.5 w-3.5 text-purple-500" />
                                Scan QR code with Banking App or camera to pay
                              </p>
                            </div>
                          </div>

                          {/* Account & Copy Email */}
                          <div className="flex items-center justify-between bg-black/15 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10">
                            <div className="min-w-0 pr-2">
                              <p className="text-[10px] font-bold text-purple-100 uppercase tracking-widest">Zelle Email / Recipient</p>
                              <p className="text-sm font-black tracking-tight text-white truncate">{settings.zelle_handle || SITE_CONFIG.payments.zelle.email}</p>
                            </div>
                            <button 
                              type="button"
                              onClick={() => copyToClipboard(settings.zelle_handle || SITE_CONFIG.payments.zelle.email, 'zelle')}
                              className="bg-white text-purple-800 hover:bg-purple-50 font-black text-xs px-4 py-2 rounded-xl shadow-md transition-all active:scale-95 shrink-0 flex items-center gap-1.5"
                            >
                              {copied === 'zelle' ? 'COPIED!' : 'COPY EMAIL'}
                            </button>
                          </div>

                          <div className="flex justify-between items-center text-xs font-bold text-purple-100 pt-1">
                            <span>Amount to Send:</span>
                            <span className="text-white text-base font-black">${totalDue.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Memo & Proof Upload */}
                      <div className="space-y-4">
                        <div className="bg-purple-50/80 p-4 rounded-2xl border border-purple-100/80 text-center">
                          <p className="text-[11px] font-bold text-purple-800 leading-relaxed">
                            📌 Memo: <span className="font-black text-purple-950">Membership - {formData.full_name || 'Your Name'}</span>
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Upload Zelle Receipt / Confirmation</p>
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-purple-200 rounded-3xl bg-slate-50 hover:bg-purple-50/30 cursor-pointer transition-all">
                            {proofFile ? (
                              <div className="flex flex-col items-center gap-1 text-purple-600">
                                <CheckCircle2 className="h-8 w-8" />
                                <span className="text-[11px] font-black">{proofFile.name}</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-2 text-gray-400">
                                <ImageIcon className="h-8 w-8 opacity-30 text-purple-500" />
                                <span className="text-[11px] font-bold tracking-tight text-gray-600">Tap to upload receipt screenshot</span>
                                <span className="text-[9px] font-medium text-gray-400">PNG, JPG, JPEG accepted</span>
                              </div>
                            )}
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden"
                              onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                              required
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 rounded-2xl bg-gray-50 text-gray-400 font-black text-[11px] uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                    <ArrowLeft className="h-3 w-3" /> Back
                  </button>
                  <button type="submit" disabled={isPending} className="flex-[2] py-4 rounded-2xl bg-[#8B5CF6] text-white font-black text-sm shadow-xl shadow-purple-200 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative z-10">
                      {isPending ? 'PROCESSING...' : (paymentMethod === 'card' ? 'COMPLETE PAYMENT' : 'I HAVE SENT PAYMENT')}
                    </span>
                  </button>
                </div>
                
                <div className="flex items-center justify-center gap-4 opacity-30 grayscale pt-2">
                   <div className="h-4 w-8 bg-blue-600 rounded-sm" />
                   <div className="h-4 w-8 bg-red-500 rounded-sm" />
                   <div className="h-4 w-8 bg-blue-400 rounded-sm" />
                   <div className="h-4 w-8 bg-orange-400 rounded-sm" />
                </div>
              </div>
            )}

            {/* Step 3: Success Welcome / Verification */}
            {step === 3 && (
              <div className="text-center space-y-6 animate-in zoom-in duration-500 py-6">
                <div className={`h-16 w-16 ${registrationResult?.needsVerification ? 'bg-blue-500' : 'bg-green-500'} text-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg`}>
                  {registrationResult?.needsVerification ? <Mail className="h-8 w-8" /> : <Check className="h-8 w-8" />}
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-dark tracking-tight">
                    {registrationResult?.needsVerification ? 'Check Your Email' : 'Success!'}
                  </h2>
                  <p className="text-gray-400 text-[13px] font-medium px-8">
                    {registrationResult?.needsVerification 
                      ? `We've sent a verification link to ${registrationResult?.email}. Please confirm your email to activate your account.`
                      : 'Welcome to the BUPEXSA Family. Your account is now active.'}
                  </p>
                </div>

                {!registrationResult?.needsVerification && (
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-50 space-y-2 text-left max-w-xs mx-auto">
                     <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-black text-[9px] uppercase tracking-widest">ID</span>
                      <span className="font-mono font-black text-md text-[#8B5CF6]">{registrationResult?.id || 'BUP-000000'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-black text-[9px] uppercase tracking-widest">Status</span>
                      <span className="text-green-600 font-black text-[9px] uppercase tracking-widest">Active</span>
                    </div>
                  </div>
                )}

                {registrationResult?.needsVerification ? (
                  <div className="space-y-4 pt-4">
                    <button 
                      onClick={() => window.location.href = '/login'}
                      className="inline-flex items-center justify-center w-full max-w-xs py-3.5 rounded-2xl bg-dark text-white font-black text-md hover:bg-primary transition-all group"
                    >
                      Return to Login
                    </button>
                    <p className="text-[11px] text-gray-400">
                      Didn&apos;t receive the email? Check your spam folder or <button className="text-primary font-bold hover:underline">click here to resend</button>.
                    </p>
                  </div>
                ) : (
                  <Link href="/dashboard" className="inline-flex items-center justify-center w-full max-w-xs py-3.5 rounded-2xl bg-dark text-white font-black text-md hover:bg-primary transition-all group">
                    Enter Dashboard <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            )}

          </form>
        </div>
    </div>
  );
}
