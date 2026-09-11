import type { Event, EventStatus, TicketTier } from '../types';
import { img } from './helpers';

interface TierSeed {
  name: string;
  priceZmwCents: number;
  capacity: number;
  sold: number;
  description: string;
}

interface EventSeed {
  title: string;
  slug: string;
  category: string;
  description: string;
  city: string;
  venue: string;
  daysFromNow: number;
  status: EventStatus;
  tiers: TierSeed[];
}

const eventSeeds: EventSeed[] = [
  {
    title: 'Kopala Tour: Live in Kitwe',
    slug: 'kopala-tour-live-in-kitwe',
    category: 'Concert',
    description: 'The biggest names in Zed hip-hop and Afrobeat come together for one night at the Kopala Grounds, closing out this year\'s Kopala Tour.',
    city: 'Kitwe',
    venue: 'Kopala Grounds',
    daysFromNow: 21,
    status: 'published',
    tiers: [
      { name: 'General', priceZmwCents: 15000, capacity: 5000, sold: 3120, description: 'Standing access to the main grounds.' },
      { name: 'VIP', priceZmwCents: 45000, capacity: 800, sold: 512, description: 'Elevated viewing deck, private bar, fast-lane entry.' },
      { name: 'VVIP Table', priceZmwCents: 120000, capacity: 100, sold: 61, description: 'Table for 4, backstage meet-and-greet.' },
    ],
  },
  {
    title: 'Zed Afrobeat Festival',
    slug: 'zed-afrobeat-festival',
    category: 'Festival',
    description: 'A weekend-long celebration of Afrobeat, Amapiano and gospel across three stages in Lusaka.',
    city: 'Lusaka',
    venue: 'Show Grounds',
    daysFromNow: 45,
    status: 'published',
    tiers: [
      { name: 'Day Pass', priceZmwCents: 20000, capacity: 8000, sold: 2200, description: 'Single-day entry, any stage.' },
      { name: 'Weekend Pass', priceZmwCents: 35000, capacity: 4000, sold: 1875, description: 'Full weekend, all stages.' },
    ],
  },
  {
    title: 'Lusaka Comedy Night',
    slug: 'lusaka-comedy-night',
    category: 'Comedy',
    description: 'A curated lineup of Zambia\'s sharpest stand-up comedians for one night only.',
    city: 'Lusaka',
    venue: 'Mulungushi International Conference Centre',
    daysFromNow: 10,
    status: 'published',
    tiers: [
      { name: 'General', priceZmwCents: 8000, capacity: 1200, sold: 940, description: 'General seating.' },
      { name: 'Front Row', priceZmwCents: 18000, capacity: 100, sold: 88, description: 'Reserved front-row seating.' },
    ],
  },
  {
    title: 'Copperbelt Food & Craft Market',
    slug: 'copperbelt-food-craft-market',
    category: 'Market',
    description: 'A weekend market showcasing Copperbelt food vendors, artisans and live acoustic sets.',
    city: 'Ndola',
    venue: 'Buteko Stadium Grounds',
    daysFromNow: 5,
    status: 'published',
    tiers: [{ name: 'Entry', priceZmwCents: 2500, capacity: 3000, sold: 640, description: 'General market entry.' }],
  },
  {
    title: 'Indimba Awards 2026',
    slug: 'indimba-awards-2026',
    category: 'Awards',
    description: 'Zambia\'s biggest night in music, honouring the year\'s best artists, producers and songs across every genre.',
    city: 'Lusaka',
    venue: 'Mulungushi International Conference Centre',
    daysFromNow: 60,
    status: 'published',
    tiers: [
      { name: 'General', priceZmwCents: 25000, capacity: 2000, sold: 410, description: 'General seating, red carpet viewing.' },
      { name: 'Gala Table', priceZmwCents: 200000, capacity: 40, sold: 12, description: 'Table for 8 with dinner service.' },
    ],
  },
  {
    title: 'Livingstone Wellness Retreat Weekend',
    slug: 'livingstone-wellness-retreat-weekend',
    category: 'Wellness',
    description: 'A three-day riverside retreat with sunrise yoga, guided hikes and a digital-detox programme.',
    city: 'Livingstone',
    venue: 'Zambezi Riverside Lodge',
    daysFromNow: 33,
    status: 'published',
    tiers: [{ name: 'All-Inclusive Pass', priceZmwCents: 180000, capacity: 60, sold: 22, description: 'Accommodation, meals and all sessions included.' }],
  },
  {
    title: 'Chipata Cultural Heritage Day',
    slug: 'chipata-cultural-heritage-day',
    category: 'Culture',
    description: 'A free community celebration of Eastern Province heritage, dance and craft.',
    city: 'Chipata',
    venue: 'Chipata Municipal Grounds',
    daysFromNow: 15,
    status: 'published',
    tiers: [{ name: 'Free Entry', priceZmwCents: 0, capacity: 5000, sold: 1200, description: 'Free community entry.' }],
  },
  {
    title: 'Lusaka Tech & Startups Summit',
    slug: 'lusaka-tech-startups-summit',
    category: 'Conference',
    description: 'A one-day summit connecting founders, investors and policymakers shaping Zambia\'s tech scene.',
    city: 'Lusaka',
    venue: 'AVANI Lusaka Hotel',
    daysFromNow: 40,
    status: 'draft',
    tiers: [{ name: 'Delegate Pass', priceZmwCents: 60000, capacity: 400, sold: 0, description: 'Full-day access, lunch included.' }],
  },
];

export const events: Event[] = eventSeeds.map((e) => {
  const startsAt = new Date(Date.now() + e.daysFromNow * 86400000).toISOString();
  const eventId = `event_${e.slug}`;
  const ticketTiers: TicketTier[] = e.tiers.map((t, i) => ({
    id: `${eventId}_tier_${i}`,
    eventId,
    name: t.name,
    priceZmwCents: t.priceZmwCents,
    capacity: t.capacity,
    sold: t.sold,
    description: t.description,
  }));
  return {
    id: eventId,
    title: e.title,
    slug: e.slug,
    description: e.description,
    venue: { name: e.venue, address: e.venue, city: e.city },
    startsAt,
    status: e.status,
    coverUrl: img(e.slug, 1600, 900),
    category: e.category,
    ticketTiers,
  };
});
