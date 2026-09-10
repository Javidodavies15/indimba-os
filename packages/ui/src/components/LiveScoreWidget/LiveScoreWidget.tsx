'use client';
import { useEffect, useState } from 'react';
import { useSocket } from '@indimba/auth/hooks';

interface LiveMatch {
  id: string;
  homeTeam: { name: string; shortName: string; crestUrl: string };
  awayTeam: { name: string; shortName: string; crestUrl: string };
  homeScore: number;
  awayScore: number;
  minute: number;
  status: 'live' | 'halftime' | 'finished';
  league: string;
}

export function LiveScoreWidget() {
  const [matches, setMatches] = useState<LiveMatch[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [goalFlash, setGoalFlash] = useState<string | null>(null);
  const socket = useSocket();

  useEffect(() => {
    fetch('/api/v1/sports/fixtures?status=live')
      .then(r => r.json())
      .then(data => setMatches(data.matches));

    socket?.on('score:update', (update: LiveMatch) => {
      setMatches(prev => prev.map(m => m.id === update.id ? update : m));
    });

    socket?.on('score:goal', (event) => {
      setGoalFlash(event.matchId);
      setTimeout(() => setGoalFlash(null), 3000);
    });

    const interval = setInterval(() => {
      setActiveIndex(i => (i + 1) % matches.length);
    }, 8000);

    return () => {
      clearInterval(interval);
      socket?.off('score:update');
      socket?.off('score:goal');
    };
  }, [socket, matches.length]);

  if (matches.length === 0) return null;
  const match = matches[activeIndex];

  return (
    <>
      <button
        onClick={() => setIsExpanded(true)}
        className="flex items-center gap-2 px-3 py-1.5 
                   bg-blue-950/60 border border-blue-500/20
                   rounded-lg hover:border-blue-500/40 transition-colors
                   group relative"
        aria-label="View live scores"
      >
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-red-400 tracking-wider">
            LIVE
          </span>
        </span>
        <div className={`flex items-center gap-2 text-sm font-black
                         transition-colors duration-300
                         ${goalFlash === match.id ? 'text-indimba-gold-400' : 'text-white'}`}>
          <span className="text-xs text-surface-300">{match.homeTeam.shortName}</span>
          <span>{match.homeScore}</span>
          <span className="text-surface-400">–</span>
          <span>{match.awayScore}</span>
          <span className="text-xs text-surface-300">{match.awayTeam.shortName}</span>
        </div>
        <span className="text-xs text-surface-300">
          {match.status === 'halftime' ? 'HT' : `${match.minute}'`}
        </span>
        {matches.length > 1 && (
          <span className="text-xs text-surface-400 hidden md:inline">
            +{matches.length - 1} more
          </span>
        )}
      </button>

      {isExpanded && (
        <div className="fixed inset-0 z-50 flex items-start justify-center
                        pt-16 px-4 bg-black/80 backdrop-blur-sm"
             onClick={() => setIsExpanded(false)}>
          <div className="w-full max-w-md bg-surface-800 rounded-2xl
                          border border-white/10 overflow-hidden shadow-xl"
               onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-white/5 flex items-center
                            justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="font-bold text-sm">Live Scores</span>
              </div>
              <button onClick={() => setIsExpanded(false)}
                      className="text-surface-300 hover:text-white text-xl">×</button>
            </div>
            <div className="divide-y divide-white/5 max-h-96 overflow-y-auto">
              {matches.map(m => (
                <a key={m.id} href={`/sports/matches/${m.id}`}
                   className="flex items-center gap-4 p-4 hover:bg-white/3 
                              transition-colors group">
                  <div className="flex-1">
                    <p className="text-xs text-surface-300 mb-2">{m.league}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{m.homeTeam.name}</span>
                      <div className="flex items-center gap-3 mx-4">
                        <span className="text-lg font-black text-white">{m.homeScore}</span>
                        <span className="text-xs text-surface-300 font-mono">
                          {m.status === 'halftime' ? 'HT' : `${m.minute}'`}
                        </span>
                        <span className="text-lg font-black text-white">{m.awayScore}</span>
                      </div>
                      <span className="text-sm font-bold text-white">{m.awayTeam.name}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div className="p-3 border-t border-white/5 text-center">
              <a href="/sports" className="text-xs text-blue-400 hover:text-blue-300 font-semibold">
                View all fixtures →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
