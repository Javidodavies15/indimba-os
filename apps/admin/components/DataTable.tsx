import type { ReactNode } from 'react';

export interface DataTableColumn<T> {
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

export function DataTable<T extends { id?: string }>({
  columns,
  rows,
  rowKey,
  emptyMessage = 'Nothing here yet.',
}: {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  emptyMessage?: string;
}) {
  if (rows.length === 0) {
    return <div className="bg-surface-800 rounded-xl border border-white/5 p-10 text-center text-surface-400 text-sm">{emptyMessage}</div>;
  }

  return (
    <div className="bg-surface-800 rounded-xl border border-white/5 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-surface-400 text-xs uppercase border-b border-white/5">
            {columns.map((c) => (
              <th key={c.header} className="text-left font-semibold px-4 py-3 whitespace-nowrap">
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)} className="border-b border-white/5 last:border-0 hover:bg-white/5">
              {columns.map((c) => (
                <td key={c.header} className={`px-4 py-3 ${c.className ?? ''}`}>
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StatusBadge({ status, tone = 'neutral' }: { status: string; tone?: 'neutral' | 'success' | 'warning' | 'danger' }) {
  const toneClasses: Record<string, string> = {
    neutral: 'bg-white/5 text-surface-300',
    success: 'bg-emerald-500/20 text-emerald-400',
    warning: 'bg-indimba-gold-500/20 text-indimba-gold-400',
    danger: 'bg-indimba-red-500/20 text-indimba-red-400',
  };
  return <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full ${toneClasses[tone]}`}>{status}</span>;
}
