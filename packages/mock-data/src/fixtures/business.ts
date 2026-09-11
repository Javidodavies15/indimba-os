import type { BusinessListing } from '../types';
import { img } from './helpers';

interface ListingSeed {
  name: string;
  slug: string;
  category: string;
  description: string;
  city: string;
  tier: BusinessListing['tier'];
  isVerified: boolean;
  phone?: string;
  website?: string;
}

const listingSeeds: ListingSeed[] = [
  { name: 'Kabulonga Coffee Roasters', slug: 'kabulonga-coffee-roasters', category: 'Food & Drink', description: 'Small-batch coffee roasted from beans grown in Northern Province.', city: 'Lusaka', tier: 'premium', isVerified: true, phone: '+260 97 000 0001', website: 'https://kabulongacoffee.example' },
  { name: 'PayZed', slug: 'payzed', category: 'Fintech', description: 'Mobile money and micro-lending platform for underserved communities.', city: 'Lusaka', tier: 'enterprise', isVerified: true, website: 'https://payzed.example' },
  { name: 'FarmLink Zambia', slug: 'farmlink-zambia', category: 'Agriculture', description: 'SMS-based marketplace connecting smallholder farmers to buyers.', city: 'Kabwe', tier: 'standard', isVerified: true, website: 'https://farmlink.example' },
  { name: 'Copperbelt Tailors Guild', slug: 'copperbelt-tailors-guild', category: 'Fashion', description: 'A cooperative of tailors specialising in modern chitenge fashion.', city: 'Kitwe', tier: 'standard', isVerified: false, phone: '+260 96 000 0002' },
  { name: 'Zambezi Riverside Lodge', slug: 'zambezi-riverside-lodge', category: 'Hospitality', description: 'Boutique riverside lodge and wellness retreat venue.', city: 'Livingstone', tier: 'premium', isVerified: true, website: 'https://zambeziriverside.example' },
  { name: 'Kalemba Studios', slug: 'kalemba-studios', category: 'Creative', description: 'Animation studio producing homegrown Zambian children\'s content.', city: 'Lusaka', tier: 'free', isVerified: false },
  { name: 'Lusaka Bike Couriers', slug: 'lusaka-bike-couriers', category: 'Logistics', description: 'Same-day bicycle courier service across greater Lusaka.', city: 'Lusaka', tier: 'standard', isVerified: false, phone: '+260 95 000 0003' },
  { name: 'Nkwazi Craft Market', slug: 'nkwazi-craft-market', category: 'Retail', description: 'Curated marketplace for Zambian artisans and craft makers.', city: 'Ndola', tier: 'free', isVerified: false },
];

export const listings: BusinessListing[] = listingSeeds.map((l) => ({
  id: `listing_${l.slug}`,
  name: l.name,
  slug: l.slug,
  category: l.category,
  description: l.description,
  contact: { phone: l.phone, website: l.website },
  location: { city: l.city },
  images: [img(l.slug, 1200, 700)],
  tier: l.tier,
  isVerified: l.isVerified,
  status: 'active',
}));
