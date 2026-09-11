import { NextResponse } from 'next/server';
import { albumsStore, tracksStore } from '@indimba/mock-data';
import { notFound, requireAdmin } from '@/lib/mock-api';

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const album = albumsStore.get(params.slug, 'slug');
  if (!album) return notFound('Album not found');
  const tracks = tracksStore.list((t) => t.albumId === album.id);
  return NextResponse.json({ album, tracks });
}

export async function PATCH(request: Request, { params }: { params: { slug: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const patch = await request.json();
  const updated = albumsStore.update(params.slug, patch, 'slug');
  if (!updated) return notFound('Album not found');
  return NextResponse.json({ album: updated });
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const ok = albumsStore.remove(params.slug, 'slug');
  if (!ok) return notFound('Album not found');
  return NextResponse.json({ ok: true });
}
