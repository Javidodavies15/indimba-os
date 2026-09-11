import { DataTable, StatusBadge } from '@/components/DataTable';
import { CreateEntityModal } from '@/components/CreateEntityModal';
import { RowActions } from '@/components/RowActions';
import { api } from '@/lib/api';
import type { Podcast } from '@indimba/mock-data';

const STATUS_TONE: Record<string, 'success' | 'warning' | 'neutral'> = {
  published: 'success',
  draft: 'neutral',
  archived: 'warning',
};

export default async function PodcastsAdminPage() {
  const { items: podcasts } = await api.get<{ items: Podcast[] }>('/podcasts?status=all');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl tracking-wide text-white">PODCASTS</h1>
        <CreateEntityModal
          title="New Podcast"
          endpoint="/podcasts"
          buttonLabel="New Podcast"
          fields={[
            { name: 'title', label: 'Title', required: true },
            { name: 'slug', label: 'Slug', required: true },
            { name: 'hostName', label: 'Host Name' },
            { name: 'category', label: 'Category', defaultValue: 'Culture' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'status', label: 'Status', type: 'select', defaultValue: 'draft', options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }] },
          ]}
        />
      </div>

      <DataTable<Podcast>
        rows={podcasts}
        rowKey={(p) => p.id}
        columns={[
          { header: 'Title', render: (p) => <span className="text-white font-semibold">{p.title}</span> },
          { header: 'Host', render: (p) => <span className="text-surface-300">{p.hostName}</span> },
          { header: 'Episodes', render: (p) => p.episodeCount },
          { header: 'Status', render: (p) => <StatusBadge status={p.status} tone={STATUS_TONE[p.status] ?? 'neutral'} /> },
          {
            header: '',
            render: (p) => (
              <RowActions
                endpoint={`/podcasts/${p.slug}`}
                toggle={{ field: 'status', currentValue: p.status, values: ['published', 'draft'], labels: ['Unpublish', 'Publish'] }}
              />
            ),
          },
        ]}
      />
    </div>
  );
}
