import { NextResponse } from 'next/server';
import { productsStore } from '@indimba/mock-data';
import { requireAdmin } from '@/lib/mock-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const status = searchParams.get('status');
  let items = status === 'all' ? productsStore.list() : productsStore.list((p) => p.isActive);
  if (category) items = items.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const body = await request.json();
  const product = {
    id: `product_${body.slug ?? Date.now()}`,
    name: body.name,
    slug: body.slug,
    description: body.description ?? '',
    priceZmwCents: body.priceZmwCents ?? 0,
    images: body.images ?? [],
    category: body.category ?? 'General',
    inventory: body.inventory ?? 0,
    isActive: body.isActive ?? true,
  };
  productsStore.create(product);
  return NextResponse.json({ product }, { status: 201 });
}
