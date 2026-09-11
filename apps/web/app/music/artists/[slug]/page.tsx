import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck, Play } from 'lucide-react';
import { albumsStore, artistsStore, tracksStore } from '@indimba/mock-data';

export function generateMetadata({ params }: { params: { slug: string } }) {
  const artist = artistsStore.get(params.slug, 'slug');
  if (!artist) return {};
  return { title: artist.stageName, description: artist.bio };
}

export default function ArtistPage({ params }: { params: { slug: string } }) {
  const artist = artistsStore.get(params.slug, 'slug');
  if (!artist) notFound();

  const tracks = tracksStore
    .list((t) => t.artistSlug === params.slug)
    .sort((a, b) => b.zambiaStreamsWeekly - a.zambiaStreamsWeekly);
  const albums = albumsStore.list((a) => a.artistSlug === params.slug);

  return (
    <div>
      <div className="relative h-64 md:h-80">
        <Image src={artist.coverUrl} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-surface-900/40 to-transparent" />
      </div>
      <div className="max-w-5xl mx-auto px-4 lg:px-6 -mt-16 relative">
        <div className="flex items-end gap-5 mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-900 shrink-0">
            <Image src={artist.avatarUrl} alt={artist.stageName} width={128} height={128} className="object-cover w-full h-full" />
          </div>
          <div className="pb-2">
            <div className="flex items-center gap-2">
              <h1 className="font-display text-3xl md:text-4xl tracking-wide text-white">{artist.stageName}</h1>
              {artist.isVerified && <BadgeCheck className="w-6 h-6 text-purple-400" />}
            </div>
            <p className="text-surface-300 text-sm mt-1">
              {artist.hometown} · {artist.genres.join(', ')} · {artist.monthlyListeners.toLocaleString()} monthly listeners
            </p>
          </div>
        </div>

        <p className="text-surface-300 text-sm max-w-2xl mb-10">{artist.bio}</p>

        {tracks.length > 0 && (
          <section className="mb-10">
            <h2 className="font-extrabold text-xl text-white mb-4">Popular Tracks</h2>
            <div className="bg-surface-800 rounded-2xl border border-white/5 divide-y divide-white/5">
              {tracks.map((t, i) => (
                <Link
                  key={t.id}
                  href={`/music/tracks/${t.slug}`}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-white/5 transition-colors"
                >
                  <span className="text-surface-400 text-sm w-5 text-right">{i + 1}</span>
                  <Image src={t.coverUrl} alt="" width={44} height={44} className="rounded-md object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{t.title}</p>
                    <p className="text-surface-400 text-xs">{t.zambiaStreamsWeekly.toLocaleString()} streams this week</p>
                  </div>
                  <Play className="w-4 h-4 text-surface-400" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {albums.length > 0 && (
          <section className="mb-10">
            <h2 className="font-extrabold text-xl text-white mb-4">Albums</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {albums.map((al) => (
                <Link key={al.id} href={`/music/albums/${al.slug}`} className="group">
                  <div className="aspect-square rounded-xl overflow-hidden mb-2">
                    <Image
                      src={al.coverUrl}
                      alt={al.title}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <p className="text-white text-sm font-semibold truncate">{al.title}</p>
                  <p className="text-surface-400 text-xs">{new Date(al.releaseDate).getFullYear()}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
