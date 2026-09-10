'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@indimba/ui/Button';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', phone: '', password: '', displayName: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Registration failed');
      router.push('/');
    } catch {
      setError('Could not create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl tracking-wide text-white">JOIN INDIMBA</h1>
          <p className="text-surface-300 text-sm mt-2">Create your account</p>
        </div>

        <div className="bg-surface-800 rounded-2xl border border-white/5 p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-surface-300 mb-1.5 block">Display Name</label>
              <input value={form.displayName} onChange={e => setForm(f => ({ ...f, displayName: e.target.value }))}
                     className="w-full px-3 py-2.5 bg-surface-700 border border-white/10 rounded-lg text-sm text-white outline-none focus:border-indimba-red-500"
                     placeholder="Your name" required />
            </div>
            <div>
              <label className="text-xs font-semibold text-surface-300 mb-1.5 block">Email</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                     className="w-full px-3 py-2.5 bg-surface-700 border border-white/10 rounded-lg text-sm text-white outline-none focus:border-indimba-red-500"
                     placeholder="you@example.com" />
            </div>
            <div>
              <label className="text-xs font-semibold text-surface-300 mb-1.5 block">Phone (optional)</label>
              <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                     className="w-full px-3 py-2.5 bg-surface-700 border border-white/10 rounded-lg text-sm text-white outline-none focus:border-indimba-red-500"
                     placeholder="0977123456" />
            </div>
            <div>
              <label className="text-xs font-semibold text-surface-300 mb-1.5 block">Password</label>
              <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                     className="w-full px-3 py-2.5 bg-surface-700 border border-white/10 rounded-lg text-sm text-white outline-none focus:border-indimba-red-500"
                     placeholder="••••••••" required minLength={8} />
            </div>
            <Button type="submit" variant="primary" className="w-full" loading={loading}>
              Create Account
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-surface-400">
              Already have an account?{' '}
              <Link href="/login" className="text-indimba-red-400 hover:text-indimba-red-300 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
