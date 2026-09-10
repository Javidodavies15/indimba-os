import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private redis: RedisService,
  ) {}

  async register(dto: any) {
    if (!dto.email && !dto.phone) {
      throw new ConflictException('Email or phone number required');
    }

    const existing = await this.prisma.user.findFirst({
      where: { OR: [{ email: dto.email }, { phone: dto.phone }] },
    });
    if (existing) throw new ConflictException('Account already exists');

    const passwordHash = dto.password ? await bcrypt.hash(dto.password, 12) : null;

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        phone: dto.phone,
        username: dto.username || `user_${crypto.randomBytes(4).toString('hex')}`,
        displayName: dto.displayName || 'Indimba User',
        passwordHash,
        role: 'READER',
      },
    });

    const tokens = await this.generateTokenPair(user.id);
    return { user: this.sanitizeUser(user), ...tokens };
  }

  async requestOtp(phone: string) {
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    await this.redis.set(`otp:${phone}`, otp, 'EX', 300);
    // TODO: Integrate Africa's Talking SMS
    console.log(`OTP for ${phone}: ${otp}`);
    return { message: 'OTP sent', expiresIn: 300 };
  }

  async verifyOtp(phone: string, code: string) {
    const stored = await this.redis.get(`otp:${phone}`);
    if (!stored || stored !== code) {
      throw new UnauthorizedException('Invalid or expired code');
    }
    await this.redis.del(`otp:${phone}`);

    let user = await this.prisma.user.findUnique({ where: { phone } });
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          phone,
          username: `user_${crypto.randomBytes(4).toString('hex')}`,
          displayName: 'Indimba User',
          isVerified: true,
        },
      });
    }

    const tokens = await this.generateTokenPair(user.id);
    return { user: this.sanitizeUser(user), ...tokens };
  }

  async generateTokenPair(userId: string) {
    const accessToken = this.jwt.sign({ sub: userId }, { expiresIn: '15m' });
    const refreshToken = crypto.randomBytes(40).toString('hex');
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    await this.prisma.userSession.create({
      data: {
        userId,
        tokenHash: refreshTokenHash,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    return { accessToken, refreshToken };
  }

  async refreshAccessToken(oldRefreshToken: string) {
    const sessions = await this.prisma.userSession.findMany({
      where: { expiresAt: { gt: new Date() } },
    });

    let matchedSession = null;
    for (const session of sessions) {
      if (await bcrypt.compare(oldRefreshToken, session.tokenHash)) {
        matchedSession = session;
        break;
      }
    }

    if (!matchedSession) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.prisma.userSession.delete({ where: { id: matchedSession.id } });
    return this.generateTokenPair(matchedSession.userId);
  }

  private sanitizeUser(user: any) {
    const { passwordHash, mfaSecret, ...safe } = user;
    return safe;
  }
}
