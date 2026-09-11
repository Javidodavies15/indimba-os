import { StatTile } from '@indimba/ui/StatTile';
import { Newspaper, Music, Trophy, Calendar, Mic2, ShoppingBag, Building2, ShieldAlert, Users } from 'lucide-react';
import { api } from '@/lib/api';
import type { Article, ChartEntry } from '@indimba/mock-data';

interface AdminStats {
  counts: {
    articles: number;
    publishedArticles: number;
    tracks: number;
    liveMatches: number;
    upcomingEvents: number;
    podcastEpisodesPublished: number;
    storeProducts: number;
    businessListings: number;
    pendingModeration: number;
    totalUsers: number;
  };
  topTracks: ChartEntry[];
  recentArticles: Article[];
}

export default async function DashboardPage() {
  const stats = await api.get<AdminStats>('/admin/stats');

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide text-white mb-6">DASHBOARD</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatTile label="Published Articles" value={stats.counts.publishedArticles} icon={<Newspaper className="w-4 h-4" />} accent="#C8102E" />
        <StatTile label="Tracks" value={stats.counts.tracks} icon={<Music className="w-4 h-4" />} accent="#7C3AED" />
        <StatTile label="Live Matches" value={stats.counts.liveMatches} icon={<Trophy className="w-4 h-4" />} accent="#1D4ED8" />
        <StatTile label="Upcoming Events" value={stats.counts.upcomingEvents} icon={<Calendar className="w-4 h-4" />} accent="#0891B2" />
        <StatTile label="Podcast Episodes" value={stats.counts.podcastEpisodesPublished} icon={<Mic2 className="w-4 h-4" />} accent="#EA580C" />
        <StatTile label="Store Products" value={stats.counts.storeProducts} icon={<ShoppingBag className="w-4 h-4" />} accent="#FFD700" />
        <StatTile label="Business Listings" value={stats.counts.businessListings} icon={<Building2 className="w-4 h-4" />} accent="#D97706" />
        <StatTile label="Pending Moderation" value={stats.counts.pendingModeration} icon={<ShieldAlert className="w-4 h-4" />} accent="#DC2626" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section>
          <h2 className="font-bold text-white text-sm mb-3">Top Tracks This Week</h2>
          <div className="bg-surface-800 rounded-xl border border-white/5 divide-y divide-white/5">
            {stats.topTracks.map((e) => (
              <div key={e.track.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="text-white font-semibold">
                  #{e.position} {e.track.title}
                </span>
                <span className="text-surface-400 text-xs">{e.track.artistName}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-bold text-white text-sm mb-3">Recent Articles</h2>
          <div className="bg-surface-800 rounded-xl border border-white/5 divide-y divide-white/5">
            {stats.recentArticles.map((a) => (
              <div key={a.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="text-white font-semibold truncate">{a.title}</span>
                <span className="text-surface-400 text-xs shrink-0 ml-3">{a.status}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
