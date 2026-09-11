import Link from 'next/link';
import Image from 'next/image';
import { Mic2 } from 'lucide-react';

export interface PodcastCardProps {
  slug: string;
  title: string;
  coverUrl: string;
  category: string;
  hostName: string;
  episodeCount: number;
}

export function PodcastCard({ slug, title, coverUrl, category, hostName, episodeCount }: PodcastCardProps) {
  return (
    <Link href={`/podcasts/${slug}`} className="group block">
      <div className="aspect-square rounded-2xl overflow-hidden mb-3 relative">
        <Image src={coverUrl} alt={title} fill className="object-cover group-hover:scale-105 transition-transform" />
      </div>
      <p className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: '#EA580C' }}>
        {category}
      </p>
      <h3 className="font-bold text-white text-sm line-clamp-2">{title}</h3>
      <p className="text-surface-400 text-xs mt-1">{hostName}</p>
      <p className="flex items-center gap-1 text-surface-500 text-[11px] mt-1">
        <Mic2 className="w-3 h-3" /> {episodeCount} episodes
      </p>
    </Link>
  );
}
