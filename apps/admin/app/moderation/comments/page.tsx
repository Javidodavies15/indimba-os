import { DataTable, StatusBadge } from '@/components/DataTable';
import { ModerationActions } from '@/components/ModerationActions';
import { api } from '@/lib/api';
import type { Comment } from '@indimba/mock-data';

const STATUS_TONE: Record<string, 'success' | 'warning' | 'neutral' | 'danger'> = {
  pending: 'warning',
  review_queue: 'danger',
  approved: 'success',
  rejected: 'neutral',
};

export default async function ModerationCommentsPage() {
  const { items: comments } = await api.get<{ items: Comment[] }>('/comments');
  const queue = comments.filter((c) => c.moderationStatus === 'pending' || c.moderationStatus === 'review_queue');
  const resolved = comments.filter((c) => c.moderationStatus === 'approved' || c.moderationStatus === 'rejected');

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide text-white mb-6">MODERATION QUEUE</h1>

      <h2 className="font-bold text-white text-sm mb-3">Needs Review ({queue.length})</h2>
      <div className="mb-8">
        <DataTable<Comment>
          rows={queue}
          rowKey={(c) => c.id}
          emptyMessage="Nothing pending — queue is clear."
          columns={[
            { header: 'Comment', render: (c) => <span className="text-white">{c.body}</span>, className: 'max-w-md' },
            { header: 'By', render: (c) => <span className="text-surface-300">{c.userName}</span> },
            {
              header: 'AI Flags',
              render: (c) =>
                c.aiCategories.length > 0 ? (
                  <div className="flex gap-1">
                    {c.aiCategories.map((cat) => (
                      <StatusBadge key={cat} status={cat} tone="warning" />
                    ))}
                  </div>
                ) : (
                  <span className="text-surface-500 text-xs">—</span>
                ),
            },
            { header: 'Status', render: (c) => <StatusBadge status={c.moderationStatus} tone={STATUS_TONE[c.moderationStatus]} /> },
            { header: '', render: (c) => <ModerationActions commentId={c.id} /> },
          ]}
        />
      </div>

      <h2 className="font-bold text-white text-sm mb-3">Resolved</h2>
      <DataTable<Comment>
        rows={resolved}
        rowKey={(c) => c.id}
        columns={[
          { header: 'Comment', render: (c) => <span className="text-white">{c.body}</span>, className: 'max-w-md' },
          { header: 'By', render: (c) => <span className="text-surface-300">{c.userName}</span> },
          { header: 'Status', render: (c) => <StatusBadge status={c.moderationStatus} tone={STATUS_TONE[c.moderationStatus]} /> },
        ]}
      />
    </div>
  );
}
