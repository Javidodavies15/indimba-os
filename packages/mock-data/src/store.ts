import fs from 'node:fs';
import path from 'node:path';
import type {
  AppUser,
  Article,
  BusinessListing,
  Celebrity,
  ChartEntry,
  ChessEvent,
  Comment,
  CommunityProject,
  Event,
  FootballLeague,
  FootballMatch,
  FootballTeam,
  MusicAlbum,
  MusicArtist,
  MusicTrack,
  Notification,
  Order,
  Podcast,
  PodcastEpisode,
  StandingsRow,
  StoreProduct,
} from './types';
import * as fixtures from './fixtures';

interface Db {
  articles: Article[];
  comments: Comment[];
  artists: MusicArtist[];
  albums: MusicAlbum[];
  tracks: MusicTrack[];
  leagues: FootballLeague[];
  teams: FootballTeam[];
  matches: FootballMatch[];
  events: Event[];
  podcasts: Podcast[];
  episodes: PodcastEpisode[];
  products: StoreProduct[];
  listings: BusinessListing[];
  celebrities: Celebrity[];
  communityProjects: CommunityProject[];
  chessEvents: ChessEvent[];
  users: AppUser[];
  notifications: Notification[];
  orders: Order[];
}

const DB_PATH = path.join(process.cwd(), '.mock-db.json');

function seedDb(): Db {
  return JSON.parse(
    JSON.stringify({
      articles: fixtures.articles,
      comments: fixtures.comments,
      artists: fixtures.artists,
      albums: fixtures.albums,
      tracks: fixtures.tracks,
      leagues: fixtures.leagues,
      teams: fixtures.teams,
      matches: fixtures.matches,
      events: fixtures.events,
      podcasts: fixtures.podcasts,
      episodes: fixtures.episodes,
      products: fixtures.products,
      listings: fixtures.listings,
      celebrities: fixtures.celebrities,
      communityProjects: fixtures.communityProjects,
      chessEvents: fixtures.chessEvents,
      users: fixtures.users,
      notifications: fixtures.notifications,
      orders: fixtures.orders,
    }),
  );
}

let cache: Db | null = null;

function persist(): void {
  if (!cache) return;
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(cache, null, 2), 'utf-8');
  } catch {
    // Read-only filesystem (e.g. deployed serverless): stays in-memory for this invocation.
  }
}

function load(): Db {
  if (cache) return cache;
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    cache = JSON.parse(raw) as Db;
  } catch {
    cache = seedDb();
    persist();
  }
  return cache;
}

/** Drops the current DB (memory + disk) and reseeds from fixtures. */
export function resetDb(): void {
  cache = seedDb();
  persist();
}

function fieldValue<T extends object>(item: T, field: keyof T): unknown {
  return (item as Record<string, unknown>)[field as string];
}

function collection<T extends object>(key: keyof Db, idField: keyof T = 'id' as keyof T) {
  return {
    list(predicate?: (item: T) => boolean): T[] {
      const items = load()[key] as unknown as T[];
      return predicate ? items.filter(predicate) : items;
    },
    get(value: string, field: keyof T = idField): T | undefined {
      const items = load()[key] as unknown as T[];
      return items.find((item) => fieldValue(item, field) === value);
    },
    create(item: T): T {
      const db = load();
      (db[key] as unknown as T[]).push(item);
      persist();
      return item;
    },
    update(value: string, patch: Partial<T>, field: keyof T = idField): T | undefined {
      const db = load();
      const items = db[key] as unknown as T[];
      const idx = items.findIndex((item) => fieldValue(item, field) === value);
      if (idx === -1) return undefined;
      items[idx] = { ...items[idx], ...patch };
      persist();
      return items[idx];
    },
    remove(value: string, field: keyof T = idField): boolean {
      const db = load();
      const items = db[key] as unknown as T[];
      const idx = items.findIndex((item) => fieldValue(item, field) === value);
      if (idx === -1) return false;
      items.splice(idx, 1);
      persist();
      return true;
    },
  };
}

