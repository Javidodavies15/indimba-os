import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { validateEnv } from './config/env.validation';
import * as Sentry from '@sentry/node';

async function bootstrap() {
  // Validate environment before anything else
  validateEnv();

  // Sentry initialization
  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      integrations: [Sentry.httpIntegration()],
      beforeSend(event) {
        if (event.request?.headers) {
          delete event.request.headers['authorization'];
          delete event.request.headers['cookie'];
        }
        return event;
      },
    });
  }

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
    rawBody: true,
  });

  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https://*.r2.dev', 'https://*.cloudflare.com'],
        connectSrc: ["'self'", 'wss://*.indimba.com'],
      },
    },
  }));

  app.enableCors({
    origin: [
      'https://indimba.com',
      'https://admin.indimba.com',
      /\.indimba\.com$/,
      ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
    ],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT || 4000);
  console.log(`🚀 Indimba API running on port ${process.env.PORT || 4000}`);
}
bootstrap();
