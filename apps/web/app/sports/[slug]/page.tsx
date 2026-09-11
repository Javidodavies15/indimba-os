import { notFound } from 'next/navigation';
import { articlesStore } from '@indimba/mock-data';
import { ArticleDetail } from '@/components/ArticleDetail';

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = articlesStore.get(params.slug, 'slug');
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default function SportsArticlePage({ params }: { params: { slug: string } }) {
  const article = articlesStore.get(params.slug, 'slug');
  if (!article || article.platform !== 'sports') notFound();
  return <ArticleDetail article={article} accent="#1D4ED8" />;
}
