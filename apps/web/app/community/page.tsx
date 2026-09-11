import Link from 'next/link';
import Image from 'next/image';
import { ArticleCard } from '@indimba/ui/ArticleCard';
import { articlesStore, communityProjectsStore } from '@indimba/mock-data';

export const metadata = {
  title: 'Indimba Community',
  description: 'Zambian community stories, grassroots projects and local initiatives.',
};

const ACCENT = '#059669';

export default function CommunityPage() {
  const articles = articlesStore
    .list((a) => a.status === 'published' && a.platform === 'community')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  const projects = communityProjectsStore.list();

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <div className="mb-10">
        <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: ACCENT }}>
          Indimba Community
        </p>
        <h1 className="font-display text-4xl lg:text-5xl tracking-wide text-white">BUILT TOGETHER</h1>
      </div>

      <Link
        href="/community/chess"
        className="flex items-center justify-between mb-12 p-6 bg-surface-800 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
      >
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: ACCENT }}>
            Featured
          </p>
          <h2 className="font-bold text-white text-lg">Zambia Chess Community</h2>
          <p className="text-surface-400 text-sm mt-1">Clubs, tournaments and upcoming events near you.</p>
        </div>
        <span className="text-sm font-semibold" style={{ color: ACCENT }}>
          Explore →
        </span>
      </Link>

      {projects.length > 0 && (
        <section className="mb-12">
          <h2 className="font-extrabold text-xl text-white mb-4">Community Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <Link key={p.id} href={`/community/projects/${p.slug}`} className="flex gap-4 bg-surface-800 rounded-xl border border-white/5 hover:border-white/10 transition-colors overflow-hidden">
                <div className="w-32 shrink-0 relative">
                  <Image src={p.coverUrl} alt={p.title} fill className="object-cover" />
                </div>
                <div className="py-4 pr-4 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: ACCENT }}>
                    {p.status}
                  </span>
                  <h3 className="font-bold text-white text-sm mt-1 truncate">{p.title}</h3>
                  <p className="text-surface-400 text-xs mt-1 line-clamp-2">{p.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {articles.length > 0 && (
        <section>
          <h2 className="font-extrabold text-xl text-white mb-4">Community Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a) => (
              <ArticleCard key={a.id} article={a} platformAccent={ACCENT} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
