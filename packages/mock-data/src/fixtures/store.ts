import type { StoreProduct } from '../types';
import { img } from './helpers';

interface ProductSeed {
  name: string;
  slug: string;
  category: string;
  description: string;
  priceZmwCents: number;
  inventory: number;
}

const productSeeds: ProductSeed[] = [
  { name: 'Indimba Logo Tee', slug: 'indimba-logo-tee', category: 'Apparel', description: 'Classic fit cotton tee with the Indimba wordmark.', priceZmwCents: 25000, inventory: 140 },
  { name: 'Kopala Tour 2026 Hoodie', slug: 'kopala-tour-2026-hoodie', category: 'Apparel', description: 'Limited-edition tour hoodie, only available while stock lasts.', priceZmwCents: 55000, inventory: 62 },
  { name: 'Flex Musonda "Mwana Wa Zambia" Vinyl', slug: 'flex-musonda-vinyl', category: 'Music', description: 'Limited pressing on 180g vinyl with gatefold sleeve.', priceZmwCents: 42000, inventory: 30 },
  { name: 'Chitenge Print Cap', slug: 'chitenge-print-cap', category: 'Apparel', description: 'Adjustable snapback in traditional chitenge print.', priceZmwCents: 18000, inventory: 200 },
  { name: 'Indimba Enamel Mug', slug: 'indimba-enamel-mug', category: 'Accessories', description: 'Durable enamel mug, perfect for a Sunday nshima.', priceZmwCents: 12000, inventory: 310 },
  { name: 'Zed Afrobeat Playlist Poster', slug: 'zed-afrobeat-playlist-poster', category: 'Art', description: 'A3 print celebrating the top tracks of the year.', priceZmwCents: 15000, inventory: 95 },
  { name: 'Chipolopolo Supporters Scarf', slug: 'chipolopolo-supporters-scarf', category: 'Sports', description: 'Knitted scarf in national team colours.', priceZmwCents: 22000, inventory: 180 },
  { name: 'Indimba Tote Bag', slug: 'indimba-tote-bag', category: 'Accessories', description: 'Heavy canvas tote, screen-printed by hand.', priceZmwCents: 14000, inventory: 260 },
  { name: 'Mapalo Bwale "Golden Hour" CD', slug: 'mapalo-bwale-golden-hour-cd', category: 'Music', description: 'Physical CD with exclusive liner notes and lyric booklet.', priceZmwCents: 20000, inventory: 75 },
  { name: 'Indimba Studio Notebook', slug: 'indimba-studio-notebook', category: 'Stationery', description: 'A5 dotted notebook for creators on the go.', priceZmwCents: 9000, inventory: 400 },
  { name: 'Amapiano Hour Vinyl Sticker Pack', slug: 'amapiano-hour-sticker-pack', category: 'Accessories', description: 'Set of 6 vinyl stickers, weatherproof.', priceZmwCents: 6000, inventory: 500 },
  { name: 'Indimba Snapback Cap', slug: 'indimba-snapback-cap', category: 'Apparel', description: 'Structured snapback with embroidered crest.', priceZmwCents: 21000, inventory: 150 },
];

export const products: StoreProduct[] = productSeeds.map((p) => ({
  id: `product_${p.slug}`,
  name: p.name,
  slug: p.slug,
  description: p.description,
  priceZmwCents: p.priceZmwCents,
  images: [img(p.slug, 1000, 1000), img(`${p.slug}-alt`, 1000, 1000)],
  category: p.category,
  inventory: p.inventory,
  isActive: true,
}));
