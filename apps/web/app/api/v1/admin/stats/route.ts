import { NextResponse } from 'next/server';
import {
  articlesStore,
  commentsStore,
  eventsStore,
  getChartEntries,
  listingsStore,
  matchesStore,
  podcastsStore,
  productsStore,
  tracksStore,
  usersStore,
} from '@indimba/mock-data';
import { requireAdmin } from '@/lib/mock-api';

export async function GET(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const articles = articlesStore.list();
  const { entries } = getChartEntries(5);

  return NextResponse.json({
    counts: {
      articles: articles.length,
      publishedArticles: articles.filter((a) => a.status === 'published').length,
      tracks: tracksStore.list().length,
      liveMatches: matchesStore.list((m) => m.status === 'live' || m.status === 'halftime').length,
      upcomingEvents: eventsStore.list((e) => e.status === 'published' && new Date(e.startsAt) > new Date()).length,
      podcastEpisodesPublished: podcastsStore.list().reduce((sum, p) => sum + p.episodeCount, 0),
      storeProducts: productsStore.list().length,
      businessListings: listingsStore.list().length,
      pendingModeration: commentsStore.list((c) => c.moderationStatus === 'pending' || c.moderationStatus === 'review_queue').length,
      totalUsers: usersStore.list().length,
    },
    topTracks: entries.slice(0, 5),
    recentArticles: [...articles]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5),
  });
}
