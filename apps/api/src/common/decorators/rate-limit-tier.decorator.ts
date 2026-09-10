import { SetMetadata } from '@nestjs/common';

export const RATE_TIERS = {
  auth_sensitive:    { points: 5,   duration: 60 },
  payment:           { points: 10,  duration: 60 },
  comment:           { points: 5,   duration: 60 },
  standard_public:   { points: 100, duration: 60 },
  standard_auth:     { points: 1000, duration: 60 },
};

export const RateLimitTier = (tier: keyof typeof RATE_TIERS) =>
  SetMetadata('rate-tier', tier);
