import { NextResponse } from 'next/server';
import { eventsStore } from '@indimba/mock-data';
import { requireAdmin } from '@/lib/mock-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  let items = eventsStore.list();
  if (status && status !== 'all') {
    items = items.filter((e) => e.status === status);
  } else if (!status) {
    items = items.filter((e) => e.status !== 'draft');
  }
  items = [...items].sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const body = await request.json();
  const event = {
    id: `event_${body.slug ?? Date.now()}`,
    title: body.title,
    slug: body.slug,
    description: body.description ?? '',
    venue: body.venue ?? { name: body.venueName ?? '', address: body.venueName ?? '', city: body.venueCity ?? '' },
    startsAt: body.startsAt ?? new Date().toISOString(),
    endsAt: body.endsAt,
    status: body.status ?? 'draft',
    coverUrl: body.coverUrl ?? '',
    category: body.category ?? 'General',
    ticketTiers: body.ticketTiers ?? [],
  };
  eventsStore.create(event);
  return NextResponse.json({ event }, { status: 201 });
}
