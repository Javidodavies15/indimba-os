export type Platform =
  | 'entertainment'
  | 'sports'
  | 'music'
  | 'events'
  | 'podcasts'
  | 'community'
  | 'business'
  | 'lifestyle';

export type ArticleStatus = 'draft' | 'review' | 'published' | 'archived';
export type ModerationStatus = 'pending' | 'approved' | 'rejected' | 'review_queue';
export type MatchStatus = 'scheduled' | 'live' | 'halftime' | 'finished' | 'postponed' | 'cancelled';
export type MatchEventType = 'goal' | 'own_goal' | 'yellow_card' | 'red_card' | 'substitution' | 'penalty';
export type EventStatus = 'draft' | 'published' | 'sold_out' | 'cancelled' | 'completed';
export type PodcastStatus = 'draft' | 'published' | 'archived';
export type EpisodeStatus = 'draft' | 'published' | 'archived';
export type BusinessTier = 'free' | 'standard' | 'premium' | 'enterprise';
export type ListingStatus = 'pending' | 'active' | 'suspended';
export type UserRole = 'reader' | 'artist' | 'editor' | 'admin' | 'super_admin';

export interface Author {
  id: string;
  displayName: string;
  avatarUrl?: string;
}

export interface FeaturedImage {
  url: string;
  alt: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  featuredImage: FeaturedImage;
  platform: Platform;
  category: string;
  tags: string[];
  author: Author;
  status: ArticleStatus;
  isBreaking: boolean;
  isFeatured: boolean;
  viewCount: number;
  readingTime: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  parentId?: string;
  body: string;
  moderationStatus: ModerationStatus;
  aiToxicityScore?: number;
  aiCategories: string[];
  createdAt: string;
}

export interface MusicArtist {
  id: string;
  stageName: string;
  realName?: string;
  slug: string;
  bio: string;
  hometown: string;
  genres: string[];
  avatarUrl: string;
  coverUrl: string;
  socialLinks: { instagram?: string; twitter?: string; facebook?: string };
  isVerified: boolean;
  monthlyListeners: number;
  createdAt: string;
}

export interface MusicAlbum {
  id: string;
  artistId: string;
  artistName: string;
  artistSlug: string;
  title: string;
  slug: string;
  coverUrl: string;
  releaseDate: string;
  description: string;
  trackIds: string[];
}

export interface MusicTrack {
  id: string;
  artistId: string;
  artistName: string;
  artistSlug: string;
  title: string;
  slug: string;
  albumId?: string;
  albumTitle?: string;
  duration: number;
  audioUrl?: string;
  coverUrl: string;
  genres: string[];
  isExplicit: boolean;
  spotifyId?: string;
  youtubeId?: string;
  zambiaStreamsTotal: number;
  zambiaStreamsWeekly: number;
  streamingLinks: { spotify?: string; youtube?: string; boomplay?: string; apple?: string };
  createdAt: string;
}

export interface ChartEntry {
  position: number;
  previousPosition: number | null;
  peakPosition: number;
  weeksOnChart: number;
  track: {
    id: string;
    title: string;
    slug: string;
    coverUrl: string;
    artistName: string;
    artistSlug: string;
    totalStreams: number;
    streamBreakdown: Record<string, number>;
  };
}

export interface FootballLeague {
  id: string;
  name: string;
  slug: string;
  country: string;
  logoUrl: string;
  season: string;
}

export interface FootballTeam {
  id: string;
  leagueId: string;
  name: string;
  shortName: string;
  slug: string;
  crestUrl: string;
  city: string;
  founded: number;
  stadium: string;
}

export interface MatchEvent {
  id: string;
  matchId: string;
  type: MatchEventType;
  minute: number;
  playerName: string;
  team: 'home' | 'away';
  detail?: string;
}

export interface FootballMatch {
  id: string;
  leagueId: string;
  leagueName: string;
  homeTeam: { id: string; name: string; shortName: string; crestUrl: string; slug: string };
  awayTeam: { id: string; name: string; shortName: string; crestUrl: string; slug: string };
  homeScore: number;
  awayScore: number;
  minute: number;
  status: MatchStatus;
  kickoffAt: string;
  venue: string;
  events: MatchEvent[];
}

export interface StandingsRow {
  position: number;
  team: { id: string; name: string; shortName: string; crestUrl: string; slug: string };
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
}

export interface TicketTier {
  id: string;
  eventId: string;
  name: string;
  priceZmwCents: number;
  capacity: number;
  sold: number;
  description: string;
}

export interface EventVenue {
  name: string;
  address: string;
  city: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  venue: EventVenue;
  startsAt: string;
  endsAt?: string;
  status: EventStatus;
  coverUrl: string;
  category: string;
  ticketTiers: TicketTier[];
}

export interface PodcastEpisode {
  id: string;
  podcastId: string;
  podcastSlug: string;
  podcastTitle: string;
  title: string;
  slug: string;
  description: string;
  audioUrl: string;
  coverUrl: string;
  duration: number;
  chapters: { time: number; title: string }[];
  status: EpisodeStatus;
  publishedAt: string;
}

export interface Podcast {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverUrl: string;
  category: string;
  language: string;
  hostName: string;
  status: PodcastStatus;
  episodeCount: number;
}

export interface StoreProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceZmwCents: number;
  images: string[];
  category: string;
  inventory: number;
  isActive: boolean;
}

export interface BusinessListing {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  contact: { phone?: string; email?: string; website?: string };
  location: { city: string; address?: string };
  images: string[];
  tier: BusinessTier;
  isVerified: boolean;
  status: ListingStatus;
}

export interface Celebrity {
  id: string;
  name: string;
  slug: string;
  bio: string;
  avatarUrl: string;
  profession: string;
  relatedArticleIds: string[];
}

export interface CommunityProject {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  coverUrl: string;
  organizer: string;
  location: string;
  status: 'ongoing' | 'completed' | 'upcoming';
}

export interface ChessEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  format: string;
  entryFeeZmw: number;
}

export interface AppUser {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  role: UserRole;
  subscriptionTier: 'free' | 'plus' | 'premium';
  isVerified: boolean;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'comment_reply' | 'article_published' | 'match_reminder' | 'event_reminder' | 'system';
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  href?: string;
}

export interface Order {
  id: string;
  userId: string;
  kind: 'ticket' | 'store';
  refTitle: string;
  quantity: number;
  totalZmwCents: number;
  status: 'pending' | 'paid' | 'fulfilled' | 'cancelled';
  createdAt: string;
}

export interface SearchResultItem {
  id: string;
  type: 'article' | 'track' | 'event' | 'artist' | 'podcast' | 'product';
  title: string;
  subtitle: string;
  url: string;
}
