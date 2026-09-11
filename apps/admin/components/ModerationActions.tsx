'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { api } from '@/lib/api';

export function ModerationActions({ commentId }: { commentId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function decide(moderationStatus: 'approved' | 'rejected') {
    setBusy(true);
    try {
      await api.patch(`/comments/${commentId}`, { moderationStatus });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => decide('approved')} disabled={busy} className="p-1.5 rounded-md bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 disabled:opacity-50">
        <Check className="w-3.5 h-3.5" />
      </button>
      <button onClick={() => decide('rejected')} disabled={busy} className="p-1.5 rounded-md bg-indimba-red-500/15 text-indimba-red-400 hover:bg-indimba-red-500/25 disabled:opacity-50">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
