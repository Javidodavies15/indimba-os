import { Injectable, CanActivate, ExecutionContext, 
         BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RedisService } from '../../modules/redis/redis.service';
import { IDEMPOTENT_KEY } from '../decorators/idempotent.decorator';

@Injectable()
export class IdempotencyGuard implements CanActivate {
  constructor(private reflector: Reflector, private redis: RedisService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isIdempotent = this.reflector.get<boolean>(
      IDEMPOTENT_KEY, context.getHandler()
    );
    if (!isIdempotent) return true;

    const request = context.switchToHttp().getRequest();
    const idempotencyKey = request.headers['idempotency-key'];

    if (!idempotencyKey) {
      throw new BadRequestException('Idempotency-Key header required');
    }

    const existing = await this.redis.get(`idempotency:${idempotencyKey}`);
    if (existing) {
      request.idempotentCachedResponse = JSON.parse(existing);
    }
    request.idempotencyKey = idempotencyKey;
    return true;
  }
}
