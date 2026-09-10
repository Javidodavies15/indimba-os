import { PrismaClient, UserRole, Platform, ArticleStatus, MatchStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ─── Users ──────────────────────────────────────
  const adminPassword = await bcrypt.hash('AdminPass123!', 12);
  const readerPassword = await bcrypt.hash('ReaderPass123!', 12);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@indimba.com',
      username: 'admin',
      displayName: 'Indimba Admin',
      passwordHash: adminPassword,
      role: UserRole.SUPER_ADMIN,
      isVerified: true,
    },
  });

  const editor = await prisma.user.create({
    data: {
      email: 'editor@indimba.com',
      username: 'editor',
      displayName: 'Chief Editor',
      passwordHash: adminPassword,
      role: UserRole.EDITOR,
      isVerified: true,
    },
  });

  const reader = await prisma.user.create({
    data: {
      email: 'reader@indimba.com',
      username: 'reader',
      displayName: 'Test Reader',
      passwordHash: readerPassword,
      role: UserRole.READER,
      isVerified: true,
    },
  });

  // ─── Tags ───────────────────────────────────────
  const tags = await Promise.all([
    prisma.tag.create({ data: { name: 'Chipolopolo', slug: 'chipolopolo' } }),
    prisma.tag.create({ data: { name: 'Zambia Super League', slug: 'zambia-super-league' } }),
    prisma.tag.create({ data: { name: 'Afrobeats', slug: 'afrobeats' }),
    prisma.tag.create({ data: { name: 'Copperbelt', slug: 'copperbelt' } }),
    prisma.tag.create({ data: { name: 'Kopala', slug: 'kopala' } }),
    prisma.tag.create({ data: { name: 'Celebrity', slug: 'celebrity' } }),
  ]);

  // ─── Articles ───────────────────────────────────
  const articles = await Promise.all([
    prisma.article.create({
      data: {
        title: 'Chipolopolo Ready for AFCON Qualifiers',
        slug: 'chipolopolo-ready-afcon-qualifiers',
        excerpt: 'The Zambia national team prepares for crucial AFCON qualifying matches with a renewed squad.',
        body: 'The Zambia national football team, affectionately known as the Chipolopolo, is gearing up for a series of crucial AFCON qualifying matches...',
        platform: Platform.SPORTS,
        category: 'National Team',
        authorId: editor.id,
        status: ArticleStatus.PUBLISHED,
        isFeatured: true,
        viewCount: 12450,
        readingTime: 5,
        publishedAt: new Date(),
        tags: { connect: [{ id: tags[0].id }, { id: tags[1].id }] },
      },
    }),
    prisma.article.create({
      data: {
        title: 'Kopala Tour 2026: Four Cities, One Experience',
        slug: 'kopala-tour-2026-four-cities',
        excerpt: 'Indimba announces the biggest music tour in Zambian history, spanning four major cities.',
        body: 'Indimba Digital is proud to announce the Kopala Tour 2026, set to be the largest music event series in Zambian history...',
        platform: Platform.EVENTS,
        category: 'Music Events',
        authorId: editor.id,
        status: ArticleStatus.PUBLISHED,
        isFeatured: true,
        viewCount: 8930,
        readingTime: 4,
        publishedAt: new Date(Date.now() - 86400000),
        tags: { connect: [{ id: tags[4].id }] },
      },
    }),
    prisma.article.create({
      data: {
        title: 'Breaking: Power Dynamos Sign New Striker',
        slug: 'power-dynamos-sign-new-striker',
        excerpt: 'Power Dynamos FC has completed the signing of a promising young striker from the Copperbelt.',
        body: 'In a major transfer move, Power Dynamos FC has announced the signing of 21-year-old striker...',
        platform: Platform.SPORTS,
        category: 'Transfers',
        authorId: editor.id,
        status: ArticleStatus.PUBLISHED,
        isBreaking: true,
        viewCount: 5620,
        readingTime: 3,
        publishedAt: new Date(Date.now() - 3600000),
        tags: { connect: [{ id: tags[1].id }] },
      },
    }),
    prisma.article.create({
      data: {
        title: 'The Rise of Zambian Afrobeats',
        slug: 'rise-of-zambian-afrobeats',
        excerpt: 'How Zambian artists are blending local sounds with Afrobeats to create a unique genre.',
        body: 'The Zambian music scene is experiencing a renaissance as artists blend traditional Kalindula rhythms with modern Afrobeats production...',
        platform: Platform.MUSIC,
        category: 'Music News',
        authorId: editor.id,
        status: ArticleStatus.PUBLISHED,
        viewCount: 7800,
        readingTime: 6,
        publishedAt: new Date(Date.now() - 172800000),
        tags: { connect: [{ id: tags[2].id }] },
      },
    }),
  ]);

  // ─── Music Artists ──────────────────────────────
  const artist = await prisma.musicArtist.create({
    data: {
      userId: reader.id,
      stageName: 'Macky 2',
      slug: 'macky-2',
      bio: 'Multi-award winning Zambian hip-hop artist and Kopala Swag founder.',
      hometown: 'Kitwe',
      genres: ['Hip-Hop', 'Afrobeats'],
      isVerified: true,
    },
  });

  // ─── Music Tracks ───────────────────────────────
  const track = await prisma.musicTrack.create({
    data: {
      artistId: artist.id,
      title: 'Kopala Swag Anthem',
      slug: 'kopala-swag-anthem',
      genres: ['Hip-Hop'],
      isExplicit: false,
      isPublished: true,
      zambiaStreamsTotal: 45000,
      zambiaStreamsWeekly: 3200,
    },
  });

  // ─── Football League ────────────────────────────
  const league = await prisma.footballLeague.create({
    data: {
      name: 'MTN Super League',
      slug: 'mtn-super-league',
      country: 'Zambia',
      season: '2024/25',
    },
  });

  // ─── Football Teams ─────────────────────────────
  const teams = await Promise.all([
    prisma.footballTeam.create({
      data: {
        leagueId: league.id,
        name: 'Power Dynamos',
        shortName: 'PD',
        slug: 'power-dynamos',
        city: 'Kitwe',
        stadium: 'Arthur Davies Stadium',
      },
    }),
    prisma.footballTeam.create({
      data: {
        leagueId: league.id,
        name: 'ZESCO United',
        shortName: 'ZU',
        slug: 'zesco-united',
        city: 'Ndola',
        stadium: 'Levy Mwanawasa Stadium',
      },
    }),
  ]);

  // ─── Football Match ─────────────────────────────
  const match = await prisma.footballMatch.create({
    data: {
      leagueId: league.id,
      homeTeamId: teams[0].id,
      awayTeamId: teams[1].id,
      homeScore: 2,
      awayScore: 1,
      minute: 78,
      status: MatchStatus.LIVE,
      kickoffAt: new Date(Date.now() - 4680000),
      venue: 'Arthur Davies Stadium',
    },
  });

  // ─── Match Events ───────────────────────────────
  await prisma.matchEvent.createMany({
    data: [
      { matchId: match.id, type: 'GOAL', minute: 12, playerName: 'J. Banda', detail: 'Power Dynamos' },
      { matchId: match.id, type: 'GOAL', minute: 34, playerName: 'C. Musonda', detail: 'ZESCO United' },
      { matchId: match.id, type: 'YELLOW_CARD', minute: 56, playerName: 'M. Phiri' },
      { matchId: match.id, type: 'GOAL', minute: 67, playerName: 'J. Banda', detail: 'Power Dynamos' },
    ],
  });

  // ─── Event ──────────────────────────────────────
  const event = await prisma.event.create({
    data: {
      title: 'Kopala Tour 2026 — Lusaka Edition',
      slug: 'kopala-tour-2026-lusaka',
      description: 'The biggest music event in Zambia comes to Lusaka.',
      venue: { name: 'Heroes Stadium', city: 'Lusaka', address: 'Great East Road' },
      startsAt: new Date('2026-08-15T18:00:00Z'),
      status: 'PUBLISHED',
    },
  });

  // ─── Ticket Tiers ───────────────────────────────
  await prisma.ticketTier.createMany({
    data: [
      { eventId: event.id, name: 'VIP', price: 50000, capacity: 200, sold: 45 },
      { eventId: event.id, name: 'General', price: 20000, capacity: 800, sold: 320 },
      { eventId: event.id, name: 'Early Bird', price: 15000, capacity: 300, sold: 300 },
    ],
  });

  // ─── Podcast ────────────────────────────────────
  const podcast = await prisma.podcast.create({
    data: {
      title: 'The Indimba Podcast',
      slug: 'the-indimba-podcast',
      description: 'Deep conversations with Zambian artists, athletes, and creators.',
      category: 'Culture',
      status: 'PUBLISHED',
    },
  });

  await prisma.podcastEpisode.create({
    data: {
      podcastId: podcast.id,
      title: 'Episode 1: The State of Zambian Music',
      slug: 'episode-1-state-of-zambian-music',
      description: 'We sit down with industry insiders to discuss the current landscape.',
      audioUrl: 'https://media.indimba.com/podcasts/ep1.mp3',
      duration: 3600,
      status: 'PUBLISHED',
      publishedAt: new Date(),
    },
  });

  // ─── Business Listings ──────────────────────────
  await prisma.businessListing.create({
    data: {
      name: 'Mwenye Beer Garden',
      slug: 'mwenye-beer-garden',
      category: 'Food & Drink',
      description: 'The best local beer garden in Kitwe.',
      contact: { phone: '+260971234567', email: 'info@mwenye.com' },
      location: { city: 'Kitwe', address: 'Cairo Road' },
      tier: 'PREMIUM',
      status: 'ACTIVE',
    },
  });

  console.log('✅ Seed complete!');
  console.log(`   Users: ${await prisma.user.count()}`);
  console.log(`   Articles: ${await prisma.article.count()}`);
  console.log(`   Artists: ${await prisma.musicArtist.count()}`);
  console.log(`   Matches: ${await prisma.footballMatch.count()}`);
  console.log(`   Events: ${await prisma.event.count()}`);
  console.log(`   Podcasts: ${await prisma.podcast.count()}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
