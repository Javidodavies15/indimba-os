import Image from 'next/image';
import Link from 'next/link';
import { Bell, Package, Star } from 'lucide-react';
import { demoUser } from '@indimba/mock-data';

export default function AccountPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 lg:px-6 py-8">
      <div className="flex items-center gap-4 mb-10">
        <Image src={demoUser.avatarUrl} alt={demoUser.displayName} width={72} height={72} className="rounded-full" />
        <div>
          <h1 className="font-display text-2xl tracking-wide text-white">{demoUser.displayName}</h1>
          <p className="text-surface-400 text-sm">{demoUser.email}</p>
          <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-indimba-gold-500/20 text-indimba-gold-400">
            {demoUser.subscriptionTier} member
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Link href="/account/notifications" className="flex items-center gap-4 p-4 bg-surface-800 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
          <Bell className="w-5 h-5 text-surface-400" />
          <span className="text-white font-semibold text-sm">Notifications</span>
        </Link>
        <Link href="/account/orders" className="flex items-center gap-4 p-4 bg-surface-800 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
          <Package className="w-5 h-5 text-surface-400" />
          <span className="text-white font-semibold text-sm">Orders</span>
        </Link>
        <Link href="/account/subscriptions" className="flex items-center gap-4 p-4 bg-surface-800 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
          <Star className="w-5 h-5 text-surface-400" />
          <span className="text-white font-semibold text-sm">Subscription</span>
        </Link>
      </div>
    </div>
  );
}
