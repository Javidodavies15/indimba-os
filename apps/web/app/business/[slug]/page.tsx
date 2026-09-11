import { notFound } from 'next/navigation';
import Image from 'next/image';
import { BadgeCheck, Globe, MapPin, Phone } from 'lucide-react';
import { articlesStore, listingsStore } from '@indimba/mock-data';
import { ArticleDetail } from '@/components/ArticleDetail';

export default function BusinessDetailPage({ params }: { params: { slug: string } }) {
  const listing = listingsStore.get(params.slug, 'slug');
  if (listing) {
    return (
      <div>
        <div className="relative h-56 md:h-72">
          <Image src={listing.images[0]} alt={listing.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-surface-900/40 to-transparent" />
        </div>
        <div className="max-w-3xl mx-auto px-4 lg:px-6 -mt-12 relative">
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#D97706' }}>
            {listing.category}
          </p>
          <div className="flex items-center gap-2 mb-4">
            <h1 className="font-display text-3xl md:text-4xl tracking-wide text-white">{listing.name}</h1>
            {listing.isVerified && <BadgeCheck className="w-6 h-6 text-blue-400" />}
          </div>
          <p className="text-surface-300 text-sm max-w-2xl mb-6">{listing.description}</p>
          <div className="flex flex-wrap gap-5 text-sm text-surface-300">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> {listing.location.city}
            </span>
            {listing.contact.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4" /> {listing.contact.phone}
              </span>
            )}
            {listing.contact.website && (
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4" /> {listing.contact.website}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  const article = articlesStore.get(params.slug, 'slug');
  if (article && article.platform === 'business') {
    return <ArticleDetail article={article} accent="#D97706" />;
  }

  notFound();
}
