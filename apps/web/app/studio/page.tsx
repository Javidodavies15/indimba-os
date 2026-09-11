import { tracksStore } from '@indimba/mock-data';

const ARTIST_SLUG = 'flex-musonda';

export default function StudioOverviewPage() {
  const tracks = tracksStore.list((t) => t.artistSlug === ARTIST_SLUG);
  const totalStreams = tracks.reduce((sum, t) => sum + t.zambiaStreamsTotal, 0);
  const weeklyStreams = tracks.reduce((sum, t) => sum + t.zambiaStreamsWeekly, 0);
  const earningsZmw = Math.round(totalStreams * 0.08);

  const stats = [
    { label: 'Total Streams', value: totalStreams.toLocaleString() },
    { label: 'Tracks', value: String(tracks.length) },
    { label: 'This Week', value: weeklyStreams.toLocaleString() },
    { label: 'Earnings (Est.)', value: `K${earningsZmw.toLocaleString()}` },
  ];

  return (
    <div>
      <h2 className="font-extrabold text-xl text-white mb-6">Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-surface-800 rounded-xl p-4 border border-white/5">
            <p className="text-xs text-surface-400 mb-1">{stat.label}</p>
            <p className="text-xl font-black text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <h2 className="font-extrabold text-xl text-white mb-4">Top Tracks</h2>
      <div className="bg-surface-800 rounded-xl border border-white/5 divide-y divide-white/5">
        {[...tracks]
          .sort((a, b) => b.zambiaStreamsWeekly - a.zambiaStreamsWeekly)
          .map((t) => (
            <div key={t.id} className="flex items-center justify-between px-4 py-3">
              <span className="text-white text-sm font-semibold">{t.title}</span>
              <span className="text-surface-400 text-xs">{t.zambiaStreamsWeekly.toLocaleString()} this week</span>
            </div>
          ))}
      </div>
    </div>
  );
}
