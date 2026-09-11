import { demoUser, ordersStore } from '@indimba/mock-data';

const STATUS_COLOR: Record<string, string> = {
  pending: 'bg-indimba-gold-500/20 text-indimba-gold-400',
  paid: 'bg-blue-500/20 text-blue-400',
  fulfilled: 'bg-emerald-500/20 text-emerald-400',
  cancelled: 'bg-indimba-red-500/20 text-indimba-red-400',
};

export default function AccountOrdersPage() {
  const orders = ordersStore
    .list((o) => o.userId === demoUser.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="max-w-2xl mx-auto px-4 lg:px-6 py-8">
      <h1 className="font-display text-3xl tracking-wide text-white mb-6">ORDERS</h1>
      <div className="bg-surface-800 rounded-2xl border border-white/5 divide-y divide-white/5">
        {orders.map((o) => (
          <div key={o.id} className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-white text-sm font-semibold">{o.refTitle}</p>
              <p className="text-surface-400 text-xs mt-1">
                Qty {o.quantity} · K{(o.totalZmwCents / 100).toLocaleString()}
              </p>
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full shrink-0 ${STATUS_COLOR[o.status]}`}>
              {o.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
