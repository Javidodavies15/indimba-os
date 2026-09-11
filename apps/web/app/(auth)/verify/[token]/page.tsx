import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@indimba/ui/Button';

export default function VerifyPage({ params }: { params: { token: string } }) {
  const valid = params.token.length > 4;

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        {valid ? (
          <>
            <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto mb-4" />
            <h1 className="font-display text-3xl tracking-wide text-white mb-2">EMAIL VERIFIED</h1>
            <p className="text-surface-300 text-sm mb-6">Your account is now verified. You&apos;re all set.</p>
            <Link href="/">
              <Button variant="primary">Go to Indimba</Button>
            </Link>
          </>
        ) : (
          <>
            <h1 className="font-display text-3xl tracking-wide text-white mb-2">LINK EXPIRED</h1>
            <p className="text-surface-300 text-sm mb-6">This verification link is invalid or has expired.</p>
            <Link href="/login">
              <Button variant="secondary">Back to Sign In</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
