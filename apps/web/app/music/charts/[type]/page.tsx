import { notFound } from 'next/navigation';
import { ChartsTable } from '@indimba/ui/ChartsTable';
import { tracksStore, fixtures } from '@indimba/mock-data';

export default function ChartsByTypePage({ params }: { params: { type: string } }) {
  const label = decodeURIComponent(params.type);
  const tracks = tracksStore
    .list((t) => t.genres.some((g) => g.toLowerCase() === label.toLowerCase()))
    .sort((a, b) => b.zambiaStreamsWeekly - a.zambiaStreamsWeekly);

  if (tracks.length === 0) notFound();

  const entries = tracks.map((t, i) => ({
    position: i + 1,
    previousPosition: i === 0 ? null : i,
    peakPosition: Math.max(1, i - 1),
    weeksOnChart: 4 + (i % 8),
    track: {
      id: t.id,
      title: t.title,
      slug: t.slug,
      coverUrl: t.coverUrl,
      artistName: t.artistName,
      artistSlug: t.artistSlug,
      totalStreams: t.zambiaStreamsTotal,
      streamBreakdown: {
        spotify: Math.round(t.zambiaStreamsTotal * 0.42),
        boomplay: Math.round(t.zambiaStreamsTotal * 0.33),
        youtube: Math.round(t.zambiaStreamsTotal * 0.25),
      },
    },
  }));

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-6 py-8">
      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest text-purple-400 uppercase mb-2">Genre Chart</p>
        <h1 className="font-display text-4xl lg:text-5xl tracking-wide text-white uppercase">{label}</h1>
      </div>
      <ChartsTable entries={entries} weekLabel={fixtures.chartWeekLabel} />
    </div>
  );
}
