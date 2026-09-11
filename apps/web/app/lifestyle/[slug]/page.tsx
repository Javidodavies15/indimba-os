import { notFound } from 'next/navigation';
import { articlesStore } from '@indimba/mock-data';
import { ArticleDetail } from '@/components/ArticleDetail';

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = articlesStore.get(params.slug, 'slug');
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default function LifestyleArticlePage({ params }: { params: { slug: string } }) {
  const article = articlesStore.get(params.slug, 'slug');
  if (!article || article.platform !== 'lifestyle') notFound();
  return <ArticleDetail article={article} accent="#DB2777" />;
}
