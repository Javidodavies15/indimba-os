import type { ChartEntry, MusicAlbum, MusicArtist, MusicTrack } from '../types';
import { img, avatar } from './helpers';

interface ArtistSeed {
  stageName: string;
  slug: string;
  realName: string;
  bio: string;
  hometown: string;
  genres: string[];
  monthlyListeners: number;
  isVerified: boolean;
}

const artistSeeds: ArtistSeed[] = [
  {
    stageName: 'Flex Musonda',
    slug: 'flex-musonda',
    realName: 'Kaonga Musonda',
    bio: 'Lusaka-born hip-hop veteran blending Kalindula rhythms with modern trap production. Three-time Indimba Awards winner.',
    hometown: 'Lusaka',
    genres: ['Hip-Hop', 'Kalindula'],
    monthlyListeners: 412000,
    isVerified: true,
  },
  {
    stageName: 'Zed Element',
    slug: 'zed-element',
    realName: 'Bupe Chanda',
    bio: 'Rapper and producer known for razor-sharp Bemba wordplay and genre-hopping beats.',
    hometown: 'Kitwe',
    genres: ['Hip-Hop', 'Afrobeat'],
    monthlyListeners: 298000,
    isVerified: true,
  },
  {
    stageName: 'Mapalo Bwale',
    slug: 'mapalo-bwale',
    realName: 'Mapalo Bwale',
    bio: 'Zed Afrobeat singer-songwriter whose smooth vocals have defined the sound of a new Zambian pop generation.',
    hometown: 'Lusaka',
    genres: ['Afrobeat', 'R&B'],
    monthlyListeners: 356000,
    isVerified: true,
  },
  {
    stageName: 'Isaac Mumba',
    slug: 'isaac-mumba',
    realName: 'Isaac Mumba',
    bio: 'Gospel powerhouse whose anthems fill stadiums and Sunday services alike.',
    hometown: 'Livingstone',
    genres: ['Gospel'],
    monthlyListeners: 187000,
    isVerified: true,
  },
  {
    stageName: 'DJ Kalu',
    slug: 'dj-kalu',
    realName: 'Kalulu Mwansa',
    bio: 'Amapiano selector and producer credited with bringing log-drum bass to Lusaka nightlife.',
    hometown: 'Ndola',
    genres: ['Amapiano', 'House'],
    monthlyListeners: 224000,
    isVerified: false,
  },
  {
    stageName: 'Temwani',
    slug: 'temwani',
    realName: 'Temwani Zimba',
    bio: 'Singer known for reworking traditional Nyanja folk melodies into contemporary R&B.',
    hometown: 'Chipata',
    genres: ['R&B', 'Folk'],
    monthlyListeners: 96000,
    isVerified: false,
  },
  {
    stageName: 'Kopala Spitta',
    slug: 'kopala-spitta',
    realName: 'Chomba Kangwa',
    bio: 'Copperbelt rap collective frontman with an unmistakable fast-flow delivery.',
    hometown: 'Kitwe',
    genres: ['Hip-Hop'],
    monthlyListeners: 143000,
    isVerified: false,
  },
  {
    stageName: 'Nsofu',
    slug: 'nsofu',
    realName: 'Nsofu Banda',
    bio: 'Producer-turned-vocalist pushing Zambian electronic music onto the festival circuit.',
    hometown: 'Lusaka',
    genres: ['Electronic', 'Amapiano'],
    monthlyListeners: 71000,
    isVerified: false,
  },
];

export const artists: MusicArtist[] = artistSeeds.map((a) => ({
  id: `artist_${a.slug}`,
  stageName: a.stageName,
  realName: a.realName,
  slug: a.slug,
  bio: a.bio,
  hometown: a.hometown,
  genres: a.genres,
  avatarUrl: avatar(a.slug),
  coverUrl: img(`${a.slug}-cover`, 1600, 500),
  socialLinks: { instagram: `https://instagram.com/${a.slug}`, twitter: `https://twitter.com/${a.slug}` },
  isVerified: a.isVerified,
  monthlyListeners: a.monthlyListeners,
  createdAt: new Date(Date.now() - 400 * 86400000).toISOString(),
}));

