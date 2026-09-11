import Link from 'next/link';
import Image from 'next/image';

export interface ProductCardProps {
  slug: string;
  name: string;
  category: string;
  priceZmwCents: number;
  images: string[];
  inventory: number;
}

export function ProductCard({ slug, name, category, priceZmwCents, images, inventory }: ProductCardProps) {
  const outOfStock = inventory <= 0;

  return (
    <Link href={`/store/${slug}`} className="group block">
      <div className="aspect-square rounded-xl overflow-hidden mb-3 relative bg-surface-800">
        <Image src={images[0]} alt={name} fill className="object-cover group-hover:scale-105 transition-transform" />
        {outOfStock && (
          <div className="absolute inset-0 bg-surface-900/70 flex items-center justify-center">
            <span className="text-xs font-bold text-white uppercase tracking-wide">Out of Stock</span>
          </div>
        )}
      </div>
      <p className="text-[11px] text-surface-400 uppercase tracking-wide mb-0.5">{category}</p>
      <h3 className="font-semibold text-white text-sm line-clamp-1">{name}</h3>
      <p className="text-white font-bold text-sm mt-1">K{(priceZmwCents / 100).toLocaleString()}</p>
    </Link>
  );
}
