import { DataTable, StatusBadge } from '@/components/DataTable';
import { CreateEntityModal } from '@/components/CreateEntityModal';
import { RowActions } from '@/components/RowActions';
import { api } from '@/lib/api';
import type { Article } from '@indimba/mock-data';

const STATUS_TONE: Record<string, 'success' | 'warning' | 'neutral'> = {
  published: 'success',
  draft: 'neutral',
  review: 'warning',
  archived: 'neutral',
};

export default async function ArticlesPage() {
  const { articles } = await api.get<{ articles: Article[] }>('/articles?status=all&limit=200');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl tracking-wide text-white">ARTICLES</h1>
        <CreateEntityModal
          title="New Article"
          endpoint="/articles"
          buttonLabel="New Article"
          fields={[
            { name: 'title', label: 'Title', required: true },
            { name: 'slug', label: 'Slug', required: true, placeholder: 'my-article-slug' },
            {
              name: 'platform',
              label: 'Platform',
              type: 'select',
              required: true,
              defaultValue: 'entertainment',
              options: ['entertainment', 'sports', 'music', 'events', 'podcasts', 'community', 'business', 'lifestyle'].map((p) => ({ value: p, label: p })),
            },
            { name: 'category', label: 'Category', required: true },
            { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
            { name: 'body', label: 'Body', type: 'textarea' },
            { name: 'status', label: 'Status', type: 'select', defaultValue: 'draft', options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }] },
          ]}
        />
      </div>

      <DataTable<Article>
        rows={articles}
        rowKey={(a) => a.id}
        columns={[
          { header: 'Title', render: (a) => <span className="text-white font-semibold">{a.title}</span> },
          { header: 'Platform', render: (a) => <span className="text-surface-300 capitalize">{a.platform}</span> },
          { header: 'Views', render: (a) => a.viewCount.toLocaleString() },
          { header: 'Status', render: (a) => <StatusBadge status={a.status} tone={STATUS_TONE[a.status] ?? 'neutral'} /> },
          {
            header: '',
            render: (a) => (
              <RowActions
                endpoint={`/articles/${a.slug}`}
                toggle={{ field: 'status', currentValue: a.status, values: ['published', 'draft'], labels: ['Unpublish', 'Publish'] }}
              />
            ),
          },
        ]}
      />
    </div>
  );
}
