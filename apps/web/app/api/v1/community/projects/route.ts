import { NextResponse } from 'next/server';
import { communityProjectsStore } from '@indimba/mock-data';
import { requireAdmin } from '@/lib/mock-api';

export async function GET() {
  return NextResponse.json({ items: communityProjectsStore.list() });
}

export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const body = await request.json();
  const project = {
    id: `project_${body.slug ?? Date.now()}`,
    title: body.title,
    slug: body.slug,
    summary: body.summary ?? '',
    description: body.description ?? '',
    coverUrl: body.coverUrl ?? '',
    organizer: body.organizer ?? '',
    location: body.location ?? '',
    status: body.status ?? 'ongoing',
  };
  communityProjectsStore.create(project);
  return NextResponse.json({ project }, { status: 201 });
}
