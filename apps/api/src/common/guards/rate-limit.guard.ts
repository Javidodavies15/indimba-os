import { Injectable, CanActivate, ExecutionContext, 
         HttpException, HttpStatus } from '@nestjs/common';
import { RedisService } from '../../modules/redis/redis.service';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(private redis: RedisService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isAuthenticated = !!request.user;
    const identifier = isAuthenticated ? request.user.id : request.ip;
    const limit = isAuthenticated ? 1000 : 100;
    const key = `ratelimit:${identifier}:${Math.floor(Date.now() / 60000)}`;

    const count = await this.redis.incr(key);
    if (count === 1) {
      await this.redis.expire(key, 60);
    }

    if (count > limit) {
      throw new HttpException('Rate limit exceeded', HttpStatus.TOO_MANY_REQUESTS);
    }
    return true;
  }
}
