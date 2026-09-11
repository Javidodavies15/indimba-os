'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { Button } from '@indimba/ui/Button';
import { type CartItem, getCart, removeFromCart, clearCart } from '@/lib/cart';

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [checkedOut, setCheckedOut] = useState(false);

  useEffect(() => {
    const sync = () => setItems(getCart());
    sync();
    window.addEventListener('indimba-cart-updated', sync);
    return () => window.removeEventListener('indimba-cart-updated', sync);
  }, []);

  const total = items.reduce((sum, i) => sum + i.priceZmwCents * i.quantity, 0);

  if (checkedOut) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <h1 className="font-display text-3xl tracking-wide text-white mb-2">ORDER PLACED</h1>
        <p className="text-surface-300 text-sm">Thanks for your order — a confirmation has been sent to your email.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-6 py-8">
      <h1 className="font-display text-4xl tracking-wide text-white mb-8">YOUR CART</h1>

      {items.length === 0 ? (
        <div className="bg-surface-800 rounded-2xl border border-white/5 p-12 text-center">
          <p className="text-surface-300 text-sm mb-4">Your cart is empty.</p>
          <Link href="/store" className="text-indimba-gold-400 hover:text-indimba-gold-300 font-semibold text-sm">
            Browse the store →
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-surface-800 rounded-2xl border border-white/5 divide-y divide-white/5 mb-6">
            {items.map((item) => (
              <div key={item.slug} className="flex items-center gap-4 p-4">
                <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{item.name}</p>
                  <p className="text-surface-400 text-xs mt-0.5">
                    Qty {item.quantity} × K{(item.priceZmwCents / 100).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setItems(removeFromCart(item.slug))}
                  className="p-2 text-surface-400 hover:text-indimba-red-400"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-6">
            <span className="text-surface-300 text-sm">Total</span>
            <span className="text-2xl font-black text-white">K{(total / 100).toLocaleString()}</span>
          </div>

          <Button
            variant="gold"
            className="w-full"
            onClick={() => {
              clearCart();
              setCheckedOut(true);
            }}
          >
            Checkout
          </Button>
        </>
      )}
    </div>
  );
}
