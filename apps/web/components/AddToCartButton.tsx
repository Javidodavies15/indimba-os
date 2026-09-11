'use client';
import { useState } from 'react';
import { Button } from '@indimba/ui/Button';
import { addToCart } from '@/lib/cart';

export function AddToCartButton({ slug, name, priceZmwCents, image, disabled }: { slug: string; name: string; priceZmwCents: number; image: string; disabled?: boolean }) {
  const [added, setAdded] = useState(false);

  return (
    <Button
      variant="gold"
      className="w-full"
      disabled={disabled}
      onClick={() => {
        addToCart({ slug, name, priceZmwCents, image });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
    >
      {disabled ? 'Out of Stock' : added ? 'Added ✓' : 'Add to Cart'}
    </Button>
  );
}