function artist(slug: string): MusicArtist {
  const found = artists.find((a) => a.slug === slug);
  if (!found) throw new Error(`unknown artist ${slug}`);
  return found;
}

interface AlbumSeed {
  title: string;
  slug: string;
  artistSlug: string;
  daysAgo: number;
  description: string;
}

const albumSeeds: AlbumSeed[] = [
  { title: 'Mwana Wa Zambia', slug: 'mwana-wa-zambia', artistSlug: 'flex-musonda', daysAgo: 180, description: 'The album that redefined Zed hip-hop for a new decade.' },
  { title: 'Element of Surprise', slug: 'element-of-surprise', artistSlug: 'zed-element', daysAgo: 240, description: 'A genre-bending tape recorded almost entirely in one week.' },
  { title: 'Golden Hour', slug: 'golden-hour', artistSlug: 'mapalo-bwale', daysAgo: 90, description: 'Warm, sun-soaked Afrobeat built for Sunday drives.' },
  { title: 'Grace Over Everything', slug: 'grace-over-everything', artistSlug: 'isaac-mumba', daysAgo: 300, description: 'A gospel record built for stadium worship nights.' },
  { title: 'Log Drum Diaries', slug: 'log-drum-diaries', artistSlug: 'dj-kalu', daysAgo: 60, description: 'Twelve club-ready Amapiano cuts.' },
];

export const albums: MusicAlbum[] = albumSeeds.map((al) => {
  const a = artist(al.artistSlug);
  return {
    id: `album_${al.slug}`,
    artistId: a.id,
    artistName: a.stageName,
    artistSlug: a.slug,
    title: al.title,
    slug: al.slug,
    coverUrl: img(al.slug),
    releaseDate: new Date(Date.now() - al.daysAgo * 86400000).toISOString(),
    description: al.description,
    trackIds: [],
  };
});

interface TrackSeed {
  title: string;
  slug: string;
  artistSlug: string;
  albumSlug?: string;
  duration: number;
  daysAgo: number;
  streamsTotal: number;
  streamsWeekly: number;
  genres: string[];
  isExplicit?: boolean;
}

