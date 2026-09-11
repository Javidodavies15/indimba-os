import { notFound } from 'next/navigation';
import { eventsStore } from '@indimba/mock-data';
import { CheckoutForm } from '@/components/CheckoutForm';

function findEvent(id: string) {
  return eventsStore.get(id) ?? eventsStore.get(id, 'slug');
}

export default function CheckoutPage({ params, searchParams }: { params: { id: string }; searchParams: { tier?: string } }) {
  const event = findEvent(params.id);
  if (!event) notFound();

  const tier = event.ticketTiers.find((t) => t.id === searchParams.tier) ?? event.ticketTiers[0];
  if (!tier) notFound();

  return (
    <div className="max-w-md mx-auto px-4 lg:px-6 py-8">
      <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#0891B2' }}>
        Checkout
      </p>
      <h1 className="font-display text-3xl tracking-wide text-white mb-6">{event.title}</h1>
      <CheckoutForm eventTitle={event.title} tierName={tier.name} priceZmwCents={tier.priceZmwCents} />
    </div>
  );
}
