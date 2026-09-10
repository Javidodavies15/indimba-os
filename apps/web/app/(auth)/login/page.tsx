'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from '@indimba/auth/context';
import { Button } from '@indimba/ui/Button';
import { Smartphone, Mail, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useSession();
  const [mode, setMode] = useState<'password' | 'otp'>('password');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await login({ email, password });
      router.push('/');
    } catch {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestOtp = async () => {
    if (!phone) return;
    setLoading(true);
    try {
      await fetch('/api/v1/auth/otp/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      setOtpSent(true);
    } catch {
      setError('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl tracking-wide text-white">WELCOME BACK</h1>
          <p className="text-surface-300 text-sm mt-2">Sign in to your Indimba account</p>
        </div>

        <div className="bg-surface-800 rounded-2xl border border-white/5 p-6">
          {/* Toggle */}
          <div className="flex bg-surface-700 rounded-lg p-1 mb-6">
            <button onClick={() => setMode('password')}
                    className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors
                                ${mode === 'password' ? 'bg-surface-600 text-white' : 'text-surface-300'}`}>
              <Mail className="w-4 h-4 inline mr-1" /> Password
            </button>
            <button onClick={() => setMode('otp')}
                    className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors
                                ${mode === 'otp' ? 'bg-surface-600 text-white' : 'text-surface-300'}`}>
              <Smartphone className="w-4 h-4 inline mr-1" /> Phone OTP
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
              {error}
            </div>
          )}

          {mode === 'password' ? (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-surface-300 mb-1.5 block">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                       className="w-full px-3 py-2.5 bg-surface-700 border border-white/10 rounded-lg
                                  text-sm text-white placeholder:text-surface-400 outline-none
                                  focus:border-indimba-red-500 transition-colors"
                       placeholder="you@example.com" required />
              </div>
              <div>
                <label className="text-xs font-semibold text-surface-300 mb-1.5 block">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                       className="w-full px-3 py-2.5 bg-surface-700 border border-white/10 rounded-lg
                                  text-sm text-white placeholder:text-surface-400 outline-none
                                  focus:border-indimba-red-500 transition-colors"
                       placeholder="••••••••" required />
              </div>
              <Button type="submit" variant="primary" className="w-full" loading={loading}>
                Sign In
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              {!otpSent ? (
                <>
                  <div>
                    <label className="text-xs font-semibold text-surface-300 mb-1.5 block">Phone Number</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                           className="w-full px-3 py-2.5 bg-surface-700 border border-white/10 rounded-lg
                                      text-sm text-white placeholder:text-surface-400 outline-none
                                      focus:border-indimba-red-500 transition-colors"
                           placeholder="0977123456" required />
                  </div>
                  <Button onClick={handleRequestOtp} variant="primary" className="w-full" loading={loading}>
                    Send Code
                  </Button>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-xs font-semibold text-surface-300 mb-1.5 block">Enter Code</label>
                    <input type="text" value={otpCode} onChange={e => setOtpCode(e.target.value)}
                           className="w-full px-3 py-2.5 bg-surface-700 border border-white/10 rounded-lg
                                      text-sm text-white placeholder:text-surface-400 outline-none
                                      focus:border-indimba-red-500 transition-colors text-center tracking-[0.5em]"
                           placeholder="000000" maxLength={6} />
                  </div>
                  <Button onClick={() => {}} variant="primary" className="w-full" loading={loading}>
                    Verify & Sign In
                  </Button>
                  <button onClick={() => setOtpSent(false)}
                          className="w-full text-xs text-surface-300 hover:text-white transition-colors">
                    Use a different number
                  </button>
                </>
              )}
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-surface-400">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-indimba-red-400 hover:text-indimba-red-300 font-semibold">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
