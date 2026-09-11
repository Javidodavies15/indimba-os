export interface CartItem {
  slug: string;
  name: string;
  priceZmwCents: number;
  image: string;
  quantity: number;
}

const CART_KEY = 'indimba_cart';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('indimba-cart-updated'));
  } catch {
    // ignore (private browsing, storage disabled, etc.)
  }
}

export function addToCart(item: Omit<CartItem, 'quantity'>, quantity = 1) {
  const items = getCart();
  const existing = items.find((i) => i.slug === item.slug);
  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ ...item, quantity });
  }
  saveCart(items);
  return items;
}

export function removeFromCart(slug: string) {
  const items = getCart().filter((i) => i.slug !== slug);
  saveCart(items);
  return items;
}

export function clearCart() {
  saveCart([]);
}
