import { ProductCard } from '@indimba/ui/ProductCard';
import { productsStore } from '@indimba/mock-data';

export const metadata = {
  title: 'Indimba Store',
  description: 'Official Indimba merchandise, apparel and music collectibles.',
};

export default function StorePage() {
  const products = productsStore.list((p) => p.isActive);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <div className="mb-10">
        <p className="text-xs font-bold tracking-widest text-indimba-gold-400 uppercase mb-2">Indimba Store</p>
        <h1 className="font-display text-4xl lg:text-5xl tracking-wide text-white">MERCH</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}
