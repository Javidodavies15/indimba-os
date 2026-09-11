import { NextResponse } from 'next/server';
import { trendingQueries } from '@indimba/mock-data';

export async function GET() {
  return NextResponse.json({ queries: trendingQueries() });
}
