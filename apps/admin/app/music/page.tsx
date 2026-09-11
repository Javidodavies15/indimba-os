import { DataTable } from '@/components/DataTable';
import { CreateEntityModal } from '@/components/CreateEntityModal';
import { RowActions } from '@/components/RowActions';
import { api } from '@/lib/api';
import type { MusicArtist, MusicTrack } from '@indimba/mock-data';

export default async function MusicPage() {
  const [{ items: tracks }, { items: artists }] = await Promise.all([
    api.get<{ items: MusicTrack[] }>('/music/tracks?limit=200'),
    api.get<{ items: MusicArtist[] }>('/music/artists?limit=200'),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl tracking-wide text-white">MUSIC</h1>
        <div className="flex gap-2">
          <CreateEntityModal
            title="New Artist"
            endpoint="/music/artists"
            buttonLabel="New Artist"
            fields={[
              { name: 'stageName', label: 'Stage Name', required: true },
              { name: 'slug', label: 'Slug', required: true },
              { name: 'hometown', label: 'Hometown' },
              { name: 'bio', label: 'Bio', type: 'textarea' },
            ]}
          />
          <CreateEntityModal
            title="New Track"
            endpoint="/music/tracks"
            buttonLabel="New Track"
            fields={[
              { name: 'title', label: 'Title', required: true },
              { name: 'slug', label: 'Slug', required: true },
              {
                name: 'artistSlug',
                label: 'Artist',
                type: 'select',
                required: true,
                options: artists.map((a) => ({ value: a.slug, label: a.stageName })),
              },
              { name: 'duration', label: 'Duration (seconds)', type: 'number', defaultValue: 180 },
              { name: 'zambiaStreamsWeekly', label: 'Weekly Streams', type: 'number', defaultValue: 0 },
              { name: 'zambiaStreamsTotal', label: 'Total Streams', type: 'number', defaultValue: 0 },
            ]}
          />
        </div>
      </div>

      <h2 className="font-bold text-white text-sm mb-3">Tracks</h2>
      <div className="mb-8">
        <DataTable<MusicTrack>
          rows={tracks}
          rowKey={(t) => t.id}
          columns={[
            { header: 'Title', render: (t) => <span className="text-white font-semibold">{t.title}</span> },
            { header: 'Artist', render: (t) => <span className="text-surface-300">{t.artistName}</span> },
            { header: 'Weekly Streams', render: (t) => t.zambiaStreamsWeekly.toLocaleString() },
            { header: 'Total Streams', render: (t) => t.zambiaStreamsTotal.toLocaleString() },
            { header: '', render: (t) => <RowActions endpoint={`/music/tracks/${t.slug}`} /> },
          ]}
        />
      </div>

      <h2 className="font-bold text-white text-sm mb-3">Artists</h2>
      <DataTable<MusicArtist>
        rows={artists}
        rowKey={(a) => a.id}
        columns={[
          { header: 'Name', render: (a) => <span className="text-white font-semibold">{a.stageName}</span> },
          { header: 'Hometown', render: (a) => <span className="text-surface-300">{a.hometown}</span> },
          { header: 'Monthly Listeners', render: (a) => a.monthlyListeners.toLocaleString() },
          {
            header: '',
            render: (a) => (
              <RowActions
                endpoint={`/music/artists/${a.slug}`}
                toggle={{ field: 'isVerified', currentValue: a.isVerified, values: [true, false], labels: ['Unverify', 'Verify'] }}
              />
            ),
          },
        ]}
      />
    </div>
  );
}
