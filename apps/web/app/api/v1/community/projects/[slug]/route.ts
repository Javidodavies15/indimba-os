import { NextResponse } from 'next/server';
import { communityProjectsStore } from '@indimba/mock-data';
import { notFound, requireAdmin } from '@/lib/mock-api';

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const project = communityProjectsStore.get(params.slug, 'slug');
  if (!project) return notFound('Project not found');
  return NextResponse.json({ project });
}

export async function PATCH(request: Request, { params }: { params: { slug: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const patch = await request.json();
  const updated = communityProjectsStore.update(params.slug, patch, 'slug');
  if (!updated) return notFound('Project not found');
  return NextResponse.json({ project: updated });
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const ok = communityProjectsStore.remove(params.slug, 'slug');
  if (!ok) return notFound('Project not found');
  return NextResponse.json({ ok: true });
}
