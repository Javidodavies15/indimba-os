import { NextResponse } from 'next/server';
import { podcastsStore } from '@indimba/mock-data';
import { requireAdmin } from '@/lib/mock-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const items = status === 'all' ? podcastsStore.list() : podcastsStore.list((p) => p.status === (status ?? 'published'));
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const body = await request.json();
  const podcast = {
    id: `podcast_${body.slug ?? Date.now()}`,
    title: body.title,
    slug: body.slug,
    description: body.description ?? '',
    coverUrl: body.coverUrl ?? '',
    category: body.category ?? 'General',
    language: body.language ?? 'en',
    hostName: body.hostName ?? '',
    status: body.status ?? 'draft',
    episodeCount: 0,
  };
  podcastsStore.create(podcast);
  return NextResponse.json({ podcast }, { status: 201 });
}
