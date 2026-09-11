import { NextResponse } from 'next/server';
import { commentsStore } from '@indimba/mock-data';
import { requireAdmin } from '@/lib/mock-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const articleId = searchParams.get('articleId');
  let items = commentsStore.list();
  if (status) items = items.filter((c) => c.moderationStatus === status);
  if (articleId) items = items.filter((c) => c.articleId === articleId);
  items = [...items].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const body = await request.json();
  const comment = {
    id: `comment_${Date.now()}`,
    articleId: body.articleId,
    userId: body.userId,
    userName: body.userName ?? 'Anonymous',
    parentId: body.parentId,
    body: body.body,
    moderationStatus: 'pending' as const,
    aiCategories: [],
    createdAt: new Date().toISOString(),
  };
  commentsStore.create(comment);
  return NextResponse.json({ comment }, { status: 201 });
}
