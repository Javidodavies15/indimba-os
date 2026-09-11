import { NextResponse } from 'next/server';

export async function POST() {
  // Mock: pretends to send an SMS OTP. Any code is accepted at verify time.
  return NextResponse.json({ ok: true });
}
