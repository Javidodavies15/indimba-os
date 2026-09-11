'use client';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X } from 'lucide-react';
import { Button } from '@indimba/ui/Button';
import { api } from '@/lib/api';

export interface FieldDef {
  name: string;
  label: string;
  type?: 'text' | 'textarea' | 'number' | 'select' | 'checkbox';
  options?: { value: string; label: string }[];
  required?: boolean;
  defaultValue?: string | number | boolean;
  placeholder?: string;
}

type FormValues = Record<string, string | number | boolean>;

export function CreateEntityModal({
  title,
  fields,
  endpoint,
  buttonLabel = 'Add New',
}: {
  title: string;
  fields: FieldDef[];
  endpoint: string;
  buttonLabel?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [values, setValues] = useState<FormValues>(() =>
    Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? (f.type === 'checkbox' ? false : '')])),
  );

  function setField(name: string, value: string | number | boolean) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await api.post(endpoint, values);
      setOpen(false);
      setValues(Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? (f.type === 'checkbox' ? false : '')])));
      router.refresh();
    } catch {
      setError('Failed to save. Check required fields.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Button variant="primary" size="sm" onClick={() => setOpen(true)}>
        <Plus className="w-4 h-4 mr-1.5" /> {buttonLabel}
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-lg bg-surface-800 rounded-2xl p-6 border border-white/10 max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-white">{title}</h3>
              <button onClick={() => setOpen(false)} className="text-surface-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={submit} className="space-y-4">
              {fields.map((f) => (
                <div key={f.name}>
                  <label className="block text-xs font-semibold text-surface-300 mb-1.5">{f.label}</label>
                  {f.type === 'textarea' ? (
                    <textarea
                      required={f.required}
                      value={String(values[f.name] ?? '')}
                      onChange={(e) => setField(f.name, e.target.value)}
                      placeholder={f.placeholder}
                      rows={3}
                      className="w-full bg-surface-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30"
                    />
                  ) : f.type === 'select' ? (
                    <select
                      required={f.required}
                      value={String(values[f.name] ?? '')}
                      onChange={(e) => setField(f.name, e.target.value)}
                      className="w-full bg-surface-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30"
                    >
                      {f.options?.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  ) : f.type === 'checkbox' ? (
                    <input
                      type="checkbox"
                      checked={!!values[f.name]}
                      onChange={(e) => setField(f.name, e.target.checked)}
                      className="w-4 h-4"
                    />
                  ) : (
                    <input
                      type={f.type === 'number' ? 'number' : 'text'}
                      required={f.required}
                      value={String(values[f.name] ?? '')}
                      onChange={(e) => setField(f.name, f.type === 'number' ? Number(e.target.value) : e.target.value)}
                      placeholder={f.placeholder}
                      className="w-full bg-surface-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30"
                    />
                  )}
                </div>
              ))}

              {error && <p className="text-xs text-indimba-red-400">{error}</p>}

              <Button type="submit" variant="primary" className="w-full" disabled={busy}>
                {busy ? 'Saving...' : 'Save'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
