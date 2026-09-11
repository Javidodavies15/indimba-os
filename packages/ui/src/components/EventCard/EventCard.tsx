import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin } from 'lucide-react';

export interface EventCardProps {
  id: string;
  slug: string;
  title: string;
  coverUrl: string;
  startsAt: string;
  venueName: string;
  city: string;
  category: string;
  fromPriceZmwCents?: number;
}

export function EventCard({ id, title, coverUrl, startsAt, venueName, city, category, fromPriceZmwCents }: EventCardProps) {
  const date = new Date(startsAt);

  return (
    <Link href={`/events/${id}`} className="group block bg-surface-800 rounded-2xl border border-white/5 hover:border-white/10 transition-colors overflow-hidden">
      <div className="aspect-[16/10] relative overflow-hidden">
        <Image src={coverUrl} alt={title} fill className="object-cover group-hover:scale-105 transition-transform" />
        <div className="absolute top-3 left-3 bg-surface-900/90 rounded-lg px-2.5 py-1.5 text-center leading-none">
          <span className="block text-[10px] font-bold text-indimba-red-400 uppercase">
            {date.toLocaleDateString('en-GB', { month: 'short' })}
          </span>
          <span className="block text-sm font-black text-white">{date.getDate()}</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: '#0891B2' }}>
          {category}
        </p>
        <h3 className="font-bold text-white text-sm mb-2 line-clamp-2">{title}</h3>
        <p className="flex items-center gap-1.5 text-xs text-surface-400 mb-1">
          <MapPin className="w-3.5 h-3.5 shrink-0" /> {venueName}, {city}
        </p>
        <p className="flex items-center gap-1.5 text-xs text-surface-400">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          {date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        {fromPriceZmwCents !== undefined && (
          <p className="text-sm font-bold text-white mt-3">
            {fromPriceZmwCents === 0 ? 'Free' : `From K${(fromPriceZmwCents / 100).toLocaleString()}`}
          </p>
        )}
      </div>
    </Link>
  );
}
