import { notFound } from 'next/navigation';
import { PodcastPlayer } from '@indimba/ui/PodcastPlayer';
import { episodesStore } from '@indimba/mock-data';

export function generateMetadata({ params }: { params: { episodeSlug: string } }) {
  const episode = episodesStore.get(params.episodeSlug, 'slug');
  if (!episode) return {};
  return { title: episode.title, description: episode.description };
}

export default function EpisodePage({ params }: { params: { podcastSlug: string; episodeSlug: string } }) {
  const episode = episodesStore.get(params.episodeSlug, 'slug');
  if (!episode || episode.podcastSlug !== params.podcastSlug) notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 lg:px-6 py-8">
      <p className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: '#EA580C' }}>
        {episode.podcastTitle}
      </p>
      <h1 className="font-display text-3xl tracking-wide text-white mb-6">{episode.title}</h1>

      <PodcastPlayer
        episode={{
          id: episode.id,
          title: episode.title,
          podcastTitle: episode.podcastTitle,
          coverUrl: episode.coverUrl,
          audioUrl: episode.audioUrl,
          duration: episode.duration,
          chapters: episode.chapters,
          description: episode.description,
        }}
      />

      <div className="mt-8 text-surface-300 text-sm leading-relaxed">
        <p>{episode.description}</p>
      </div>
    </div>
  );
}
