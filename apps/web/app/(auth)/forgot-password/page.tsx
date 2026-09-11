'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@indimba/ui/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl tracking-wide text-white">RESET PASSWORD</h1>
          <p className="text-surface-300 text-sm mt-2">We&apos;ll email you a link to reset your password.</p>
        </div>

        <div className="bg-surface-800 rounded-2xl border border-white/5 p-6">
          {sent ? (
            <p className="text-center text-sm text-surface-300">
              If an account exists for <span className="text-white font-semibold">{email}</span>, a reset link is on its way.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-surface-300 mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-900 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                />
              </div>
              <Button type="submit" variant="primary" className="w-full">
                Send Reset Link
              </Button>
            </form>
          )}
          <p className="text-center text-xs text-surface-400 mt-5">
            <Link href="/login" className="text-indimba-red-400 hover:text-indimba-red-300 font-semibold">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
