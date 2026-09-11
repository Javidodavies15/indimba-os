import { api } from '@/lib/api';
import type { Article, ChartEntry } from '@indimba/mock-data';

export default async function AnalyticsPage() {
  const [{ entries }, { articles }] = await Promise.all([
    api.get<{ entries: ChartEntry[]; weekLabel: string }>('/music/charts?limit=10'),
    api.get<{ articles: Article[] }>('/articles?status=all&limit=200'),
  ]);

  const byPlatform = articles.reduce<Record<string, number>>((acc, a) => {
    acc[a.platform] = (acc[a.platform] ?? 0) + 1;
    return acc;
  }, {});
  const maxPlatformCount = Math.max(1, ...Object.values(byPlatform));
  const maxStreams = Math.max(1, ...entries.map((e) => e.track.totalStreams));

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide text-white mb-6">ANALYTICS</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-surface-800 rounded-xl border border-white/5 p-5">
          <p className="text-xs text-surface-400 uppercase tracking-wide mb-4">Articles by Platform</p>
          <div className="space-y-3">
            {Object.entries(byPlatform).map(([platform, count]) => (
              <div key={platform}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-white font-semibold capitalize">{platform}</span>
                  <span className="text-surface-400">{count}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-indimba-red-500 rounded-full" style={{ width: `${(count / maxPlatformCount) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-surface-800 rounded-xl border border-white/5 p-5">
          <p className="text-xs text-surface-400 uppercase tracking-wide mb-4">Top Tracks by Total Streams</p>
          <div className="space-y-3">
            {entries.map((e) => (
              <div key={e.track.id}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-white font-semibold">{e.track.title}</span>
                  <span className="text-surface-400">{e.track.totalStreams.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(e.track.totalStreams / maxStreams) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
