import { DataTable, StatusBadge } from '@/components/DataTable';
import { CreateEntityModal } from '@/components/CreateEntityModal';
import { RowActions } from '@/components/RowActions';
import { api } from '@/lib/api';
import type { StoreProduct } from '@indimba/mock-data';

export default async function StoreAdminPage() {
  const { items: products } = await api.get<{ items: StoreProduct[] }>('/store/products?status=all');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl tracking-wide text-white">STORE</h1>
        <CreateEntityModal
          title="New Product"
          endpoint="/store/products"
          buttonLabel="New Product"
          fields={[
            { name: 'name', label: 'Name', required: true },
            { name: 'slug', label: 'Slug', required: true },
            { name: 'category', label: 'Category', defaultValue: 'Apparel' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'priceZmwCents', label: 'Price (ZMW cents)', type: 'number', required: true, defaultValue: 10000 },
            { name: 'inventory', label: 'Inventory', type: 'number', defaultValue: 50 },
          ]}
        />
      </div>

      <DataTable<StoreProduct>
        rows={products}
        rowKey={(p) => p.id}
        columns={[
          { header: 'Name', render: (p) => <span className="text-white font-semibold">{p.name}</span> },
          { header: 'Category', render: (p) => <span className="text-surface-300">{p.category}</span> },
          { header: 'Price', render: (p) => `K${(p.priceZmwCents / 100).toLocaleString()}` },
          { header: 'Inventory', render: (p) => p.inventory },
          { header: 'Status', render: (p) => <StatusBadge status={p.isActive ? 'active' : 'inactive'} tone={p.isActive ? 'success' : 'neutral'} /> },
          {
            header: '',
            render: (p) => (
              <RowActions
                endpoint={`/store/products/${p.slug}`}
                toggle={{ field: 'isActive', currentValue: p.isActive, values: [true, false], labels: ['Deactivate', 'Activate'] }}
              />
            ),
          },
        ]}
      />
    </div>
  );
}
