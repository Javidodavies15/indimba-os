import { NextResponse } from 'next/server';
import { teamsStore } from '@indimba/mock-data';
import { requireAdmin } from '@/lib/mock-api';

export async function GET() {
  return NextResponse.json({ items: teamsStore.list() });
}

export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const body = await request.json();
  const team = {
    id: `team_${body.slug ?? Date.now()}`,
    leagueId: body.leagueId ?? 'league_super',
    name: body.name,
    shortName: body.shortName,
    slug: body.slug,
    crestUrl: body.crestUrl ?? '',
    city: body.city ?? '',
    founded: body.founded ?? new Date().getFullYear(),
    stadium: body.stadium ?? '',
  };
  teamsStore.create(team);
  return NextResponse.json({ team }, { status: 201 });
}