const trackSeeds: TrackSeed[] = [
  { title: 'Zambia Ni Yesu', slug: 'zambia-ni-yesu', artistSlug: 'isaac-mumba', albumSlug: 'grace-over-everything', duration: 234, daysAgo: 20, streamsTotal: 892000, streamsWeekly: 41000, genres: ['Gospel'] },
  { title: 'Copperbelt Nights', slug: 'copperbelt-nights', artistSlug: 'zed-element', albumSlug: 'element-of-surprise', duration: 198, daysAgo: 15, streamsTotal: 764000, streamsWeekly: 38500, genres: ['Hip-Hop'], isExplicit: true },
  { title: 'Golden Hour (Title Track)', slug: 'golden-hour-title-track', artistSlug: 'mapalo-bwale', albumSlug: 'golden-hour', duration: 212, daysAgo: 12, streamsTotal: 701000, streamsWeekly: 36200, genres: ['Afrobeat'] },
  { title: 'Mwana Wa Zambia (Intro)', slug: 'mwana-wa-zambia-intro', artistSlug: 'flex-musonda', albumSlug: 'mwana-wa-zambia', duration: 176, daysAgo: 180, streamsTotal: 1240000, streamsWeekly: 29800, genres: ['Hip-Hop'] },
  { title: 'Log Drum Diaries Pt. 1', slug: 'log-drum-diaries-pt-1', artistSlug: 'dj-kalu', albumSlug: 'log-drum-diaries', duration: 305, daysAgo: 8, streamsTotal: 512000, streamsWeekly: 33900, genres: ['Amapiano'] },
  { title: 'Kabulonga Sunset', slug: 'kabulonga-sunset', artistSlug: 'temwani', duration: 189, daysAgo: 25, streamsTotal: 214000, streamsWeekly: 18700, genres: ['R&B'] },
  { title: 'Fast Lane', slug: 'fast-lane', artistSlug: 'kopala-spitta', duration: 167, daysAgo: 5, streamsTotal: 156000, streamsWeekly: 22100, genres: ['Hip-Hop'] },
  { title: 'Signal', slug: 'signal', artistSlug: 'nsofu', duration: 241, daysAgo: 30, streamsTotal: 98000, streamsWeekly: 11400, genres: ['Electronic'] },
  { title: 'Ni Wewe', slug: 'ni-wewe', artistSlug: 'mapalo-bwale', duration: 203, daysAgo: 60, streamsTotal: 645000, streamsWeekly: 20800, genres: ['Afrobeat'] },
  { title: 'Chibolya Anthem', slug: 'chibolya-anthem', artistSlug: 'flex-musonda', duration: 221, daysAgo: 90, streamsTotal: 980000, streamsWeekly: 19500, genres: ['Hip-Hop'], isExplicit: true },
  { title: 'Praise Break', slug: 'praise-break', artistSlug: 'isaac-mumba', duration: 256, daysAgo: 45, streamsTotal: 421000, streamsWeekly: 16200, genres: ['Gospel'] },
  { title: 'Ndola Groove', slug: 'ndola-groove', artistSlug: 'dj-kalu', duration: 289, daysAgo: 3, streamsTotal: 88000, streamsWeekly: 15600, genres: ['Amapiano'] },
  { title: 'Late Night Call', slug: 'late-night-call', artistSlug: 'temwani', duration: 178, daysAgo: 70, streamsTotal: 176000, streamsWeekly: 9800, genres: ['R&B'] },
  { title: 'Element Freestyle', slug: 'element-freestyle', artistSlug: 'zed-element', duration: 145, daysAgo: 4, streamsTotal: 201000, streamsWeekly: 24700, genres: ['Hip-Hop'] },
  { title: 'Kopala to the World', slug: 'kopala-to-the-world', artistSlug: 'kopala-spitta', duration: 210, daysAgo: 50, streamsTotal: 134000, streamsWeekly: 8100, genres: ['Hip-Hop'] },
];

export const tracks: MusicTrack[] = trackSeeds.map((t) => {
  const a = artist(t.artistSlug);
  const album = t.albumSlug ? albums.find((al) => al.slug === t.albumSlug) : undefined;
  return {
    id: `track_${t.slug}`,
    artistId: a.id,
    artistName: a.stageName,
    artistSlug: a.slug,
    title: t.title,
    slug: t.slug,
    albumId: album?.id,
    albumTitle: album?.title,
    duration: t.duration,
    coverUrl: album ? album.coverUrl : img(t.slug),
    genres: t.genres,
    isExplicit: !!t.isExplicit,
    zambiaStreamsTotal: t.streamsTotal,
    zambiaStreamsWeekly: t.streamsWeekly,
    streamingLinks: {
      spotify: `https://open.spotify.com/track/${t.slug}`,
      youtube: `https://youtube.com/watch?v=${t.slug}`,
      boomplay: `https://boomplay.com/songs/${t.slug}`,
    },
    createdAt: new Date(Date.now() - t.daysAgo * 86400000).toISOString(),
  };
});

for (const album of albums) {
  album.trackIds = tracks.filter((t) => t.albumId === album.id).map((t) => t.id);
}

const chartOrder = [...tracks].sort((a, b) => b.zambiaStreamsWeekly - a.zambiaStreamsWeekly);

export const weekLabel = 'Week of Sep 8, 2026';

export const chartEntries: ChartEntry[] = chartOrder.map((t, i) => ({
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
