import { NextResponse } from 'next/server';
import { artistsStore } from '@indimba/mock-data';
import { requireAdmin } from '@/lib/mock-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit') ?? '50');
  const items = artistsStore.list().slice(0, limit);
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const body = await request.json();
  const artist = {
    id: `artist_${body.slug ?? Date.now()}`,
    stageName: body.stageName,
    realName: body.realName,
    slug: body.slug,
    bio: body.bio ?? '',
    hometown: body.hometown ?? '',
    genres: body.genres ?? [],
    avatarUrl: body.avatarUrl ?? '',
    coverUrl: body.coverUrl ?? '',
    socialLinks: body.socialLinks ?? {},
    isVerified: !!body.isVerified,
    monthlyListeners: body.monthlyListeners ?? 0,
    createdAt: new Date().toISOString(),
  };
  artistsStore.create(artist);
  return NextResponse.json({ artist }, { status: 201 });
}
