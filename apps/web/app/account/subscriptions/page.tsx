import { Button } from '@indimba/ui/Button';
import { demoUser } from '@indimba/mock-data';

const TIERS = [
  { id: 'free', name: 'Free', priceZmw: 0, perks: ['Ad-supported reading', 'Standard streaming quality'] },
  { id: 'plus', name: 'Plus', priceZmw: 49, perks: ['Ad-free reading', 'HD streaming', 'Early event ticket access'] },
  { id: 'premium', name: 'Premium', priceZmw: 99, perks: ['Everything in Plus', 'Offline downloads', 'Exclusive podcasts'] },
];

export default function AccountSubscriptionsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 lg:px-6 py-8">
      <h1 className="font-display text-3xl tracking-wide text-white mb-6">SUBSCRIPTION</h1>
      <div className="grid grid-cols-1 gap-4">
        {TIERS.map((tier) => {
          const isCurrent = tier.id === demoUser.subscriptionTier;
          return (
            <div key={tier.id} className={`bg-surface-800 rounded-xl border p-5 ${isCurrent ? 'border-indimba-gold-500' : 'border-white/5'}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-white">{tier.name}</h3>
                <span className="text-white font-black">{tier.priceZmw === 0 ? 'Free' : `K${tier.priceZmw}/mo`}</span>
              </div>
              <ul className="text-surface-300 text-xs space-y-1 mb-4">
                {tier.perks.map((p) => (
                  <li key={p}>· {p}</li>
                ))}
              </ul>
              <Button variant={isCurrent ? 'secondary' : 'gold'} className="w-full" disabled={isCurrent}>
                {isCurrent ? 'Current Plan' : 'Switch Plan'}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
