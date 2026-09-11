import type { Comment } from '../types';
import { articles } from './articles';
import { users } from './users';

interface CommentSeed {
  articleIndex: number;
  userIndex: number;
  body: string;
  moderationStatus: Comment['moderationStatus'];
  aiToxicityScore?: number;
  aiCategories?: string[];
  hoursAgo: number;
}

const seeds: CommentSeed[] = [
  { articleIndex: 0, userIndex: 0, body: 'This is huge news, been waiting for this album all year!', moderationStatus: 'approved', hoursAgo: 20 },
  { articleIndex: 0, userIndex: 2, body: 'Features from Zim and SA artists? Say less.', moderationStatus: 'approved', hoursAgo: 18 },
  { articleIndex: 5, userIndex: 1, body: 'What a game! That header in the 88th minute had me on my feet.', moderationStatus: 'approved', hoursAgo: 40 },
  { articleIndex: 5, userIndex: 3, body: 'This is bots posting fake engagement, ignore this ref link: definitely-not-spam.example', moderationStatus: 'pending', aiToxicityScore: 0.12, aiCategories: ['spam'], hoursAgo: 30 },
  { articleIndex: 10, userIndex: 0, body: 'Honestly this take is garbage and whoever wrote it should be ashamed, total clown behavior', moderationStatus: 'review_queue', aiToxicityScore: 0.71, aiCategories: ['toxicity', 'insult'], hoursAgo: 12 },
  { articleIndex: 15, userIndex: 2, body: 'Kanyama needed this so badly, proud of the volunteers behind this.', moderationStatus: 'approved', hoursAgo: 50 },
  { articleIndex: 18, userIndex: 1, body: 'Finally some real investment in fintech outside Lusaka CBD.', moderationStatus: 'pending', hoursAgo: 5 },
  { articleIndex: 21, userIndex: 3, body: 'Been to this spot, the ifisashi tasting menu is unreal.', moderationStatus: 'approved', hoursAgo: 8 },
];

export const comments: Comment[] = seeds.map((s, i) => {
  const article = articles[s.articleIndex];
  const user = users[s.userIndex];
  return {
    id: `comment_${i}`,
    articleId: article.id,
    userId: user.id,
    userName: user.displayName,
    body: s.body,
    moderationStatus: s.moderationStatus,
    aiToxicityScore: s.aiToxicityScore,
    aiCategories: s.aiCategories ?? [],
    createdAt: new Date(Date.now() - s.hoursAgo * 3600000).toISOString(),
  };
});
