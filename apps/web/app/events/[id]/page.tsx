import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin } from 'lucide-react';
import { Button } from '@indimba/ui/Button';
import { eventsStore } from '@indimba/mock-data';

function findEvent(id: string) {
  return eventsStore.get(id) ?? eventsStore.get(id, 'slug');
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const event = findEvent(params.id);
  if (!event) return {};
  return { title: event.title, description: event.description };
}

export default function EventPage({ params }: { params: { id: string } }) {
  const event = findEvent(params.id);
  if (!event) notFound();

  const date = new Date(event.startsAt);

  return (
    <div>
      <div className="relative h-64 md:h-96">
        <Image src={event.coverUrl} alt={event.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-surface-900/40 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-6 -mt-20 relative">
        <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#0891B2' }}>
          {event.category}
        </p>
        <h1 className="font-display text-4xl md:text-5xl tracking-wide text-white mb-4">{event.title}</h1>
        <div className="flex flex-wrap items-center gap-5 text-sm text-surface-300 mb-8">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            {event.venue.name}, {event.venue.city}
          </span>
        </div>

        <p className="text-surface-300 text-base max-w-2xl mb-10">{event.description}</p>

        <section>
          <h2 className="font-extrabold text-xl text-white mb-4">Tickets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {event.ticketTiers.map((tier) => {
              const remaining = tier.capacity - tier.sold;
              const soldOut = remaining <= 0;
              return (
                <div key={tier.id} className="bg-surface-800 rounded-xl border border-white/5 p-5 flex flex-col">
                  <h3 className="font-bold text-white">{tier.name}</h3>
                  <p className="text-surface-400 text-xs mt-1 mb-4 flex-1">{tier.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-white">
                      {tier.priceZmwCents === 0 ? 'Free' : `K${(tier.priceZmwCents / 100).toLocaleString()}`}
                    </span>
                    {!soldOut && remaining < 100 && <span className="text-xs text-indimba-gold-400">{remaining} left</span>}
                  </div>
                  <Link href={soldOut ? '#' : `/events/${event.id}/checkout?tier=${tier.id}`} className="mt-4">
                    <Button variant="events" className="w-full" disabled={soldOut}>
                      {soldOut ? 'Sold Out' : 'Get Tickets'}
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
