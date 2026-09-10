import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MfaService {
  constructor(private prisma: PrismaService) {}

  async enforceMfa(userId: string, role: string) {
    const privilegedRoles = ['EDITOR', 'ADMIN', 'SUPER_ADMIN'];
    if (!privilegedRoles.includes(role)) return true;

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.mfaEnabled) {
      throw new ForbiddenException('Two-factor authentication required for editorial accounts');
    }
    return true;
  }
}
