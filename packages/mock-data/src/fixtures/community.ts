import type { Celebrity, ChessEvent, CommunityProject } from '../types';
import { avatar, img } from './helpers';
import { articles } from './articles';

interface CelebritySeed {
  name: string;
  slug: string;
  profession: string;
  bio: string;
}

const celebritySeeds: CelebritySeed[] = [
  { name: 'Flex Musonda', slug: 'flex-musonda-profile', profession: 'Musician', bio: 'Three-time Indimba Awards winner known for blending Kalindula rhythms with modern trap production.' },
  { name: 'Chama Mwansa', slug: 'chama-mwansa', profession: 'Comedian', bio: 'Stand-up comedian and TV host behind the sold-out "Load Shedding & Chill" tour.' },
  { name: 'Grace Nakazwe', slug: 'grace-nakazwe', profession: 'Boxer', bio: 'Unbeaten professional boxer chasing a Commonwealth title shot.' },
  { name: 'Mulenga Kabwe', slug: 'mulenga-kabwe', profession: 'Filmmaker', bio: 'Director whose short film "Copper Dust" screened at Cannes.' },
  { name: 'Natasha Mwila', slug: 'natasha-mwila', profession: 'Chef', bio: 'Chef reimagining Zambian staples through a modern tasting-menu lens.' },
  { name: 'Mapalo Bwale', slug: 'mapalo-bwale-profile', profession: 'Musician', bio: 'Zed Afrobeat singer-songwriter behind the "Golden Hour" album.' },
];

export const celebrities: Celebrity[] = celebritySeeds.map((c) => ({
  id: `celebrity_${c.slug}`,
  name: c.name,
  slug: c.slug,
  bio: c.bio,
  avatarUrl: avatar(c.slug),
  profession: c.profession,
  relatedArticleIds: articles
    .filter((a) => a.title.includes(c.name.split(' ')[0]))
    .map((a) => a.id)
    .slice(0, 3),
}));

interface ProjectSeed {
  title: string;
  slug: string;
  summary: string;
  description: string;
  organizer: string;
  location: string;
  status: CommunityProject['status'];
}

const projectSeeds: ProjectSeed[] = [
  {
    title: 'Kanyama Solar Reading Room',
    slug: 'kanyama-solar-reading-room',
    summary: 'A shipping container converted into a free, solar-powered library for local children.',
    description: 'Funded entirely through community crowdfunding, the reading room now serves over 200 children a week with a quiet, well-lit space to study — even through load shedding.',
    organizer: 'Lusaka Youth Collective',
    location: 'Kanyama, Lusaka',
    status: 'ongoing',
  },
  {
    title: 'Copperbelt Clean-Up Drive',
    slug: 'copperbelt-cleanup-drive',
    summary: 'A grassroots monthly clean-up movement now active across every Copperbelt town.',
    description: 'What started as a single weekend clean-up in Kitwe has grown into a province-wide movement, clearing over 40 tonnes of waste since launch.',
    organizer: 'Copperbelt Environmental Network',
    location: 'Copperbelt Province',
    status: 'ongoing',
  },
  {
    title: 'Ndola Youth Chess Academy',
    slug: 'ndola-youth-chess-academy',
    summary: 'Free after-school chess coaching for over 300 children across Ndola.',
    description: 'The academy has produced several provincial champions and is now working toward opening a second location in Kitwe.',
    organizer: 'Ndola Chess Club',
    location: 'Ndola',
    status: 'ongoing',
  },
  {
    title: 'Chipata Heritage Mural Project',
    slug: 'chipata-heritage-mural-project',
    summary: 'A completed public art project celebrating Eastern Province heritage.',
    description: 'Local artists painted six large-scale murals across Chipata town centre depicting traditional dress, dance and folklore.',
    organizer: 'Chipata Arts Collective',
    location: 'Chipata',
    status: 'completed',
  },
];

export const communityProjects: CommunityProject[] = projectSeeds.map((p) => ({
  id: `project_${p.slug}`,
  title: p.title,
  slug: p.slug,
  summary: p.summary,
  description: p.description,
  coverUrl: img(p.slug, 1200, 700),
  organizer: p.organizer,
  location: p.location,
  status: p.status,
}));

export const chessEvents: ChessEvent[] = [
  { id: 'chess_1', title: 'Ndola Junior Open', date: new Date(Date.now() + 7 * 86400000).toISOString(), location: 'Ndola Chess Club', format: 'Swiss, 7 rounds', entryFeeZmw: 50 },
  { id: 'chess_2', title: 'Lusaka City Rapid Championship', date: new Date(Date.now() + 18 * 86400000).toISOString(), location: 'Lusaka Community Hall', format: 'Rapid, 15+10', entryFeeZmw: 80 },
  { id: 'chess_3', title: 'Copperbelt Schools Team Cup', date: new Date(Date.now() + 30 * 86400000).toISOString(), location: 'Kitwe Youth Centre', format: 'Team, 4 boards', entryFeeZmw: 0 },
  { id: 'chess_4', title: 'National Chess Master Norm Tournament', date: new Date(Date.now() + 55 * 86400000).toISOString(), location: 'Mulungushi International Conference Centre', format: 'Round Robin, 9 rounds', entryFeeZmw: 150 },
];
