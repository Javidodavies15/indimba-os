import { NextResponse } from 'next/server';
import { SESSION_COOKIE, mockAuthenticatedUser } from '@/lib/session';

export async function POST() {
  const res = NextResponse.json({ user: mockAuthenticatedUser() });
  res.cookies.set(SESSION_COOKIE, '1', { httpOnly: true, sameSite: 'lax', path: '/' });
  return res;
}
