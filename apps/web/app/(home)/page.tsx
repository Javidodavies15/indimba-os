import { ArticleCard } from '@indimba/ui/ArticleCard';
import Link from 'next/link';
import { ArrowRight, Music, Trophy, Radio, Calendar } from 'lucide-react';
import { articlesStore } from '@indimba/mock-data';

export default async function HomePage() {
  const published = articlesStore.list((a) => a.status === 'published');
  const featured = {
    articles: published
      .filter((a) => a.isFeatured)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 6),
  };
  const latest = {
    articles: [...published]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 12),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      {/* Hero */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <p className="text-xs font-bold tracking-widest text-indimba-red-400 uppercase mb-3">
            Africa&apos;s Story. Africa&apos;s Stage.
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide text-white">
            INDIMBA
          </h1>
          <p className="text-surface-300 mt-4 max-w-xl mx-auto text-sm md:text-base">
            Zambia&apos;s digital home for entertainment, sports, music, and culture.
            Built by Africans, for Africans.
          </p>
        </div>

        {/* Platform quick links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          <PlatformCard href="/music" icon={<Music className="w-6 h-6" />} label="Music" color="bg-purple-500" />
          <PlatformCard href="/sports" icon={<Trophy className="w-6 h-6" />} label="Sports" color="bg-blue-500" />
          <PlatformCard href="/podcasts" icon={<Radio className="w-6 h-6" />} label="Podcasts" color="bg-orange-500" />
          <PlatformCard href="/events" icon={<Calendar className="w-6 h-6" />} label="Events" color="bg-teal-500" />
        </div>
      </section>

      {/* Featured articles */}
      {featured.articles?.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-extrabold text-xl text-white">Featured Stories</h2>
            <Link href="/entertainment" className="text-sm text-indimba-red-400 hover:text-indimba-red-300 font-semibold flex items-center gap-1">
              All stories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.articles.slice(0, 3).map((article: any) => (
              <ArticleCard key={article.id} article={article} platformAccent="#C8102E" />
            ))}
          </div>
        </section>
      )}

      {/* Latest articles */}
      {latest.articles?.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-extrabold text-xl text-white">Latest</h2>
            <Link href="/entertainment" className="text-sm text-indimba-red-400 hover:text-indimba-red-300 font-semibold flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.articles.slice(0, 6).map((article: any) => (
              <ArticleCard key={article.id} article={article} platformAccent="#C8102E" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function PlatformCard({ href, icon, label, color }: { href: string; icon: React.ReactNode; label: string; color: string }) {
  return (
    <Link href={href}
          className="flex items-center gap-3 p-4 bg-surface-800 rounded-xl
                     border border-white/5 hover:border-white/10 
                     hover:-translate-y-0.5 transition-all group">
      <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center text-white`}>
        {icon}
      </div>
      <span className="font-bold text-white group-hover:text-indimba-gold-300 transition-colors">{label}</span>
    </Link>
  );
}
