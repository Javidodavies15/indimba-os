import { NextResponse } from 'next/server';
import { tracksStore } from '@indimba/mock-data';
import { notFound, requireAdmin } from '@/lib/mock-api';

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const track = tracksStore.get(params.slug, 'slug');
  if (!track) return notFound('Track not found');
  return NextResponse.json({ track });
}

export async function PATCH(request: Request, { params }: { params: { slug: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const patch = await request.json();
  const updated = tracksStore.update(params.slug, patch, 'slug');
  if (!updated) return notFound('Track not found');
  return NextResponse.json({ track: updated });
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const ok = tracksStore.remove(params.slug, 'slug');
  if (!ok) return notFound('Track not found');
  return NextResponse.json({ ok: true });
}
