import type { FootballLeague, FootballMatch, FootballTeam, MatchEvent, MatchStatus, StandingsRow } from '../types';
import { img } from './helpers';

export const leagues: FootballLeague[] = [
  {
    id: 'league_super',
    name: 'Zambia Super League',
    slug: 'zambia-super-league',
    country: 'Zambia',
    logoUrl: img('zambia-super-league', 200, 200),
    season: '2026/27',
  },
];

interface TeamSeed {
  name: string;
  shortName: string;
  slug: string;
  city: string;
  founded: number;
  stadium: string;
}

const teamSeeds: TeamSeed[] = [
  { name: 'Kopala Warriors FC', shortName: 'KWA', slug: 'kopala-warriors-fc', city: 'Kitwe', founded: 1968, stadium: 'Kopala Grounds' },
  { name: 'Lusaka City FC', shortName: 'LCY', slug: 'lusaka-city-fc', city: 'Lusaka', founded: 1974, stadium: 'Levy Mwanawasa Stadium' },
  { name: 'Copperbelt Stars', shortName: 'CBS', slug: 'copperbelt-stars', city: 'Kitwe', founded: 1963, stadium: 'Arthur Davies Stadium' },
  { name: 'Ndola Rangers', shortName: 'NDR', slug: 'ndola-rangers', city: 'Ndola', founded: 1980, stadium: 'Buteko Stadium' },
  { name: 'Kafue Heroes', shortName: 'KFH', slug: 'kafue-heroes', city: 'Kafue', founded: 1991, stadium: 'Kafue Stadium' },
  { name: 'Mosi Rovers', slug: 'mosi-rovers', shortName: 'MOS', city: 'Livingstone', founded: 1985, stadium: 'Livingstone Sports Stadium' },
  { name: 'Luangwa United', shortName: 'LUU', slug: 'luangwa-united', city: 'Chipata', founded: 1977, stadium: 'Chipata Municipal Stadium' },
  { name: 'Kitwe Panthers', shortName: 'KTP', slug: 'kitwe-panthers', city: 'Kitwe', founded: 1969, stadium: 'Kitwe Stadium' },
];

export const teams: FootballTeam[] = teamSeeds.map((t) => ({
  id: `team_${t.slug}`,
  leagueId: 'league_super',
  name: t.name,
  shortName: t.shortName,
  slug: t.slug,
  crestUrl: img(`${t.slug}-crest`, 200, 200),
  city: t.city,
  founded: t.founded,
  stadium: t.stadium,
}));

function team(slug: string): FootballTeam {
  const found = teams.find((t) => t.slug === slug);
  if (!found) throw new Error(`unknown team ${slug}`);
  return found;
}

function teamRef(slug: string) {
  const t = team(slug);
  return { id: t.id, name: t.name, shortName: t.shortName, crestUrl: t.crestUrl, slug: t.slug };
}

interface MatchSeed {
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  minute: number;
  status: MatchStatus;
  hoursFromNow: number;
  venue: string;
  events: { type: MatchEvent['type']; minute: number; playerName: string; team: 'home' | 'away'; detail?: string }[];
}

