import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SessionSecurityService {
  constructor(private prisma: PrismaService) {}

  async checkLoginAnomaly(userId: string, deviceInfo: any, ip: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!['EDITOR', 'ADMIN', 'SUPER_ADMIN'].includes(user?.role || '')) return;

    const recentSessions = await this.prisma.userSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    const knownIps = recentSessions.map(s => (s.deviceInfo as any)?.ip).filter(Boolean);
    if (!knownIps.includes(ip)) {
      // TODO: Send new login alert
      console.log(`New login location for privileged user ${userId}: ${ip}`);
    }
  }
}
