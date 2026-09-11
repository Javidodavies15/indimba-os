import { NextResponse } from 'next/server';
import { chessEventsStore } from '@indimba/mock-data';

export async function GET() {
  return NextResponse.json({ items: chessEventsStore.list() });
}
