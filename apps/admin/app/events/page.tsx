import { DataTable, StatusBadge } from '@/components/DataTable';
import { CreateEntityModal } from '@/components/CreateEntityModal';
import { RowActions } from '@/components/RowActions';
import { api } from '@/lib/api';
import type { Event } from '@indimba/mock-data';

const STATUS_TONE: Record<string, 'success' | 'warning' | 'neutral' | 'danger'> = {
  published: 'success',
  draft: 'neutral',
  sold_out: 'warning',
  cancelled: 'danger',
  completed: 'neutral',
};

export default async function EventsAdminPage() {
  const { items: events } = await api.get<{ items: Event[] }>('/events?status=all');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl tracking-wide text-white">EVENTS</h1>
        <CreateEntityModal
          title="New Event"
          endpoint="/events"
          buttonLabel="New Event"
          fields={[
            { name: 'title', label: 'Title', required: true },
            { name: 'slug', label: 'Slug', required: true },
            { name: 'category', label: 'Category', defaultValue: 'Concert' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'startsAt', label: 'Start Date/Time', placeholder: '2026-12-01T18:00:00.000Z', required: true },
            { name: 'venueName', label: 'Venue Name' },
            { name: 'venueCity', label: 'City' },
            { name: 'status', label: 'Status', type: 'select', defaultValue: 'draft', options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }] },
          ]}
        />
      </div>

      <DataTable<Event>
        rows={events}
        rowKey={(e) => e.id}
        columns={[
          { header: 'Title', render: (e) => <span className="text-white font-semibold">{e.title}</span> },
          { header: 'City', render: (e) => <span className="text-surface-300">{e.venue.city}</span> },
          { header: 'Date', render: (e) => <span className="text-surface-300">{new Date(e.startsAt).toLocaleDateString('en-GB')}</span> },
          { header: 'Status', render: (e) => <StatusBadge status={e.status} tone={STATUS_TONE[e.status] ?? 'neutral'} /> },
          {
            header: '',
            render: (e) => (
              <RowActions
                endpoint={`/events/${e.id}`}
                toggle={{ field: 'status', currentValue: e.status, values: ['published', 'draft'], labels: ['Unpublish', 'Publish'] }}
              />
            ),
          },
        ]}
      />
    </div>
  );
}
