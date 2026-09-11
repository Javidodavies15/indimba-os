import { NextResponse } from 'next/server';
import { listingsStore } from '@indimba/mock-data';
import { notFound, requireAdmin } from '@/lib/mock-api';

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const listing = listingsStore.get(params.slug, 'slug');
  if (!listing) return notFound('Listing not found');
  return NextResponse.json({ listing });
}

export async function PATCH(request: Request, { params }: { params: { slug: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const patch = await request.json();
  const updated = listingsStore.update(params.slug, patch, 'slug');
  if (!updated) return notFound('Listing not found');
  return NextResponse.json({ listing: updated });
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const ok = listingsStore.remove(params.slug, 'slug');
  if (!ok) return notFound('Listing not found');
  return NextResponse.json({ ok: true });
}
