import { NextResponse } from 'next/server';
import { demoUser, notificationsStore } from '@indimba/mock-data';

export async function GET() {
  const items = notificationsStore
    .list((n) => n.userId === demoUser.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const unreadCount = items.filter((n) => !n.isRead).length;
  return NextResponse.json({ items, unreadCount });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  if (body.markAllRead) {
    for (const n of notificationsStore.list((n) => n.userId === demoUser.id)) {
      notificationsStore.update(n.id, { isRead: true });
    }
    return NextResponse.json({ ok: true });
  }
  if (body.id) {
    const updated = notificationsStore.update(body.id, { isRead: true });
    return NextResponse.json({ notification: updated });
  }
  return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
}
