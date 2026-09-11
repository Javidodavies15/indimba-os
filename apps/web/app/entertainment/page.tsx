import Link from 'next/link';
import { ArticleCard } from '@indimba/ui/ArticleCard';
import { articlesStore } from '@indimba/mock-data';

export const metadata = {
  title: 'Indimba Entertainment',
  description: 'Zambian entertainment news, film, comedy and culture.',
};

const ACCENT = '#C8102E';

export default function EntertainmentPage() {
  const articles = articlesStore
    .list((a) => a.status === 'published' && a.platform === 'entertainment')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  const [lead, ...rest] = articles;
  const categories = [...new Set(articles.map((a) => a.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: ACCENT }}>
          Indimba Entertainment
        </p>
        <h1 className="font-display text-4xl lg:text-5xl tracking-wide text-white">CULTURE & CULTURE-MAKERS</h1>
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c) => (
            <Link
              key={c}
              href={`/entertainment/category/${encodeURIComponent(c.toLowerCase().replace(/\s+/g, '-'))}`}
              className="text-xs px-3 py-1.5 rounded-full bg-surface-800 border border-white/5 text-surface-300 hover:text-white hover:border-white/20"
            >
              {c}
            </Link>
          ))}
        </div>
      )}

      {lead && (
        <div className="mb-10">
          <ArticleCard article={lead} variant="featured" platformAccent={ACCENT} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((a) => (
          <ArticleCard key={a.id} article={a} platformAccent={ACCENT} />
        ))}
      </div>
    </div>
  );
}
