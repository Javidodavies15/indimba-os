import { DataTable, StatusBadge } from '@/components/DataTable';
import { api } from '@/lib/api';
import type { AppUser } from '@indimba/mock-data';

const ROLE_TONE: Record<string, 'success' | 'warning' | 'neutral' | 'danger'> = {
  reader: 'neutral',
  artist: 'success',
  editor: 'warning',
  admin: 'danger',
  super_admin: 'danger',
};

export default async function UsersPage() {
  const { items: users } = await api.get<{ items: AppUser[] }>('/users');

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide text-white mb-6">USERS</h1>
      <DataTable<AppUser>
        rows={users}
        rowKey={(u) => u.id}
        columns={[
          { header: 'Name', render: (u) => <span className="text-white font-semibold">{u.displayName}</span> },
          { header: 'Email', render: (u) => <span className="text-surface-300">{u.email}</span> },
          { header: 'Role', render: (u) => <StatusBadge status={u.role} tone={ROLE_TONE[u.role] ?? 'neutral'} /> },
          { header: 'Tier', render: (u) => <span className="text-surface-300 capitalize">{u.subscriptionTier}</span> },
          { header: 'Verified', render: (u) => <StatusBadge status={u.isVerified ? 'verified' : 'unverified'} tone={u.isVerified ? 'success' : 'neutral'} /> },
        ]}
      />
    </div>
  );
}
