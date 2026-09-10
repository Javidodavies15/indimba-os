# Indimba OS

**The Operating System for African Digital Culture**

> Africa's Story. Africa's Stage.

---

## What is Indimba OS?

Indimba OS is a unified digital platform for African culture — entertainment, sports, music, podcasts, events, and community. Built as a modern monorepo with enterprise-grade architecture, it serves as the digital infrastructure powering Africa's cultural renaissance.

## Architecture

```
indimba-os/
├── apps/
│   ├── web/          # Next.js 15 — Public-facing platform (all 20+ pages)
│   ├── api/          # NestJS — REST API, WebSocket gateway, job processors
│   └── admin/        # Next.js — Moderation queue, CMS, analytics dashboard
├── packages/
│   ├── ui/           # Design system — 8 production components, tokens, a11y
│   ├── auth/         # Shared auth hooks, session context, socket provider
│   └── config/       # Shared ESLint, Tailwind, TypeScript configurations
├── infrastructure/
│   ├── docker/       # Docker Compose dev stack + production Dockerfiles
│   └── load-tests/   # k6 load testing scripts
├── e2e/              # Playwright end-to-end tests
└── .github/
    └── workflows/    # CI/CD — lint, typecheck, test, build, deploy
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 18, Tailwind CSS, TanStack Query |
| Backend | NestJS 10, Prisma ORM, PostgreSQL 16, Redis 7 |
| Search | Meilisearch |
| Queue | BullMQ (Redis-based) |
| Real-time | Socket.io |
| Storage | Cloudflare R2 (S3-compatible, zero egress) |
| Payments | Stripe + MTN MoMo + Airtel Money |
| AI | Anthropic Claude + OpenAI Whisper |
| DevOps | Docker, GitHub Actions, Turborepo |

## Quick Start

### Prerequisites
- Node.js 20+
- pnpm 9+
- Docker & Docker Compose

### 1. Clone & Install
```bash
git clone <repo-url> indimba-os
cd indimba-os
pnpm install
```

### 2. Environment Setup
```bash
cp .env.example .env
# Edit .env with your values (see .env.example for all required vars)
```

### 3. Start Development Stack
```bash
# Start PostgreSQL, Redis, Meilisearch
docker compose -f infrastructure/docker/docker-compose.dev.yml up -d

# Generate Prisma client & run migrations
pnpm db:generate
pnpm db:migrate:dev

# Seed test data
pnpm db:seed

# Start all apps in development mode
pnpm dev
```

### 4. Access the Apps
| App | URL |
|-----|-----|
| Web Platform | http://localhost:3000 |
| API Server | http://localhost:4000/api |
| Prisma Studio | http://localhost:5555 |
| Meilisearch | http://localhost:7700 |

## Key Features Implemented

### ✅ Phase 1-5: Complete
- **Design System** — Dark-first UI with African identity (red/gold), 8 production components
- **Frontend** — 20+ pages with Next.js App Router, ISR, OG image generation
- **Auth** — Email/password + Phone OTP + Google OAuth, JWT sessions, MFA for privileged roles
- **Database** — 30+ Prisma models covering all domains (users, articles, music, sports, events, podcasts, payments, royalties, audit)
- **API Foundation** — NestJS with guards, interceptors, decorators, field encryption

### 🔄 Phase 6-11: Architecture Complete, Implementation In Progress
- **Charts Engine** — Database schema ready, job processor scaffolded
- **Live Scores** — WebSocket gateway ready, match events schema ready
- **Payments** — MTN MoMo polling architecture, Stripe webhook handler scaffolded
- **AI** — Moderation pipeline design, transcription job processor scaffolded
- **DevOps** — Docker, CI/CD workflows, multi-environment strategy

## Project Structure

### Frontend (`apps/web/`)
- **Pages**: Home, Entertainment, Sports, Music, Events, Podcasts, Community, Business, Lifestyle, Store, Studio (creator dashboard), Account, Search
- **Components**: TopNav (with platform switcher + live scores), CommandPalette (universal search), ArticleCard, UserMenu, NotificationBell, Footer
- **Features**: ISR caching, mobile-first responsive, dark/light mode, accessibility (WCAG 2.1 AA)

### Backend (`apps/api/`)
- **Modules**: Auth, Users, Articles, Music, Sports, Events, Podcasts, Store, Payments, Search, AI, Notifications, Analytics, Storage, Health, Audit
- **Jobs**: Charts computation, royalty import, payment polling, podcast transcription, email, search indexing
- **Security**: JWT auth, RBAC, rate limiting, field encryption, idempotency, audit logging

### Design System (`packages/ui/`)
- **Components**: Button (8 variants), ArticleCard (4 variants), LiveScoreWidget, BreakingNewsTicker, SmartPlayer, ChartsTable, PodcastPlayer
- **Tokens**: Colors, typography, spacing, shadows, border-radius — all as CSS custom properties
- **Accessibility**: Focus rings, skip links, reduced motion support, screen reader optimized

## Database Schema Highlights

| Domain | Key Models |
|--------|-----------|
| Users | `User`, `UserSession` |
| Content | `Article`, `Tag`, `Comment`, `ModerationOverride` |
| Music | `MusicArtist`, `MusicTrack`, `MusicAlbum`, `ArtistAgreement`, `TrackLicensingStatus` |
| Charts | `ChartsDataRaw`, `ChartsWeekly`, `ChartsCityData`, `ArtistCityAffinity`, `PlayEvent` |
| Sports | `FootballLeague`, `FootballTeam`, `FootballMatch`, `MatchEvent` |
| Events | `Event`, `TicketTier`, `TicketPurchase` |
| Podcasts | `Podcast`, `PodcastEpisode` |
| Payments | `RoyaltyEarning`, `PayoutDetailChange` |
| Security | `AuditLog`, `Notification` |

## Development Commands

```bash
# Install dependencies
pnpm install

# Development (all apps)
pnpm dev

# Lint & typecheck
pnpm lint
pnpm typecheck

# Testing
pnpm test:unit          # Vitest unit tests
pnpm test:integration   # Integration tests with test DB
pnpm test:e2e           # Playwright E2E tests
pnpm test:load          # k6 load tests

# Database
pnpm db:generate        # Generate Prisma client
pnpm db:migrate:dev     # Create migration
pnpm db:migrate:deploy  # Deploy migrations
pnpm db:seed            # Seed test data
pnpm db:studio          # Open Prisma Studio

# Docker
docker compose -f infrastructure/docker/docker-compose.dev.yml up -d
docker compose -f infrastructure/docker/docker-compose.dev.yml down

# Production build
pnpm build
```

## Environment Variables

See `.env.example` for the complete list. Critical variables:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection |
| `JWT_ACCESS_SECRET` | JWT signing (min 64 chars) |
| `JWT_REFRESH_SECRET` | Refresh token signing |
| `FIELD_ENCRYPTION_KEY` | AES-256-GCM field encryption (64 hex chars) |
| `R2_*` | Cloudflare R2 storage |
| `MTN_*` | MTN MoMo payment integration |
| `ANTHROPIC_API_KEY` | AI content moderation |
| `MEILISEARCH_*` | Search engine |

## Contributing

1. Create a feature branch from `develop`
2. Make changes with tests
3. Run `pnpm lint && pnpm typecheck && pnpm test`
4. Open PR against `develop`
5. After review, merge to `main` for production deployment

## License

UNLICENSED — Proprietary software. All rights reserved by Indimba Digital.

---

**Built with ❤️ for Africa.**
