'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const validate = () => {
    if (password.length < 8) return 'Password must be at least 8 characters.';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter.';
    if (!/[0-9]/.test(password)) return 'Password must contain at least one number.';
    if (password !== confirmPassword) return 'Passwords do not match.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    setLoading(true);
    setError('');

    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess(true);
      setTimeout(() => router.push('/login'), 3000);
    }
    setLoading(false);
  };

  const strength = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-purple to-white flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
          <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-black text-dark">Password Updated!</h1>
          <p className="text-gray-500 leading-relaxed">Your password has been successfully changed. Redirecting you to login...</p>
          <Link href="/login" className="btn-primary inline-flex mx-auto">
            Continue to Login <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-purple to-white flex items-center justify-center p-6">
      <div className="max-w-md w-full animate-fade-in">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-purple">
              <span className="text-white font-black text-sm">BX</span>
            </div>
            <span className="font-black text-dark text-lg">BUPEXSA USA</span>
          </Link>
          <h1 className="text-3xl font-black text-dark mb-3">Set New Password</h1>
          <p className="text-gray-500">Choose a strong password for your account.</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-purple/10 p-10 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password */}
            <div>
              <label className="label-field flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" /> New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-field pr-12"
                  placeholder="Min. 8 characters"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Strength meter */}
              {password && (
                <div className="mt-3 space-y-2">
                  <div className="flex gap-1.5">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strength <= 1 ? 'bg-red-400' : strength === 2 ? 'bg-orange-400' : strength === 3 ? 'bg-yellow-400' : 'bg-green-500' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">
                    {strength <= 1 ? 'Weak' : strength === 2 ? 'Fair' : strength === 3 ? 'Good' : 'Strong'} password
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="label-field flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" /> Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className={`input-field ${confirmPassword && password !== confirmPassword ? 'border-red-300 focus:border-red-400' : confirmPassword && password === confirmPassword ? 'border-green-300 focus:border-green-400' : ''}`}
                placeholder="Re-enter your password"
                required
              />
              {confirmPassword && password === confirmPassword && (
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Passwords match
                </p>
              )}
            </div>

            {/* Requirements */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
              <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Requirements</p>
              {[
                { label: 'At least 8 characters', met: password.length >= 8 },
                { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
                { label: 'One number', met: /[0-9]/.test(password) },
              ].map(req => (
                <div key={req.label} className={`flex items-center gap-2 text-xs font-medium transition-colors ${req.met ? 'text-green-600' : 'text-gray-400'}`}>
                  <CheckCircle2 className={`h-3.5 w-3.5 transition-all ${req.met ? 'text-green-500' : 'text-gray-300'}`} />
                  {req.label}
                </div>
              ))}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-2xl">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base rounded-2xl" id="reset-password-submit">
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-gray-500">
          Remembered your password?{' '}
          <Link href="/login" className="text-primary font-bold hover:underline">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}
