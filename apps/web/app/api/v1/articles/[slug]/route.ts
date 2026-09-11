import { NextResponse } from 'next/server';
import { articlesStore } from '@indimba/mock-data';
import { notFound, requireAdmin } from '@/lib/mock-api';

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const article = articlesStore.get(params.slug, 'slug');
  if (!article) return notFound('Article not found');
  articlesStore.update(params.slug, { viewCount: article.viewCount + 1 } as never, 'slug');
  return NextResponse.json({ article: { ...article, viewCount: article.viewCount + 1 } });
}

export async function PATCH(request: Request, { params }: { params: { slug: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const patch = await request.json();
  const updated = articlesStore.update(params.slug, { ...patch, updatedAt: new Date().toISOString() }, 'slug');
  if (!updated) return notFound('Article not found');
  return NextResponse.json({ article: updated });
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const ok = articlesStore.remove(params.slug, 'slug');
  if (!ok) return notFound('Article not found');
  return NextResponse.json({ ok: true });
}
