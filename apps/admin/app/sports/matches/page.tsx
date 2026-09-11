import { DataTable, StatusBadge } from '@/components/DataTable';
import { RowActions } from '@/components/RowActions';
import { EditMatchModal } from '@/components/EditMatchModal';
import { api } from '@/lib/api';
import type { FootballMatch } from '@indimba/mock-data';

const STATUS_TONE: Record<string, 'success' | 'warning' | 'neutral' | 'danger'> = {
  live: 'danger',
  halftime: 'warning',
  scheduled: 'neutral',
  finished: 'success',
  postponed: 'warning',
  cancelled: 'danger',
};

export default async function SportsMatchesPage() {
  const { items: matches } = await api.get<{ items: FootballMatch[] }>('/sports/matches');

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide text-white mb-6">MATCHES</h1>
      <p className="text-surface-400 text-xs mb-4">
        Edit a match&apos;s score or status here and it updates live on the public site&apos;s live scores widget.
      </p>
      <DataTable<FootballMatch>
        rows={matches}
        rowKey={(m) => m.id}
        columns={[
          {
            header: 'Match',
            render: (m) => (
              <span className="text-white font-semibold">
                {m.homeTeam.name} vs {m.awayTeam.name}
              </span>
            ),
          },
          { header: 'Score', render: (m) => <span className="text-surface-300 tabular-nums">{`${m.homeScore} - ${m.awayScore}`}</span> },
          { header: 'Minute', render: (m) => <span className="text-surface-300">{m.minute}&apos;</span> },
          { header: 'Status', render: (m) => <StatusBadge status={m.status} tone={STATUS_TONE[m.status] ?? 'neutral'} /> },
          {
            header: '',
            render: (m) => (
              <div className="flex items-center gap-1">
                <EditMatchModal
                  matchId={m.id}
                  homeTeam={m.homeTeam.name}
                  awayTeam={m.awayTeam.name}
                  homeScore={m.homeScore}
                  awayScore={m.awayScore}
                  minute={m.minute}
                  status={m.status}
                />
                <RowActions endpoint={`/sports/matches/${m.id}`} />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
