import { NextResponse } from 'next/server';
import { articlesStore, celebritiesStore } from '@indimba/mock-data';
import { notFound } from '@/lib/mock-api';

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const celebrity = celebritiesStore.get(params.slug, 'slug');
  if (!celebrity) return notFound('Celebrity not found');
  const relatedArticles = celebrity.relatedArticleIds
    .map((id) => articlesStore.get(id))
    .filter((a): a is NonNullable<typeof a> => !!a);
  return NextResponse.json({ celebrity, relatedArticles });
}
