import { NextResponse } from 'next/server';
import { episodesStore, podcastsStore } from '@indimba/mock-data';
import { notFound, requireAdmin } from '@/lib/mock-api';

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const podcast = podcastsStore.get(params.slug, 'slug');
  if (!podcast) return notFound('Podcast not found');
  const episodes = episodesStore
    .list((e) => e.podcastSlug === params.slug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return NextResponse.json({ podcast, episodes });
}

export async function PATCH(request: Request, { params }: { params: { slug: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const patch = await request.json();
  const updated = podcastsStore.update(params.slug, patch, 'slug');
  if (!updated) return notFound('Podcast not found');
  return NextResponse.json({ podcast: updated });
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const ok = podcastsStore.remove(params.slug, 'slug');
  if (!ok) return notFound('Podcast not found');
  return NextResponse.json({ ok: true });
}
