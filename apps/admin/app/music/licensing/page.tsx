import { DataTable, StatusBadge } from '@/components/DataTable';
import { api } from '@/lib/api';
import type { MusicTrack } from '@indimba/mock-data';

export default async function LicensingPage() {
  const { items: tracks } = await api.get<{ items: MusicTrack[] }>('/music/tracks?limit=200');

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide text-white mb-6">LICENSING & DISTRIBUTION</h1>
      <DataTable<MusicTrack>
        rows={tracks}
        rowKey={(t) => t.id}
        columns={[
          { header: 'Track', render: (t) => <span className="text-white font-semibold">{t.title}</span> },
          { header: 'Artist', render: (t) => <span className="text-surface-300">{t.artistName}</span> },
          { header: 'Spotify', render: (t) => <StatusBadge status={t.spotifyId ? 'linked' : 'missing'} tone={t.spotifyId ? 'success' : 'warning'} /> },
          { header: 'YouTube', render: (t) => <StatusBadge status={t.youtubeId ? 'linked' : 'missing'} tone={t.youtubeId ? 'success' : 'warning'} /> },
          { header: 'Explicit', render: (t) => <StatusBadge status={t.isExplicit ? 'explicit' : 'clean'} tone={t.isExplicit ? 'danger' : 'neutral'} /> },
        ]}
      />
    </div>
  );
}
