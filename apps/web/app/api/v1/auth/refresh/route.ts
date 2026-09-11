import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { SESSION_COOKIE, mockAuthenticatedUser } from '@/lib/session';

export async function POST() {
  const hasSession = cookies().get(SESSION_COOKIE)?.value === '1';
  if (!hasSession) return NextResponse.json({ error: 'No session' }, { status: 401 });
  return NextResponse.json({ user: mockAuthenticatedUser() });
}
