import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { episodesStore, podcastsStore } from '@indimba/mock-data';

export function generateMetadata({ params }: { params: { podcastSlug: string } }) {
  const podcast = podcastsStore.get(params.podcastSlug, 'slug');
  if (!podcast) return {};
  return { title: podcast.title, description: podcast.description };
}

export default function PodcastPage({ params }: { params: { podcastSlug: string } }) {
  const podcast = podcastsStore.get(params.podcastSlug, 'slug');
  if (!podcast) notFound();

  const episodes = episodesStore
    .list((e) => e.podcastSlug === params.podcastSlug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-6 py-8">
      <div className="flex items-start gap-5 mb-10">
        <Image src={podcast.coverUrl} alt={podcast.title} width={120} height={120} className="rounded-2xl shrink-0" />
        <div>
          <p className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: '#EA580C' }}>
            {podcast.category}
          </p>
          <h1 className="font-display text-2xl md:text-3xl tracking-wide text-white mb-2">{podcast.title}</h1>
          <p className="text-surface-400 text-sm">Hosted by {podcast.hostName}</p>
          <p className="text-surface-300 text-sm mt-3 max-w-lg">{podcast.description}</p>
        </div>
      </div>

      <h2 className="font-extrabold text-xl text-white mb-4">Episodes</h2>
      <div className="bg-surface-800 rounded-2xl border border-white/5 divide-y divide-white/5">
        {episodes.map((e) => (
          <Link
            key={e.id}
            href={`/podcasts/${podcast.slug}/${e.slug}`}
            className="flex items-center gap-4 px-4 py-4 hover:bg-white/5 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
              <Play className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">{e.title}</p>
              <p className="text-surface-400 text-xs mt-0.5">
                {new Date(e.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} ·{' '}
                {Math.round(e.duration / 60)} min
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
