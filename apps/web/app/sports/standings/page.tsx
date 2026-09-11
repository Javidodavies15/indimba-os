import { StandingsTable } from '@indimba/ui/StandingsTable';
import { getStandings } from '@indimba/mock-data';

export const metadata = {
  title: 'League Standings',
  description: 'Zambia Super League table.',
};

export default function StandingsPage() {
  const rows = getStandings();

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-8">
      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-2">Zambia Super League</p>
        <h1 className="font-display text-4xl lg:text-5xl tracking-wide text-white">STANDINGS</h1>
      </div>
      <StandingsTable rows={rows} />
    </div>
  );
}
