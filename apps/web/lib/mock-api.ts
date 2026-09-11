import { NextResponse } from 'next/server';

/**
 * Gates mutating mock-API routes behind a shared secret. When ADMIN_API_TOKEN
 * isn't set (plain local dev with no .env), the routes stay open for convenience.
 */
export function requireAdmin(request: Request): NextResponse | null {
  const expected = process.env.ADMIN_API_TOKEN;
  if (!expected) return null;
  const token = request.headers.get('x-admin-token');
  if (token !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export function notFound(message = 'Not found') {
  return NextResponse.json({ error: message }, { status: 404 });
}
