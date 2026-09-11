import { NextResponse } from 'next/server';
import { commentsStore } from '@indimba/mock-data';
import { notFound, requireAdmin } from '@/lib/mock-api';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const patch = await request.json();
  const updated = commentsStore.update(params.id, patch);
  if (!updated) return notFound('Comment not found');
  return NextResponse.json({ comment: updated });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const ok = commentsStore.remove(params.id);
  if (!ok) return notFound('Comment not found');
  return NextResponse.json({ ok: true });
}
