import { NextResponse } from 'next/server';
import { matchesStore } from '@indimba/mock-data';
import { notFound, requireAdmin } from '@/lib/mock-api';

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const match = matchesStore.get(params.id);
  if (!match) return notFound('Match not found');
  return NextResponse.json({ match });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const patch = await request.json();
  const updated = matchesStore.update(params.id, patch);
  if (!updated) return notFound('Match not found');
  return NextResponse.json({ match: updated });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const ok = matchesStore.remove(params.id);
  if (!ok) return notFound('Match not found');
  return NextResponse.json({ ok: true });
}
