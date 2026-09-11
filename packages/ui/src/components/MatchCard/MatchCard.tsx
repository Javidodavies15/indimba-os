import Link from 'next/link';
import Image from 'next/image';

export interface MatchCardTeam {
  name: string;
  shortName: string;
  crestUrl: string;
}

export interface MatchCardProps {
  id: string;
  homeTeam: MatchCardTeam;
  awayTeam: MatchCardTeam;
  homeScore: number;
  awayScore: number;
  minute: number;
  status: 'scheduled' | 'live' | 'halftime' | 'finished' | 'postponed' | 'cancelled';
  kickoffAt: string;
  venue?: string;
  leagueName?: string;
}

export function MatchCard({ id, homeTeam, awayTeam, homeScore, awayScore, minute, status, kickoffAt, venue, leagueName }: MatchCardProps) {
  const isLive = status === 'live' || status === 'halftime';
  const isFinished = status === 'finished';

  return (
    <Link
      href={`/sports/matches/${id}`}
      className="block bg-surface-800 rounded-xl border border-white/5 hover:border-white/10 transition-colors p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-surface-400 font-medium">{leagueName ?? 'Zambia Super League'}</span>
        {isLive ? (
          <span className="flex items-center gap-1 text-xs font-bold text-indimba-red-400">
            <span className="w-1.5 h-1.5 bg-indimba-red-500 rounded-full animate-pulse" />
            {status === 'halftime' ? 'HT' : `${minute}'`}
          </span>
        ) : (
          <span className="text-xs text-surface-400">
            {isFinished ? 'FT' : new Date(kickoffAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Image src={homeTeam.crestUrl} alt="" width={24} height={24} className="rounded-full shrink-0" />
            <span className="text-white text-sm font-semibold truncate">{homeTeam.shortName}</span>
          </div>
          <span className="text-white font-bold text-sm tabular-nums">{isLive || isFinished ? homeScore : ''}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Image src={awayTeam.crestUrl} alt="" width={24} height={24} className="rounded-full shrink-0" />
            <span className="text-white text-sm font-semibold truncate">{awayTeam.shortName}</span>
          </div>
          <span className="text-white font-bold text-sm tabular-nums">{isLive || isFinished ? awayScore : ''}</span>
        </div>
      </div>

      {venue && <p className="text-[11px] text-surface-500 mt-3 truncate">{venue}</p>}
    </Link>
  );
}
