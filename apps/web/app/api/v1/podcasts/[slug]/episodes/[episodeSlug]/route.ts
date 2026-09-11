import { NextResponse } from 'next/server';
import { episodesStore } from '@indimba/mock-data';
import { notFound, requireAdmin } from '@/lib/mock-api';

export async function GET(_request: Request, { params }: { params: { slug: string; episodeSlug: string } }) {
  const episode = episodesStore.get(params.episodeSlug, 'slug');
  if (!episode || episode.podcastSlug !== params.slug) return notFound('Episode not found');
  return NextResponse.json({ episode });
}

export async function PATCH(request: Request, { params }: { params: { episodeSlug: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const patch = await request.json();
  const updated = episodesStore.update(params.episodeSlug, patch, 'slug');
  if (!updated) return notFound('Episode not found');
  return NextResponse.json({ episode: updated });
}

export async function DELETE(request: Request, { params }: { params: { episodeSlug: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const ok = episodesStore.remove(params.episodeSlug, 'slug');
  if (!ok) return notFound('Episode not found');
  return NextResponse.json({ ok: true });
}
