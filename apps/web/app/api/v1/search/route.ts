import { NextResponse } from 'next/server';
import { search } from '@indimba/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') ?? '';
  return NextResponse.json({ items: search(q) });
}
