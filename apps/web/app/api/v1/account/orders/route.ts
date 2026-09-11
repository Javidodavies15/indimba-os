import { NextResponse } from 'next/server';
import { demoUser, ordersStore } from '@indimba/mock-data';

export async function GET() {
  const items = ordersStore
    .list((o) => o.userId === demoUser.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return NextResponse.json({ items });
}
