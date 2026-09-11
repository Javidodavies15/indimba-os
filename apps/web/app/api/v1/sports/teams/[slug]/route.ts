import { NextResponse } from 'next/server';
import { matchesStore, teamsStore } from '@indimba/mock-data';
import { notFound, requireAdmin } from '@/lib/mock-api';

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const team = teamsStore.get(params.slug, 'slug');
  if (!team) return notFound('Team not found');
  const matches = matchesStore
    .list((m) => m.homeTeam.slug === params.slug || m.awayTeam.slug === params.slug)
    .sort((a, b) => new Date(b.kickoffAt).getTime() - new Date(a.kickoffAt).getTime());
  return NextResponse.json({ team, matches });
}

export async function PATCH(request: Request, { params }: { params: { slug: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const patch = await request.json();
  const updated = teamsStore.update(params.slug, patch, 'slug');
  if (!updated) return notFound('Team not found');
  return NextResponse.json({ team: updated });
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const ok = teamsStore.remove(params.slug, 'slug');
  if (!ok) return notFound('Team not found');
  return NextResponse.json({ ok: true });
}
