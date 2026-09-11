import { notFound } from 'next/navigation';
import Image from 'next/image';
import { matchesStore } from '@indimba/mock-data';

const EVENT_ICON: Record<string, string> = {
  goal: '⚽',
  own_goal: '⚽ (OG)',
  yellow_card: '🟨',
  red_card: '🟥',
  substitution: '🔄',
  penalty: '⚽ (P)',
};

export function generateMetadata({ params }: { params: { id: string } }) {
  const match = matchesStore.get(params.id);
  if (!match) return {};
  return { title: `${match.homeTeam.name} vs ${match.awayTeam.name}` };
}

export default function MatchPage({ params }: { params: { id: string } }) {
  const match = matchesStore.get(params.id);
  if (!match) notFound();

  const isLive = match.status === 'live' || match.status === 'halftime';
  const timeline = [...match.events].sort((a, b) => a.minute - b.minute);

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-6 py-8">
      <p className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-4 text-center">{match.leagueName}</p>

      <div className="bg-surface-800 rounded-2xl border border-white/5 p-6 md:p-8 mb-8">
        <div className="grid grid-cols-3 items-center gap-4">
          <div className="flex flex-col items-center text-center gap-2">
            <Image src={match.homeTeam.crestUrl} alt="" width={56} height={56} className="rounded-full" />
            <span className="text-white font-bold text-sm">{match.homeTeam.name}</span>
          </div>
          <div className="text-center">
            {isLive && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-indimba-red-400 mb-2">
                <span className="w-1.5 h-1.5 bg-indimba-red-500 rounded-full animate-pulse" />
                {match.status === 'halftime' ? 'HALF-TIME' : `${match.minute}'`}
              </span>
            )}
            {match.status === 'finished' && <span className="block text-xs text-surface-400 mb-2">FULL-TIME</span>}
            {match.status === 'scheduled' && (
              <span className="block text-xs text-surface-400 mb-2">
                {new Date(match.kickoffAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
            <p className="text-4xl font-black text-white tabular-nums">
              {match.status === 'scheduled' ? '—' : `${match.homeScore} - ${match.awayScore}`}
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <Image src={match.awayTeam.crestUrl} alt="" width={56} height={56} className="rounded-full" />
            <span className="text-white font-bold text-sm">{match.awayTeam.name}</span>
          </div>
        </div>
        {match.venue && <p className="text-center text-xs text-surface-500 mt-6">{match.venue}</p>}
      </div>

      {timeline.length > 0 && (
        <section>
          <h2 className="font-extrabold text-xl text-white mb-4">Match Events</h2>
          <div className="bg-surface-800 rounded-2xl border border-white/5 divide-y divide-white/5">
            {timeline.map((e) => (
              <div key={e.id} className={`flex items-center gap-4 px-4 py-3 ${e.team === 'away' ? 'flex-row-reverse text-right' : ''}`}>
                <span className="text-surface-400 text-sm w-10 shrink-0 tabular-nums">{e.minute}&apos;</span>
                <span className="text-lg">{EVENT_ICON[e.type] ?? '•'}</span>
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold">{e.playerName}</p>
                  {e.detail && <p className="text-surface-400 text-xs">{e.detail}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
