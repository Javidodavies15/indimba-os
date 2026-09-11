import { NextResponse } from 'next/server';
import { listingsStore } from '@indimba/mock-data';
import { requireAdmin } from '@/lib/mock-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const items = status === 'all' ? listingsStore.list() : listingsStore.list((l) => l.status === (status ?? 'active'));
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const body = await request.json();
  const listing = {
    id: `listing_${body.slug ?? Date.now()}`,
    name: body.name,
    slug: body.slug,
    category: body.category ?? 'General',
    description: body.description ?? '',
    contact: body.contact ?? {},
    location: body.location ?? { city: body.city ?? '' },
    images: body.images ?? [],
    tier: body.tier ?? 'free',
    isVerified: !!body.isVerified,
    status: body.status ?? 'pending',
  };
  listingsStore.create(listing);
  return NextResponse.json({ listing }, { status: 201 });
}
