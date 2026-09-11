import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MatchCard } from '@indimba/ui/MatchCard';
import { matchesStore, teamsStore, getStandings } from '@indimba/mock-data';

export function generateMetadata({ params }: { params: { slug: string } }) {
  const team = teamsStore.get(params.slug, 'slug');
  if (!team) return {};
  return { title: team.name };
}

export default function TeamPage({ params }: { params: { slug: string } }) {
  const team = teamsStore.get(params.slug, 'slug');
  if (!team) notFound();

  const matches = matchesStore
    .list((m) => m.homeTeam.slug === params.slug || m.awayTeam.slug === params.slug)
    .sort((a, b) => new Date(b.kickoffAt).getTime() - new Date(a.kickoffAt).getTime());
  const standing = getStandings().find((r) => r.team.slug === params.slug);

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-8">
      <div className="flex items-center gap-5 mb-8">
        <Image src={team.crestUrl} alt="" width={80} height={80} className="rounded-full" />
        <div>
          <h1 className="font-display text-3xl md:text-4xl tracking-wide text-white">{team.name}</h1>
          <p className="text-surface-300 text-sm mt-1">
            {team.city} · Est. {team.founded} · {team.stadium}
          </p>
        </div>
      </div>

      {standing && (
        <div className="grid grid-cols-4 gap-3 mb-10">
          <Stat label="Position" value={`#${standing.position}`} />
          <Stat label="Points" value={standing.points} />
          <Stat label="Played" value={standing.played} />
          <Stat label="Goal Diff" value={standing.goalsFor - standing.goalsAgainst} />
        </div>
      )}

      <section>
        <h2 className="font-extrabold text-xl text-white mb-4">Matches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((m) => (
            <MatchCard key={m.id} {...m} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-surface-800 rounded-xl border border-white/5 p-4 text-center">
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="text-xs text-surface-400 mt-1">{label}</p>
    </div>
  );
}
