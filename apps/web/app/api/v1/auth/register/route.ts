import { NextResponse } from 'next/server';
import { SESSION_COOKIE, mockAuthenticatedUser } from '@/lib/session';

export async function POST() {
  // Mock: doesn't actually create a new account, just signs you in as the demo user.
  const res = NextResponse.json({ user: mockAuthenticatedUser() }, { status: 201 });
  res.cookies.set(SESSION_COOKIE, '1', { httpOnly: true, sameSite: 'lax', path: '/' });
  return res;
}
