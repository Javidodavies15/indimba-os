import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { MusicModule } from './modules/music/music.module';
import { SportsModule } from './modules/sports/sports.module';
import { EventsModule } from './modules/events/events.module';
import { PodcastsModule } from './modules/podcasts/podcasts.module';
import { StoreModule } from './modules/store/store.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { SearchModule } from './modules/search/search.module';
import { AiModule } from './modules/ai/ai.module';
import { RedisModule } from './modules/redis/redis.module';
import { StorageModule } from './modules/storage/storage.module';
import { HealthModule } from './modules/health/health.module';
import { AuditModule } from './modules/audit/audit.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

import { ChartsProcessor } from './jobs/charts.processor';
import { ChartsScheduler } from './jobs/charts.scheduler';
import { RoyaltyImportProcessor } from './jobs/royalty-import.processor';
import { PaymentPollProcessor } from './jobs/payment-poll.processor';
import { PodcastTranscriptionProcessor } from './jobs/podcast-transcription.processor';
import { EmailProcessor } from './jobs/email.processor';
import { SearchIndexProcessor } from './jobs/search-index.processor';
import { NotificationProcessor } from './jobs/notification.processor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD || undefined,
      },
    }),
    BullModule.registerQueue(
      { name: 'charts-queue' },
      { name: 'royalty-queue' },
      { name: 'payments-queue' },
      { name: 'notifications-queue' },
      { name: 'search-index-queue' },
      { name: 'podcast-processing-queue' },
      { name: 'email-queue' },
    ),
    PrismaModule,
    RedisModule,
    AuthModule,
    UsersModule,
    ArticlesModule,
    MusicModule,
    SportsModule,
    EventsModule,
    PodcastsModule,
    StoreModule,
    PaymentsModule,
    NotificationsModule,
    SearchModule,
    AiModule,
    StorageModule,
    HealthModule,
    AuditModule,
    AnalyticsModule,
  ],
  providers: [
    ChartsProcessor,
    ChartsScheduler,
    RoyaltyImportProcessor,
    PaymentPollProcessor,
    PodcastTranscriptionProcessor,
    EmailProcessor,
    SearchIndexProcessor,
    NotificationProcessor,
  ],
})
export class AppModule {}
