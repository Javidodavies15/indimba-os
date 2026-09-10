import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './modules/redis/redis.module';
import { ChartsProcessor } from './jobs/charts.processor';
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
  ],
  providers: [
    ChartsProcessor,
    RoyaltyImportProcessor,
    PaymentPollProcessor,
    PodcastTranscriptionProcessor,
    EmailProcessor,
    SearchIndexProcessor,
    NotificationProcessor,
  ],
})
export class WorkerModule {}
