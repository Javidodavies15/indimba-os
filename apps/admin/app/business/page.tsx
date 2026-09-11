import { DataTable, StatusBadge } from '@/components/DataTable';
import { CreateEntityModal } from '@/components/CreateEntityModal';
import { RowActions } from '@/components/RowActions';
import { api } from '@/lib/api';
import type { BusinessListing } from '@indimba/mock-data';

const STATUS_TONE: Record<string, 'success' | 'warning' | 'neutral'> = {
  active: 'success',
  pending: 'warning',
  suspended: 'neutral',
};

export default async function BusinessAdminPage() {
  const { items: listings } = await api.get<{ items: BusinessListing[] }>('/business/listings?status=all');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl tracking-wide text-white">BUSINESS DIRECTORY</h1>
        <CreateEntityModal
          title="New Listing"
          endpoint="/business/listings"
          buttonLabel="New Listing"
          fields={[
            { name: 'name', label: 'Business Name', required: true },
            { name: 'slug', label: 'Slug', required: true },
            { name: 'category', label: 'Category', defaultValue: 'General' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'city', label: 'City' },
            { name: 'status', label: 'Status', type: 'select', defaultValue: 'pending', options: [{ value: 'pending', label: 'Pending' }, { value: 'active', label: 'Active' }] },
          ]}
        />
      </div>

      <DataTable<BusinessListing>
        rows={listings}
        rowKey={(l) => l.id}
        columns={[
          { header: 'Name', render: (l) => <span className="text-white font-semibold">{l.name}</span> },
          { header: 'Category', render: (l) => <span className="text-surface-300">{l.category}</span> },
          { header: 'City', render: (l) => <span className="text-surface-300">{l.location.city}</span> },
          { header: 'Status', render: (l) => <StatusBadge status={l.status} tone={STATUS_TONE[l.status] ?? 'neutral'} /> },
          {
            header: '',
            render: (l) => (
              <RowActions
                endpoint={`/business/listings/${l.slug}`}
                toggle={{ field: 'status', currentValue: l.status, values: ['active', 'pending'], labels: ['Suspend', 'Activate'] }}
              />
            ),
          },
        ]}
      />
    </div>
  );
}
