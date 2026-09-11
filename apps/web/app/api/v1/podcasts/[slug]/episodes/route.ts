import { NextResponse } from 'next/server';
import { episodesStore, podcastsStore } from '@indimba/mock-data';
import { notFound, requireAdmin } from '@/lib/mock-api';

export async function POST(request: Request, { params }: { params: { slug: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const podcast = podcastsStore.get(params.slug, 'slug');
  if (!podcast) return notFound('Podcast not found');
  const body = await request.json();
  const episode = {
    id: `episode_${body.slug ?? Date.now()}`,
    podcastId: podcast.id,
    podcastSlug: podcast.slug,
    podcastTitle: podcast.title,
    title: body.title,
    slug: body.slug,
    description: body.description ?? '',
    audioUrl: body.audioUrl ?? '',
    coverUrl: body.coverUrl ?? podcast.coverUrl,
    duration: body.duration ?? 0,
    chapters: body.chapters ?? [],
    status: body.status ?? 'draft',
    publishedAt: body.publishedAt ?? new Date().toISOString(),
  };
  episodesStore.create(episode);
  podcastsStore.update(podcast.slug, { episodeCount: podcast.episodeCount + 1 }, 'slug');
  return NextResponse.json({ episode }, { status: 201 });
}
