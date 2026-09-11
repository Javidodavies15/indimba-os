import { NextResponse } from 'next/server';
import { getStandings } from '@indimba/mock-data';

export async function GET() {
  return NextResponse.json({ standings: getStandings() });
}
