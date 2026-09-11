import Link from 'next/link';
import Image from 'next/image';
import { BadgeCheck, MapPin } from 'lucide-react';

export interface ListingCardProps {
  slug: string;
  name: string;
  category: string;
  description: string;
  images: string[];
  city: string;
  isVerified: boolean;
  tier: string;
}

export function ListingCard({ slug, name, category, description, images, city, isVerified, tier }: ListingCardProps) {
  return (
    <Link href={`/business/${slug}`} className="group block bg-surface-800 rounded-2xl border border-white/5 hover:border-white/10 transition-colors overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <Image src={images[0]} alt={name} fill className="object-cover group-hover:scale-105 transition-transform" />
        {tier !== 'free' && (
          <span className="absolute top-3 right-3 text-[10px] font-bold uppercase px-2 py-1 rounded-full bg-indimba-gold-500 text-surface-900">
            {tier}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: '#D97706' }}>
          {category}
        </p>
        <div className="flex items-center gap-1.5 mb-1">
          <h3 className="font-bold text-white text-sm">{name}</h3>
          {isVerified && <BadgeCheck className="w-4 h-4 text-blue-400 shrink-0" />}
        </div>
        <p className="text-surface-400 text-xs line-clamp-2 mb-2">{description}</p>
        <p className="flex items-center gap-1 text-surface-500 text-[11px]">
          <MapPin className="w-3 h-3" /> {city}
        </p>
      </div>
    </Link>
  );
}
