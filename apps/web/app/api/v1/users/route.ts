import { NextResponse } from 'next/server';
import { usersStore } from '@indimba/mock-data';
import { requireAdmin } from '@/lib/mock-api';

export async function GET(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  return NextResponse.json({ items: usersStore.list() });
}
