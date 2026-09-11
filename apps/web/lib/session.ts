import { demoUser, type AppUser } from '@indimba/mock-data';

export const SESSION_COOKIE = 'indimba_session';

export function toPublicUser(user: AppUser) {
  return {
    id: user.id,
    email: user.email,
    phone: null,
    displayName: user.displayName,
    username: user.username,
    role: user.role,
    avatarUrl: user.avatarUrl,
    subscriptionTier: user.subscriptionTier,
    isVerified: user.isVerified,
  };
}

/** Every mock login resolves to the same demo account — there's no real credential check. */
export function mockAuthenticatedUser() {
  return toPublicUser(demoUser);
}
