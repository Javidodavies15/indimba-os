import { NextResponse } from 'next/server';
import { albumsStore, artistsStore, tracksStore } from '@indimba/mock-data';
import { notFound, requireAdmin } from '@/lib/mock-api';

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const artist = artistsStore.get(params.slug, 'slug');
  if (!artist) return notFound('Artist not found');
  const tracks = tracksStore.list((t) => t.artistSlug === params.slug);
  const albums = albumsStore.list((a) => a.artistSlug === params.slug);
  return NextResponse.json({ artist, tracks, albums });
}

export async function PATCH(request: Request, { params }: { params: { slug: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const patch = await request.json();
  const updated = artistsStore.update(params.slug, patch, 'slug');
  if (!updated) return notFound('Artist not found');
  return NextResponse.json({ artist: updated });
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const ok = artistsStore.remove(params.slug, 'slug');
  if (!ok) return notFound('Artist not found');
  return NextResponse.json({ ok: true });
}
