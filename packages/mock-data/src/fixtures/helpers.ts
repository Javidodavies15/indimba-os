let counter = 0;

export function id(prefix: string): string {
  counter += 1;
  return `${prefix}_${counter.toString(36).padStart(6, '0')}`;
}

export function img(seed: string, w = 1200, h = 800): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
}

export function avatar(seed: string): string {
  return `https://i.pravatar.cc/300?u=${encodeURIComponent(seed)}`;
}
