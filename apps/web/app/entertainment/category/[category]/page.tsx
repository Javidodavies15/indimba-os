import { notFound } from 'next/navigation';
import { ArticleCard } from '@indimba/ui/ArticleCard';
import { articlesStore } from '@indimba/mock-data';

export default function EntertainmentCategoryPage({ params }: { params: { category: string } }) {
  const label = decodeURIComponent(params.category).replace(/-/g, ' ');
  const articles = articlesStore
    .list((a) => a.status === 'published' && a.platform === 'entertainment' && a.category.toLowerCase() === label.toLowerCase())
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  if (articles.length === 0) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest text-indimba-red-400 uppercase mb-2">Entertainment</p>
        <h1 className="font-display text-4xl lg:text-5xl tracking-wide text-white uppercase">{label}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} platformAccent="#C8102E" />
        ))}
      </div>
    </div>
  );
}
