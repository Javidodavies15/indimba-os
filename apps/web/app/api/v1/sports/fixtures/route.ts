import { NextResponse } from 'next/server';
import { matchesStore } from '@indimba/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  let items = matchesStore.list();
  if (status) items = items.filter((m) => m.status === status);
  items = [...items].sort((a, b) => new Date(a.kickoffAt).getTime() - new Date(b.kickoffAt).getTime());

  const matches = items.map((m) => ({
    id: m.id,
    homeTeam: { name: m.homeTeam.name, shortName: m.homeTeam.shortName, crestUrl: m.homeTeam.crestUrl },
    awayTeam: { name: m.awayTeam.name, shortName: m.awayTeam.shortName, crestUrl: m.awayTeam.crestUrl },
    homeScore: m.homeScore,
    awayScore: m.awayScore,
    minute: m.minute,
    status: m.status,
    league: m.leagueName,
    kickoffAt: m.kickoffAt,
    venue: m.venue,
  }));

  return NextResponse.json({ matches });
}
