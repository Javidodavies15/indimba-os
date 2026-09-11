import { NextResponse } from 'next/server';
import { matchesStore } from '@indimba/mock-data';
import { requireAdmin } from '@/lib/mock-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  let items = matchesStore.list();
  if (status) items = items.filter((m) => m.status === status);
  items = [...items].sort((a, b) => new Date(a.kickoffAt).getTime() - new Date(b.kickoffAt).getTime());
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const body = await request.json();
  const match = {
    id: `match_${Date.now()}`,
    leagueId: body.leagueId ?? 'league_super',
    leagueName: body.leagueName ?? 'Zambia Super League',
    homeTeam: body.homeTeam,
    awayTeam: body.awayTeam,
    homeScore: body.homeScore ?? 0,
    awayScore: body.awayScore ?? 0,
    minute: body.minute ?? 0,
    status: body.status ?? 'scheduled',
    kickoffAt: body.kickoffAt ?? new Date().toISOString(),
    venue: body.venue ?? '',
    events: body.events ?? [],
  };
  matchesStore.create(match);
  return NextResponse.json({ match }, { status: 201 });
}
