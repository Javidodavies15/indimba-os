'use client';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, X } from 'lucide-react';
import { Button } from '@indimba/ui/Button';
import { api } from '@/lib/api';
import type { MatchStatus } from '@indimba/mock-data';

const STATUSES: MatchStatus[] = ['scheduled', 'live', 'halftime', 'finished', 'postponed', 'cancelled'];

export function EditMatchModal({
  matchId,
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  minute,
  status,
}: {
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  minute: number;
  status: MatchStatus;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ homeScore, awayScore, minute, status });

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await api.patch(`/sports/matches/${matchId}`, form);
      setOpen(false);
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="p-1.5 rounded-md text-surface-400 hover:text-white hover:bg-white/5" aria-label="Edit match">
        <Pencil className="w-3.5 h-3.5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-sm bg-surface-800 rounded-2xl p-6 border border-white/10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-white">
                {homeTeam} vs {awayTeam}
              </h3>
              <button onClick={() => setOpen(false)} className="text-surface-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-surface-300 mb-1.5">Home Score</label>
                  <input
                    type="number"
                    value={form.homeScore}
                    onChange={(e) => setForm((f) => ({ ...f, homeScore: Number(e.target.value) }))}
                    className="w-full bg-surface-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-surface-300 mb-1.5">Away Score</label>
                  <input
                    type="number"
                    value={form.awayScore}
                    onChange={(e) => setForm((f) => ({ ...f, awayScore: Number(e.target.value) }))}
                    className="w-full bg-surface-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-surface-300 mb-1.5">Minute</label>
                <input
                  type="number"
                  value={form.minute}
                  onChange={(e) => setForm((f) => ({ ...f, minute: Number(e.target.value) }))}
                  className="w-full bg-surface-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-surface-300 mb-1.5">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as MatchStatus }))}
                  className="w-full bg-surface-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <Button type="submit" variant="sports" className="w-full" disabled={busy}>
                {busy ? 'Saving...' : 'Update Match'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
