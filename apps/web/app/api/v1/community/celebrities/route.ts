import { NextResponse } from 'next/server';
import { celebritiesStore } from '@indimba/mock-data';

export async function GET() {
  return NextResponse.json({ items: celebritiesStore.list() });
}
