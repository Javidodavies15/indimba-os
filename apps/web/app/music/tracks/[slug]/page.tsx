import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SmartPlayer } from '@indimba/ui/SmartPlayer';
import { tracksStore } from '@indimba/mock-data';

export function generateMetadata({ params }: { params: { slug: string } }) {
  const track = tracksStore.get(params.slug, 'slug');
  if (!track) return {};
  return { title: `${track.title} — ${track.artistName}`, description: `Stream ${track.title} by ${track.artistName} on Indimba.` };
}

export default function TrackPage({ params }: { params: { slug: string } }) {
  const track = tracksStore.get(params.slug, 'slug');
  if (!track) notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 lg:px-6 py-8">
      <p className="text-xs font-bold tracking-widest text-purple-400 uppercase mb-2">Track</p>
      <h1 className="font-display text-3xl md:text-4xl tracking-wide text-white mb-1">{track.title}</h1>
      <Link href={`/music/artists/${track.artistSlug}`} className="text-surface-300 hover:text-purple-300 font-semibold">
        {track.artistName}
      </Link>

      <div className="mt-8">
        <SmartPlayer
          track={{
            id: track.id,
            title: track.title,
            artistName: track.artistName,
            coverUrl: track.coverUrl,
            duration: track.duration,
            source: 'metadata_only',
            streamingLinks: track.streamingLinks,
          }}
        />
      </div>

      <dl className="grid grid-cols-2 gap-4 mt-10 text-sm">
        <div>
          <dt className="text-surface-400">Zambia streams (total)</dt>
          <dd className="text-white font-semibold">{track.zambiaStreamsTotal.toLocaleString()}</dd>
        </div>
        <div>
          <dt className="text-surface-400">This week</dt>
          <dd className="text-white font-semibold">{track.zambiaStreamsWeekly.toLocaleString()}</dd>
        </div>
        <div>
          <dt className="text-surface-400">Genres</dt>
          <dd className="text-white font-semibold">{track.genres.join(', ')}</dd>
        </div>
        {track.albumTitle && (
          <div>
            <dt className="text-surface-400">Album</dt>
            <dd className="text-white font-semibold">{track.albumTitle}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
