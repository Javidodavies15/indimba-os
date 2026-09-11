import { NextResponse } from 'next/server';
import { albumsStore } from '@indimba/mock-data';
import { requireAdmin } from '@/lib/mock-api';

export async function GET() {
  return NextResponse.json({ items: albumsStore.list() });
}

export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const body = await request.json();
  const album = {
    id: `album_${body.slug ?? Date.now()}`,
    artistId: body.artistId,
    artistName: body.artistName,
    artistSlug: body.artistSlug,
    title: body.title,
    slug: body.slug,
    coverUrl: body.coverUrl ?? '',
    releaseDate: body.releaseDate ?? new Date().toISOString(),
    description: body.description ?? '',
    trackIds: body.trackIds ?? [],
  };
  albumsStore.create(album);
  return NextResponse.json({ album }, { status: 201 });
}