export const articlesStore = collection<Article>('articles');
export const commentsStore = collection<Comment>('comments');
export const artistsStore = collection<MusicArtist>('artists');
export const albumsStore = collection<MusicAlbum>('albums');
export const tracksStore = collection<MusicTrack>('tracks');
export const leaguesStore = collection<FootballLeague>('leagues');
export const teamsStore = collection<FootballTeam>('teams');
export const matchesStore = collection<FootballMatch>('matches');
export const eventsStore = collection<Event>('events');
export const podcastsStore = collection<Podcast>('podcasts');
export const episodesStore = collection<PodcastEpisode>('episodes');
export const productsStore = collection<StoreProduct>('products');
export const listingsStore = collection<BusinessListing>('listings');
export const celebritiesStore = collection<Celebrity>('celebrities');
export const communityProjectsStore = collection<CommunityProject>('communityProjects');
export const chessEventsStore = collection<ChessEvent>('chessEvents');
export const usersStore = collection<AppUser>('users');
export const notificationsStore = collection<Notification>('notifications');
export const ordersStore = collection<Order>('orders');

export function getChartEntries(limit?: number): { entries: ChartEntry[]; weekLabel: string } {
  const tracks = [...load().tracks].sort((a, b) => b.zambiaStreamsWeekly - a.zambiaStreamsWeekly);
  const ranked = limit ? tracks.slice(0, limit) : tracks;
  const entries: ChartEntry[] = ranked.map((t, i) => ({
    position: i + 1,
    previousPosition: i === 0 ? null : i % 4 === 0 ? i : i + (i % 2 === 0 ? 1 : -1),
    peakPosition: Math.max(1, i - (i % 3)),
    weeksOnChart: 3 + (i % 10),
    track: {
      id: t.id,
      title: t.title,
      slug: t.slug,
      coverUrl: t.coverUrl,
      artistName: t.artistName,
      artistSlug: t.artistSlug,
      totalStreams: t.zambiaStreamsTotal,
      streamBreakdown: {
        spotify: Math.round(t.zambiaStreamsTotal * 0.42),
        boomplay: Math.round(t.zambiaStreamsTotal * 0.33),
        youtube: Math.round(t.zambiaStreamsTotal * 0.25),
      },
    },
  }));
  return { entries, weekLabel: fixtures.chartWeekLabel };
}

export function getStandings(): StandingsRow[] {
  const { matches, teams } = load();
  const table = new Map<string, StandingsRow>();
  for (const t of teams) {
    table.set(t.slug, {
      position: 0,
      team: { id: t.id, name: t.name, shortName: t.shortName, crestUrl: t.crestUrl, slug: t.slug },
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
    const home = table.get(m.homeTeam.slug);
    const away = table.get(m.awayTeam.slug);
    if (!home || !away) continue;
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
  const rows = [...table.values()].sort(
    (a, b) => b.points - a.points || b.goalsFor - b.goalsAgainst - (a.goalsFor - a.goalsAgainst),
  );
  rows.forEach((r, i) => {
    r.position = i + 1;
  });
  return rows;
}

export function getLiveMatches(): FootballMatch[] {
  return load().matches.filter((m) => m.status === 'live' || m.status === 'halftime');
}

export function search(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const db = load();
  const results: { id: string; type: string; title: string; subtitle: string; url: string }[] = [];
  for (const a of db.articles) {
    if (a.title.toLowerCase().includes(q)) {
      results.push({ id: a.id, type: 'article', title: a.title, subtitle: a.category, url: `/${a.platform}/${a.slug}` });
    }
  }
  for (const t of db.tracks) {
    if (t.title.toLowerCase().includes(q) || t.artistName.toLowerCase().includes(q)) {
      results.push({ id: t.id, type: 'track', title: t.title, subtitle: t.artistName, url: `/music/tracks/${t.slug}` });
    }
  }
  for (const artist of db.artists) {
    if (artist.stageName.toLowerCase().includes(q)) {
      results.push({ id: artist.id, type: 'artist', title: artist.stageName, subtitle: 'Artist', url: `/music/artists/${artist.slug}` });
    }
  }
  for (const e of db.events) {
    if (e.title.toLowerCase().includes(q)) {
      results.push({ id: e.id, type: 'event', title: e.title, subtitle: e.venue.city, url: `/events/${e.id}` });
    }
  }
  for (const p of db.podcasts) {
    if (p.title.toLowerCase().includes(q)) {
      results.push({ id: p.id, type: 'podcast', title: p.title, subtitle: p.category, url: `/podcasts/${p.slug}` });
    }
  }
  for (const p of db.products) {
    if (p.name.toLowerCase().includes(q)) {
      results.push({ id: p.id, type: 'product', title: p.name, subtitle: p.category, url: `/store/${p.slug}` });
    }
  }
  return results.slice(0, 20);
}

export function trendingQueries(): string[] {
  return ['Kopala Tour', 'Chipolopolo', 'Amapiano', 'Flex Musonda', 'Zambia Super League standings'];
}
