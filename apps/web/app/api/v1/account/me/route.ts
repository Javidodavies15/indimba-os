import { NextResponse } from 'next/server';
import { demoUser } from '@indimba/mock-data';

export async function GET() {
  return NextResponse.json({ user: demoUser });
}
