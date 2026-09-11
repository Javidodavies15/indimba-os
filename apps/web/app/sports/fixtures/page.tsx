import { MatchCard } from '@indimba/ui/MatchCard';
import { matchesStore } from '@indimba/mock-data';

export const metadata = {
  title: 'Fixtures & Results',
  description: 'Zambia Super League fixtures, live scores and results.',
};

export default function FixturesPage() {
  const matches = [...matchesStore.list()].sort((a, b) => new Date(a.kickoffAt).getTime() - new Date(b.kickoffAt).getTime());
  const live = matches.filter((m) => m.status === 'live' || m.status === 'halftime');
  const scheduled = matches.filter((m) => m.status === 'scheduled');
  const finished = [...matches.filter((m) => m.status === 'finished')].reverse();

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-8">
      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-2">Zambia Super League</p>
        <h1 className="font-display text-4xl lg:text-5xl tracking-wide text-white">FIXTURES</h1>
      </div>

      {live.length > 0 && (
        <section className="mb-10">
          <h2 className="font-extrabold text-xl text-white mb-4">Live Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {live.map((m) => (
              <MatchCard key={m.id} {...m} />
            ))}
          </div>
        </section>
      )}

      {scheduled.length > 0 && (
        <section className="mb-10">
          <h2 className="font-extrabold text-xl text-white mb-4">Upcoming</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scheduled.map((m) => (
              <MatchCard key={m.id} {...m} />
            ))}
          </div>
        </section>
      )}

      {finished.length > 0 && (
        <section>
          <h2 className="font-extrabold text-xl text-white mb-4">Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {finished.map((m) => (
              <MatchCard key={m.id} {...m} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
