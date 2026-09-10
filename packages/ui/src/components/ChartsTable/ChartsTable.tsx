import Image from 'next/image';
import { TrendingUp, TrendingDown, Minus, Flame } from 'lucide-react';

interface ChartEntry {
  position: number;
  previousPosition: number | null;
  peakPosition: number;
  weeksOnChart: number;
  track: {
    id: string;
    title: string;
    slug: string;
    coverUrl: string;
    artistName: string;
    artistSlug: string;
    totalStreams: number;
    streamBreakdown: Record<string, number>;
  };
}

export function ChartsTable({ entries, weekLabel }: {
  entries: ChartEntry[];
  weekLabel: string;
}) {
  return (
    <div className="bg-surface-800 rounded-2xl border border-white/5 overflow-hidden">
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <div>
          <h2 className="font-black text-lg text-white">🇿🇲 Zambia Top 50</h2>
          <p className="text-xs text-surface-300 mt-0.5">{weekLabel}</p>
        </div>
        <div className="text-xs text-surface-300 text-right">
          <p>Powered by Spotify · YouTube</p>
          <p>Boomplay · Indimba</p>
        </div>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {entries.map(entry => (
          <ChartRow key={entry.track.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

const ChartRow = ({ entry }: { entry: ChartEntry }) => {
  const movement = entry.previousPosition 
    ? entry.previousPosition - entry.position 
    : null;
  const isNew = !entry.previousPosition;
  const isHot = entry.weeksOnChart <= 2 && entry.position <= 10;

  return (
    <div className="flex items-center gap-4 px-4 py-3 
                    hover:bg-white/[0.02] transition-colors group">
      <div className="w-10 text-center flex-shrink-0">
        <span className={`font-black text-lg
          ${entry.position <= 3 ? 'text-indimba-gold-500' : 'text-surface-200'}`}>
          {entry.position}
        </span>
      </div>
      <div className="w-6 flex-shrink-0 flex justify-center">
        {isNew ? (
          <span className="text-xs font-black text-green-400">NEW</span>
        ) : movement === null ? (
          <Minus className="w-3 h-3 text-surface-400" />
        ) : movement > 0 ? (
          <div className="flex flex-col items-center">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-xs text-green-400">{movement}</span>
          </div>
        ) : movement < 0 ? (
          <div className="flex flex-col items-center">
            <TrendingDown className="w-3 h-3 text-red-400" />
            <span className="text-xs text-red-400">{Math.abs(movement)}</span>
          </div>
        ) : (
          <Minus className="w-3 h-3 text-surface-400" />
        )}
      </div>
      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
        <Image src={entry.track.coverUrl} alt={entry.track.title} fill className="object-cover" />
        {entry.position <= 3 && (
          <div className="absolute inset-0 bg-indimba-gold-500/10 
                          border border-indimba-gold-500/30 rounded-lg" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-bold text-white truncate text-sm">{entry.track.title}</p>
          {isHot && <Flame className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />}
        </div>
        <a href={`/music/artists/${entry.track.artistSlug}`}
           className="text-xs text-surface-300 hover:text-purple-400 transition-colors">
          {entry.track.artistName}
        </a>
        <div className="flex gap-1.5 mt-1 flex-wrap">
          {Object.entries(entry.track.streamBreakdown)
            .filter(([, count]) => count > 0)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([platform, count]) => (
              <span key={platform}
                    className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-surface-300 font-mono">
                {platform}: {(count / 1000).toFixed(1)}K
              </span>
            ))}
        </div>
      </div>
      <div className="text-right flex-shrink-0 hidden md:block">
        <p className="text-sm font-bold text-white">{(entry.track.totalStreams / 1000).toFixed(1)}K</p>
        <p className="text-xs text-surface-300">{entry.weeksOnChart}w on chart</p>
        <p className="text-xs text-indimba-gold-500">Peak #{entry.peakPosition}</p>
      </div>
    </div>
  );
};
