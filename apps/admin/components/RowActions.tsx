'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { api } from '@/lib/api';

export interface ToggleConfig {
  field: string;
  currentValue: string | boolean;
  values: [string | boolean, string | boolean];
  labels: [string, string];
}

export function RowActions({ endpoint, toggle, onDeleted }: { endpoint: string; toggle?: ToggleConfig; onDeleted?: () => void }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleToggle() {
    if (!toggle) return;
    setBusy(true);
    try {
      const next = toggle.currentValue === toggle.values[0] ? toggle.values[1] : toggle.values[0];
      await api.patch(endpoint, { [toggle.field]: next });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm('Delete this item?')) return;
    setBusy(true);
    try {
      await api.del(endpoint);
      onDeleted?.();
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  const toggleLabel = toggle ? (toggle.currentValue === toggle.values[0] ? toggle.labels[0] : toggle.labels[1]) : null;

  return (
    <div className="flex items-center gap-2">
      {toggle && (
        <button onClick={handleToggle} disabled={busy} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/5 text-surface-200 hover:bg-white/10 disabled:opacity-50">
          {toggleLabel}
        </button>
      )}
      <button onClick={remove} disabled={busy} className="p-1.5 rounded-md text-surface-400 hover:text-indimba-red-400 hover:bg-white/5 disabled:opacity-50">
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
