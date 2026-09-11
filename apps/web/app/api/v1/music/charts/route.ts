import { NextResponse } from 'next/server';
import { getChartEntries } from '@indimba/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit') ?? '50');
  const { entries, weekLabel } = getChartEntries(limit);
  return NextResponse.json({ entries, weekLabel });
}
