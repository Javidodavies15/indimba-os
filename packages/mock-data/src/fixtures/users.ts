import type { AppUser, Notification, Order } from '../types';
import { avatar } from './helpers';
import { events } from './events';
import { products } from './store';

interface UserSeed {
  email: string;
  username: string;
  displayName: string;
  role: AppUser['role'];
  subscriptionTier: AppUser['subscriptionTier'];
  isVerified: boolean;
}

const userSeeds: UserSeed[] = [
  { email: 'demo@indimba.com', username: 'demo_reader', displayName: 'Demo Reader', role: 'reader', subscriptionTier: 'plus', isVerified: true },
  { email: 'flex.musonda@indimba.com', username: 'flex_musonda', displayName: 'Flex Musonda', role: 'artist', subscriptionTier: 'premium', isVerified: true },
  { email: 'editor@indimba.com', username: 'indimba_editor', displayName: 'Indimba Editorial', role: 'editor', subscriptionTier: 'premium', isVerified: true },
  { email: 'admin@indimba.com', username: 'indimba_admin', displayName: 'Site Admin', role: 'admin', subscriptionTier: 'premium', isVerified: true },
];

export const users: AppUser[] = userSeeds.map((u) => ({
  id: `user_${u.username}`,
  email: u.email,
  username: u.username,
  displayName: u.displayName,
  avatarUrl: avatar(u.username),
  role: u.role,
  subscriptionTier: u.subscriptionTier,
  isVerified: u.isVerified,
  createdAt: new Date(Date.now() - 500 * 86400000).toISOString(),
}));

/** The signed-in user the mock session/account/studio pages act as. */
export const demoUser = users[0];
export const demoArtistUser = users[1];

const notificationSeeds: Omit<Notification, 'id' | 'userId' | 'createdAt'>[] = [
  { type: 'match_reminder', title: 'Kick-off in 30 minutes', body: 'Lusaka City FC vs Ndola Rangers starts soon.', isRead: false, href: '/sports/matches/match_0' },
  { type: 'comment_reply', title: 'New reply to your comment', body: 'Bwalya Mumba replied to your comment on "Flex Musonda Announces Deluxe Album".', isRead: false, href: '/entertainment/flex-musonda-mwana-wa-zambia-deluxe' },
  { type: 'event_reminder', title: 'Tickets going fast', body: 'Kopala Tour: Live in Kitwe is 68% sold out.', isRead: false, href: '/events/event_kopala-tour-live-in-kitwe' },
  { type: 'article_published', title: 'New from Indimba Music', body: 'Zambia Streams Report: Amapiano Overtakes Kalindula for First Time.', isRead: true, href: '/music/zambia-streams-amapiano-overtakes-kalindula' },
  { type: 'system', title: 'Welcome to Indimba OS', body: 'Complete your profile to personalise your feed.', isRead: true, href: '/account' },
];

export const notifications: Notification[] = notificationSeeds.map((n, i) => ({
  ...n,
  id: `notification_${i}`,
  userId: demoUser.id,
  createdAt: new Date(Date.now() - i * 6 * 3600000).toISOString(),
}));

export const orders: Order[] = [
  {
    id: 'order_1',
    userId: demoUser.id,
    kind: 'ticket',
    refTitle: `${events[0].title} — General`,
    quantity: 2,
    totalZmwCents: events[0].ticketTiers[0].priceZmwCents * 2,
    status: 'paid',
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: 'order_2',
    userId: demoUser.id,
    kind: 'store',
    refTitle: products[0].name,
    quantity: 1,
    totalZmwCents: products[0].priceZmwCents,
    status: 'fulfilled',
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
  },
  {
    id: 'order_3',
    userId: demoUser.id,
    kind: 'store',
    refTitle: products[2].name,
    quantity: 1,
    totalZmwCents: products[2].priceZmwCents,
    status: 'pending',
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
];
