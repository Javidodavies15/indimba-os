import { Mic2 } from 'lucide-react';
import { episodesStore, podcastsStore } from '@indimba/mock-data';

export default function StudioPodcastsPage() {
  const podcast = podcastsStore.list()[0];
  const episodes = podcast ? episodesStore.list((e) => e.podcastId === podcast.id) : [];

  return (
    <div>
      <h2 className="font-extrabold text-xl text-white mb-6">Podcast Studio</h2>
      {!podcast || episodes.length === 0 ? (
        <div className="bg-surface-800 rounded-xl border border-white/5 p-8 text-center">
          <Mic2 className="w-10 h-10 text-surface-500 mx-auto mb-3" />
          <p className="text-surface-300 text-sm">No episodes yet.</p>
        </div>
      ) : (
        <div className="bg-surface-800 rounded-xl border border-white/5 divide-y divide-white/5">
          {episodes.map((e) => (
            <div key={e.id} className="flex items-center justify-between px-4 py-3">
              <div className="min-w-0">
                <p className="text-white text-sm font-semibold truncate">{e.title}</p>
                <p className="text-surface-400 text-xs mt-0.5">{Math.round(e.duration / 60)} min</p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 ml-3">
                {e.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
