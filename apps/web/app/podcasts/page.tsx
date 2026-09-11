import { PodcastCard } from '@indimba/ui/PodcastCard';
import { podcastsStore } from '@indimba/mock-data';

export const metadata = {
  title: 'Indimba Podcasts',
  description: 'Zambian podcasts on culture, sports, business and music.',
};

export default function PodcastsPage() {
  const podcasts = podcastsStore.list((p) => p.status === 'published');

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <div className="mb-10">
        <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#EA580C' }}>
          Indimba Podcasts
        </p>
        <h1 className="font-display text-4xl lg:text-5xl tracking-wide text-white">LISTEN UP</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {podcasts.map((p) => (
          <PodcastCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}
