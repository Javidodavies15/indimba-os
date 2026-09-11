import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { SESSION_COOKIE, mockAuthenticatedUser } from '@/lib/session';

export async function GET() {
  const hasSession = cookies().get(SESSION_COOKIE)?.value === '1';
  return NextResponse.json({ user: hasSession ? mockAuthenticatedUser() : null });
}
