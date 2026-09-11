import { NextResponse } from 'next/server';
import { leaguesStore } from '@indimba/mock-data';

export async function GET() {
  return NextResponse.json({ items: leaguesStore.list() });
}
