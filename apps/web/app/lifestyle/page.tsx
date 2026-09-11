import { ArticleCard } from '@indimba/ui/ArticleCard';
import { articlesStore } from '@indimba/mock-data';

export const metadata = {
  title: 'Indimba Lifestyle',
  description: 'Food, fashion, wellness and travel across Zambia.',
};

const ACCENT = '#DB2777';

export default function LifestylePage() {
  const articles = articlesStore
    .list((a) => a.status === 'published' && a.platform === 'lifestyle')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  const [lead, ...rest] = articles;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <div className="mb-10">
        <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: ACCENT }}>
          Indimba Lifestyle
        </p>
        <h1 className="font-display text-4xl lg:text-5xl tracking-wide text-white">LIVE WELL</h1>
      </div>

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
