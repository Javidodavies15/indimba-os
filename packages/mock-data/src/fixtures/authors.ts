import type { Author } from '../types';
import { avatar } from './helpers';

export const authors: Author[] = [
  { id: 'author_mwansa', displayName: 'Mwansa Chilufya', avatarUrl: avatar('mwansa-chilufya') },
  { id: 'author_bwalya', displayName: 'Bwalya Mumba', avatarUrl: avatar('bwalya-mumba') },
  { id: 'author_natasha', displayName: 'Natasha Banda', avatarUrl: avatar('natasha-banda') },
  { id: 'author_kunda', displayName: 'Kunda Phiri', avatarUrl: avatar('kunda-phiri') },
  { id: 'author_chanda', displayName: 'Chanda Mwape', avatarUrl: avatar('chanda-mwape') },
  { id: 'author_temwa', displayName: 'Temwa Zulu', avatarUrl: avatar('temwa-zulu') },
  { id: 'author_editorial', displayName: 'Indimba Editorial', avatarUrl: avatar('indimba-editorial') },
];

export function authorByIndex(i: number): Author {
  return authors[i % authors.length];
}
