import type { ReactNode } from 'react';

export interface StatTileProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  accent?: string;
}

export function StatTile({ label, value, icon, accent = '#C8102E' }: StatTileProps) {
  return (
    <div className="bg-surface-800 rounded-xl border border-white/5 p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-surface-400">{label}</p>
        {icon && (
          <span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accent}20`, color: accent }}>
            {icon}
          </span>
        )}
      </div>
      <p className="text-2xl font-black text-white">{value}</p>
    </div>
  );
}
