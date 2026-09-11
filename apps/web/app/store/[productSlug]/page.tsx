import { notFound } from 'next/navigation';
import Image from 'next/image';
import { productsStore } from '@indimba/mock-data';
import { AddToCartButton } from '@/components/AddToCartButton';

export function generateMetadata({ params }: { params: { productSlug: string } }) {
  const product = productsStore.get(params.productSlug, 'slug');
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default function ProductPage({ params }: { params: { productSlug: string } }) {
  const product = productsStore.get(params.productSlug, 'slug');
  if (!product) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square rounded-2xl overflow-hidden bg-surface-800">
          <Image src={product.images[0]} alt={product.name} width={600} height={600} className="object-cover w-full h-full" />
        </div>
        <div>
          <p className="text-[11px] text-indimba-gold-400 uppercase tracking-wide mb-2">{product.category}</p>
          <h1 className="font-display text-3xl tracking-wide text-white mb-3">{product.name}</h1>
          <p className="text-2xl font-black text-white mb-4">K{(product.priceZmwCents / 100).toLocaleString()}</p>
          <p className="text-surface-300 text-sm leading-relaxed mb-6">{product.description}</p>
          <p className="text-surface-400 text-xs mb-4">{product.inventory > 0 ? `${product.inventory} in stock` : 'Currently unavailable'}</p>
          <AddToCartButton
            slug={product.slug}
            name={product.name}
            priceZmwCents={product.priceZmwCents}
            image={product.images[0]}
            disabled={product.inventory <= 0}
          />
        </div>
      </div>
    </div>
  );
}
