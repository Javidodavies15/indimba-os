import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';

async function bootstrapWorker() {
  const app = await NestFactory.createApplicationContext(WorkerModule);
  console.log('⚙️ Worker process started — listening on all queues');
}
bootstrapWorker();
