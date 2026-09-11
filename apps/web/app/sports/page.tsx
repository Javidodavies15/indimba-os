import Link from 'next/link';
import { Trophy, Calendar } from 'lucide-react';
import { MatchCard } from '@indimba/ui/MatchCard';
import { ArticleCard } from '@indimba/ui/ArticleCard';
import { articlesStore, matchesStore } from '@indimba/mock-data';

export const metadata = {
  title: 'Indimba Sports — Live Scores & Fixtures',
  description: 'Zambian football live scores, fixtures, and match reports.',
};

export default function SportsPage() {
  const upcoming = matchesStore
    .list((m) => m.status === 'live' || m.status === 'halftime' || m.status === 'scheduled')
    .sort((a, b) => new Date(a.kickoffAt).getTime() - new Date(b.kickoffAt).getTime())
    .slice(0, 3);
  const news = articlesStore
    .list((a) => a.status === 'published' && a.platform === 'sports')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <div className="mb-10">
        <p className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-2">Indiwabola</p>
        <h1 className="font-display text-4xl lg:text-5xl tracking-wide text-white">FOOTBALL</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link href="/sports/fixtures"
              className="flex items-center gap-4 p-6 bg-surface-800 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white">Fixtures</h3>
            <p className="text-xs text-surface-300">Upcoming matches</p>
          </div>
        </Link>
        <Link href="/sports/standings"
              className="flex items-center gap-4 p-6 bg-surface-800 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white">Standings</h3>
            <p className="text-xs text-surface-300">League tables</p>
          </div>
        </Link>
      </div>

      {upcoming.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-extrabold text-xl text-white">Live & Upcoming</h2>
            <Link href="/sports/fixtures" className="text-sm text-blue-400 hover:text-blue-300 font-semibold">
              All fixtures →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcoming.map((m) => (
              <MatchCard key={m.id} {...m} />
            ))}
          </div>
        </section>
      )}

      {news.length > 0 && (
        <section>
          <h2 className="font-extrabold text-xl text-white mb-6">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news.map((a) => (
              <ArticleCard key={a.id} article={a} platformAccent="#1D4ED8" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
