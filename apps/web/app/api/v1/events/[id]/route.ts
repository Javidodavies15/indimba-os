import { NextResponse } from 'next/server';
import { eventsStore } from '@indimba/mock-data';
import { notFound, requireAdmin } from '@/lib/mock-api';

function findEvent(id: string) {
  return eventsStore.get(id) ?? eventsStore.get(id, 'slug');
}

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const event = findEvent(params.id);
  if (!event) return notFound('Event not found');
  return NextResponse.json({ event });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const event = findEvent(params.id);
  if (!event) return notFound('Event not found');
  const patch = await request.json();
  const updated = eventsStore.update(event.id, patch);
  return NextResponse.json({ event: updated });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const event = findEvent(params.id);
  if (!event) return notFound('Event not found');
  eventsStore.remove(event.id);
  return NextResponse.json({ ok: true });
}
