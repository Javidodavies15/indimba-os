import { NextResponse } from 'next/server';
import { articlesStore } from '@indimba/mock-data';
import { requireAdmin } from '@/lib/mock-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get('platform');
  const status = searchParams.get('status');
  const category = searchParams.get('category');
  const isFeatured = searchParams.get('is_featured');
  const isBreaking = searchParams.get('is_breaking');
  const limit = Number(searchParams.get('limit') ?? '20');

  let articles = articlesStore.list();
  if (platform) articles = articles.filter((a) => a.platform === platform);
  if (category) articles = articles.filter((a) => a.category.toLowerCase() === category.toLowerCase());
  if (isFeatured === 'true') articles = articles.filter((a) => a.isFeatured);
  if (isBreaking === 'true') articles = articles.filter((a) => a.isBreaking);
  if (status && status !== 'all') {
    articles = articles.filter((a) => a.status === status);
  } else if (!status) {
    articles = articles.filter((a) => a.status === 'published');
  }

  articles = [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);

  return NextResponse.json({ articles });
}

export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const body = await request.json();
  const now = new Date().toISOString();
  const article = {
    id: `article_${body.slug ?? Date.now()}`,
    title: body.title,
    slug: body.slug,
    excerpt: body.excerpt ?? '',
    body: body.body ?? '',
    featuredImage: body.featuredImage ?? { url: '', alt: body.title ?? '' },
    platform: body.platform,
    category: body.category ?? 'General',
    tags: body.tags ?? [],
    author: body.author ?? { id: 'author_editorial', displayName: 'Indimba Editorial' },
    status: body.status ?? 'draft',
    isBreaking: !!body.isBreaking,
    isFeatured: !!body.isFeatured,
    viewCount: 0,
    readingTime: body.readingTime ?? 3,
    publishedAt: body.status === 'published' ? now : body.publishedAt ?? now,
    createdAt: now,
    updatedAt: now,
  };
  articlesStore.create(article);
  return NextResponse.json({ article }, { status: 201 });
}
