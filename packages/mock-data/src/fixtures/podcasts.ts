import type { Podcast, PodcastEpisode } from '../types';
import { img } from './helpers';

interface PodcastSeed {
  title: string;
  slug: string;
  description: string;
  category: string;
  hostName: string;
}

const podcastSeeds: PodcastSeed[] = [
  {
    title: 'Kopala Conversations',
    slug: 'kopala-conversations',
    description: 'Long-form interviews with the artists, producers and cultural figures shaping modern Zambia.',
    category: 'Culture',
    hostName: 'Natasha Banda',
  },
  {
    title: 'Chipolopolo Weekly',
    slug: 'chipolopolo-weekly',
    description: 'A weekly breakdown of Zambian football, from the Super League to the national team.',
    category: 'Sports',
    hostName: 'Kunda Phiri',
  },
  {
    title: 'Kwacha & Sense',
    slug: 'kwacha-and-sense',
    description: 'Business and economy news explained simply, for everyday Zambians.',
    category: 'Business',
    hostName: 'Chanda Mwape',
  },
  {
    title: 'Amapiano Hour',
    slug: 'amapiano-hour',
    description: 'A weekly mix and interview show tracking Zambia\'s Amapiano scene.',
    category: 'Music',
    hostName: 'DJ Kalu',
  },
];

export const podcasts: Podcast[] = podcastSeeds.map((p) => ({
  id: `podcast_${p.slug}`,
  title: p.title,
  slug: p.slug,
  description: p.description,
  coverUrl: img(p.slug),
  category: p.category,
  language: 'en',
  hostName: p.hostName,
  status: 'published',
  episodeCount: 0,
}));

interface EpisodeSeed {
  podcastSlug: string;
  title: string;
  slug: string;
  description: string;
  duration: number;
  daysAgo: number;
  chapters: { time: number; title: string }[];
}

const episodeSeeds: EpisodeSeed[] = [
  {
    podcastSlug: 'kopala-conversations',
    title: 'Building a Homegrown Animation Studio, with Kalemba Studios',
    slug: 'building-a-homegrown-animation-studio',
    description: 'The Kalemba Studios founders on bootstrapping Zambia\'s first animation house.',
    duration: 2760,
    daysAgo: 3,
    chapters: [{ time: 0, title: 'Intro' }, { time: 420, title: 'Getting started' }, { time: 1500, title: 'First contracts' }, { time: 2200, title: 'What\'s next' }],
  },
  {
    podcastSlug: 'kopala-conversations',
    title: 'Inside Chibolya\'s Music Scene',
    slug: 'inside-chibolyas-music-scene',
    description: 'A deep dive into the compound that keeps producing Zambian hitmakers.',
    duration: 3120,
    daysAgo: 10,
    chapters: [{ time: 0, title: 'Intro' }, { time: 600, title: 'The early days' }, { time: 1800, title: 'Today\'s sound' }],
  },
  {
    podcastSlug: 'chipolopolo-weekly',
    title: 'AFCON Qualifiers Recap + Squad Predictions',
    slug: 'afcon-qualifiers-recap-squad-predictions',
    description: 'Breaking down the latest qualifier win and who should start next matchday.',
    duration: 1980,
    daysAgo: 2,
    chapters: [{ time: 0, title: 'Match recap' }, { time: 900, title: 'Player ratings' }, { time: 1500, title: 'Next matchday preview' }],
  },
  {
    podcastSlug: 'chipolopolo-weekly',
    title: 'Super League Midweek Roundup',
    slug: 'super-league-midweek-roundup',
    description: 'All the goals and drama from this week\'s Super League fixtures.',
    duration: 1740,
    daysAgo: 9,
    chapters: [{ time: 0, title: 'Top results' }, { time: 800, title: 'Table talk' }],
  },
  {
    podcastSlug: 'kwacha-and-sense',
    title: 'Why the Kwacha Is Rallying',
    slug: 'why-the-kwacha-is-rallying',
    description: 'Explaining copper prices, currency strength, and what it means for your wallet.',
    duration: 2100,
    daysAgo: 6,
    chapters: [{ time: 0, title: 'Copper 101' }, { time: 700, title: 'Currency impact' }, { time: 1500, title: 'What to watch next' }],
  },
  {
    podcastSlug: 'amapiano-hour',
    title: 'Log Drums Live: Studio Session',
    slug: 'log-drums-live-studio-session',
    description: 'A live mix straight from the studio plus a chat about the genre\'s roots.',
    duration: 3600,
    daysAgo: 1,
    chapters: [{ time: 0, title: 'Mix opens' }, { time: 1200, title: 'Interview break' }, { time: 2400, title: 'Mix continues' }],
  },
];

export const episodes: PodcastEpisode[] = episodeSeeds.map((e) => {
  const p = podcasts.find((pod) => pod.slug === e.podcastSlug)!;
  const publishedAt = new Date(Date.now() - e.daysAgo * 86400000).toISOString();
  return {
    id: `episode_${e.slug}`,
    podcastId: p.id,
    podcastSlug: p.slug,
    podcastTitle: p.title,
    title: e.title,
    slug: e.slug,
    description: e.description,
    audioUrl: `https://cdn.indimba.com/podcasts/${e.slug}.mp3`,
    coverUrl: p.coverUrl,
    duration: e.duration,
    chapters: e.chapters,
    status: 'published',
    publishedAt,
  };
});

for (const p of podcasts) {
  p.episodeCount = episodes.filter((e) => e.podcastSlug === p.slug).length;
}
