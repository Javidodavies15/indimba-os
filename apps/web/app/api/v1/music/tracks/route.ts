import { NextResponse } from 'next/server';
import { artistsStore, tracksStore } from '@indimba/mock-data';
import { requireAdmin } from '@/lib/mock-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const artistSlug = searchParams.get('artist');
  const limit = Number(searchParams.get('limit') ?? '50');
  let items = tracksStore.list();
  if (artistSlug) items = items.filter((t) => t.artistSlug === artistSlug);
  return NextResponse.json({ items: items.slice(0, limit) });
}

export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const body = await request.json();
  const artist = body.artistSlug ? artistsStore.get(body.artistSlug, 'slug') : undefined;
  const track = {
    id: `track_${body.slug ?? Date.now()}`,
    artistId: artist?.id ?? body.artistId ?? '',
    artistName: artist?.stageName ?? body.artistName ?? '',
    artistSlug: body.artistSlug,
    title: body.title,
    slug: body.slug,
    albumId: body.albumId,
    albumTitle: body.albumTitle,
    duration: body.duration ?? 180,
    coverUrl: body.coverUrl ?? '',
    genres: body.genres ?? [],
    isExplicit: !!body.isExplicit,
    zambiaStreamsTotal: body.zambiaStreamsTotal ?? 0,
    zambiaStreamsWeekly: body.zambiaStreamsWeekly ?? 0,
    streamingLinks: body.streamingLinks ?? {},
    createdAt: new Date().toISOString(),
  };
  tracksStore.create(track);
  return NextResponse.json({ track }, { status: 201 });
}
