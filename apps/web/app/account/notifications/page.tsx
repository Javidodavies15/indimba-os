import { formatDistanceToNow } from 'date-fns';
import { demoUser, notificationsStore } from '@indimba/mock-data';

export default function AccountNotificationsPage() {
  const items = notificationsStore
    .list((n) => n.userId === demoUser.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="max-w-2xl mx-auto px-4 lg:px-6 py-8">
      <h1 className="font-display text-3xl tracking-wide text-white mb-6">NOTIFICATIONS</h1>
      <div className="bg-surface-800 rounded-2xl border border-white/5 divide-y divide-white/5">
        {items.map((n) => (
          <div key={n.id} className={`px-5 py-4 ${n.isRead ? 'opacity-60' : ''}`}>
            <p className="text-white text-sm font-semibold">{n.title}</p>
            <p className="text-surface-300 text-xs mt-1">{n.body}</p>
            <p className="text-surface-500 text-[11px] mt-1">{formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