const matchSeeds: MatchSeed[] = [
  {
    home: 'lusaka-city-fc',
    away: 'ndola-rangers',
    homeScore: 2,
    awayScore: 1,
    minute: 67,
    status: 'live',
    hoursFromNow: 0,
    venue: 'Levy Mwanawasa Stadium',
    events: [
      { type: 'goal', minute: 12, playerName: 'D. Mwamba', team: 'home' },
      { type: 'yellow_card', minute: 29, playerName: 'K. Zulu', team: 'away' },
      { type: 'goal', minute: 41, playerName: 'B. Chola', team: 'away' },
      { type: 'goal', minute: 58, playerName: 'D. Mwamba', team: 'home', detail: 'Penalty' },
    ],
  },
  {
    home: 'kopala-warriors-fc',
    away: 'copperbelt-stars',
    homeScore: 1,
    awayScore: 1,
    minute: 34,
    status: 'live',
    hoursFromNow: 0,
    venue: 'Kopala Grounds',
    events: [
      { type: 'goal', minute: 9, playerName: 'M. Sinkala', team: 'home' },
      { type: 'goal', minute: 22, playerName: 'J. Mutale', team: 'away' },
    ],
  },
  {
    home: 'kafue-heroes',
    away: 'mosi-rovers',
    homeScore: 0,
    awayScore: 0,
    minute: 0,
    status: 'scheduled',
    hoursFromNow: 26,
    venue: 'Kafue Stadium',
    events: [],
  },
  {
    home: 'luangwa-united',
    away: 'kitwe-panthers',
    homeScore: 0,
    awayScore: 0,
    minute: 0,
    status: 'scheduled',
    hoursFromNow: 50,
    venue: 'Chipata Municipal Stadium',
    events: [],
  },
  {
    home: 'ndola-rangers',
    away: 'kopala-warriors-fc',
    homeScore: 3,
    awayScore: 2,
    minute: 90,
    status: 'finished',
    hoursFromNow: -48,
    venue: 'Buteko Stadium',
    events: [
      { type: 'goal', minute: 5, playerName: 'K. Zulu', team: 'home' },
      { type: 'goal', minute: 18, playerName: 'M. Sinkala', team: 'away' },
      { type: 'goal', minute: 34, playerName: 'K. Zulu', team: 'home' },
      { type: 'red_card', minute: 55, playerName: 'P. Nkole', team: 'away' },
      { type: 'goal', minute: 71, playerName: 'C. Banda', team: 'home' },
      { type: 'goal', minute: 85, playerName: 'M. Sinkala', team: 'away' },
    ],
  },
  {
    home: 'copperbelt-stars',
    away: 'lusaka-city-fc',
    homeScore: 1,
    awayScore: 1,
    minute: 90,
    status: 'finished',
    hoursFromNow: -96,
    venue: 'Arthur Davies Stadium',
    events: [
      { type: 'goal', minute: 40, playerName: 'J. Mutale', team: 'home' },
      { type: 'goal', minute: 77, playerName: 'D. Mwamba', team: 'away' },
    ],
  },
  {
    home: 'mosi-rovers',
    away: 'luangwa-united',
    homeScore: 2,
    awayScore: 0,
    minute: 90,
    status: 'finished',
    hoursFromNow: -120,
    venue: 'Livingstone Sports Stadium',
    events: [
      { type: 'goal', minute: 30, playerName: 'T. Sakala', team: 'home' },
      { type: 'goal', minute: 63, playerName: 'T. Sakala', team: 'home' },
    ],
  },
  {
    home: 'kitwe-panthers',
    away: 'kafue-heroes',
    homeScore: 0,
    awayScore: 2,
    minute: 90,
    status: 'finished',
    hoursFromNow: -144,
    venue: 'Kitwe Stadium',
    events: [
      { type: 'goal', minute: 15, playerName: 'F. Lungu', team: 'away' },
      { type: 'goal', minute: 82, playerName: 'F. Lungu', team: 'away' },
    ],
  },
];

export const matches: FootballMatch[] = matchSeeds.map((m, i) => {
  const kickoffAt = new Date(Date.now() + m.hoursFromNow * 3600000).toISOString();
  const events: MatchEvent[] = m.events.map((e, j) => ({
    id: `matchevent_${i}_${j}`,
    matchId: `match_${i}`,
    type: e.type,
    minute: e.minute,
    playerName: e.playerName,
    team: e.team,
    detail: e.detail,
  }));
  return {
    id: `match_${i}`,
    leagueId: 'league_super',
    leagueName: 'Zambia Super League',
    homeTeam: teamRef(m.home),
    awayTeam: teamRef(m.away),
    homeScore: m.homeScore,
    awayScore: m.awayScore,
    minute: m.minute,
    status: m.status,
    kickoffAt,
    venue: m.venue,
    events,
  };
});

export const standings: StandingsRow[] = (() => {
  const table = new Map<string, StandingsRow>();
  for (const t of teams) {
    table.set(t.slug, {
      position: 0,
      team: teamRef(t.slug),
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0,
      form: [],
    });
  }
  for (const m of matches) {
    if (m.status !== 'finished') continue;
    const home = table.get(m.homeTeam.slug)!;
    const away = table.get(m.awayTeam.slug)!;
    home.played += 1;
    away.played += 1;
    home.goalsFor += m.homeScore;
    home.goalsAgainst += m.awayScore;
    away.goalsFor += m.awayScore;
    away.goalsAgainst += m.homeScore;
    if (m.homeScore > m.awayScore) {
      home.won += 1;
      home.points += 3;
      home.form.push('W');
      away.lost += 1;
      away.form.push('L');
    } else if (m.homeScore < m.awayScore) {
      away.won += 1;
      away.points += 3;
      away.form.push('W');
      home.lost += 1;
      home.form.push('L');
    } else {
      home.drawn += 1;
      away.drawn += 1;
      home.points += 1;
      away.points += 1;
      home.form.push('D');
      away.form.push('D');
    }
  }
  const rows = [...table.values()].sort((a, b) => b.points - a.points || b.goalsFor - b.goalsAgainst - (a.goalsFor - a.goalsAgainst));
  rows.forEach((r, i) => {
    r.position = i + 1;
  });
  return rows;
})();
