import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { albumsStore, tracksStore } from '@indimba/mock-data';

export function generateMetadata({ params }: { params: { slug: string } }) {
  const album = albumsStore.get(params.slug, 'slug');
  if (!album) return {};
  return { title: `${album.title} — ${album.artistName}`, description: album.description };
}

export default function AlbumPage({ params }: { params: { slug: string } }) {
  const album = albumsStore.get(params.slug, 'slug');
  if (!album) notFound();

  const tracks = tracksStore.list((t) => t.albumId === album.id);

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-8">
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <div className="w-full md:w-56 aspect-square rounded-xl overflow-hidden shrink-0">
          <Image src={album.coverUrl} alt={album.title} width={400} height={400} className="object-cover w-full h-full" />
        </div>
        <div className="flex flex-col justify-end">
          <p className="text-xs font-bold tracking-widest text-purple-400 uppercase mb-2">Album</p>
          <h1 className="font-display text-4xl tracking-wide text-white mb-2">{album.title}</h1>
          <Link href={`/music/artists/${album.artistSlug}`} className="text-white font-semibold hover:text-purple-300">
            {album.artistName}
          </Link>
          <p className="text-surface-400 text-sm mt-1">
            {new Date(album.releaseDate).getFullYear()} · {tracks.length} tracks
          </p>
          <p className="text-surface-300 text-sm mt-4 max-w-lg">{album.description}</p>
        </div>
      </div>

      <div className="bg-surface-800 rounded-2xl border border-white/5 divide-y divide-white/5">
        {tracks.map((t, i) => (
          <Link key={t.id} href={`/music/tracks/${t.slug}`} className="flex items-center gap-4 px-4 py-3 hover:bg-white/5 transition-colors">
            <span className="text-surface-400 text-sm w-5 text-right">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">{t.title}</p>
              <p className="text-surface-400 text-xs">
                {Math.floor(t.duration / 60)}:{String(t.duration % 60).padStart(2, '0')}
              </p>
            </div>
            <Play className="w-4 h-4 text-surface-400" />
          </Link>
        ))}
      </div>
    </div>
  );
}
