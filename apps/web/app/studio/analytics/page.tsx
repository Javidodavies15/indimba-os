import { tracksStore } from '@indimba/mock-data';

const ARTIST_SLUG = 'flex-musonda';

export default function StudioAnalyticsPage() {
  const tracks = [...tracksStore.list((t) => t.artistSlug === ARTIST_SLUG)].sort(
    (a, b) => b.zambiaStreamsWeekly - a.zambiaStreamsWeekly,
  );
  const maxWeekly = Math.max(1, ...tracks.map((t) => t.zambiaStreamsWeekly));

  return (
    <div>
      <h2 className="font-extrabold text-xl text-white mb-6">Analytics</h2>
      <div className="bg-surface-800 rounded-xl border border-white/5 p-5">
        <p className="text-xs text-surface-400 uppercase tracking-wide mb-4">Streams this week, by track</p>
        <div className="space-y-3">
          {tracks.map((t) => (
            <div key={t.id}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-white font-semibold">{t.title}</span>
                <span className="text-surface-400">{t.zambiaStreamsWeekly.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(t.zambiaStreamsWeekly / maxWeekly) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
