import { NextResponse } from 'next/server';
import { productsStore } from '@indimba/mock-data';
import { notFound, requireAdmin } from '@/lib/mock-api';

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const product = productsStore.get(params.slug, 'slug');
  if (!product) return notFound('Product not found');
  return NextResponse.json({ product });
}

export async function PATCH(request: Request, { params }: { params: { slug: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const patch = await request.json();
  const updated = productsStore.update(params.slug, patch, 'slug');
  if (!updated) return notFound('Product not found');
  return NextResponse.json({ product: updated });
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const ok = productsStore.remove(params.slug, 'slug');
  if (!ok) return notFound('Product not found');
  return NextResponse.json({ ok: true });
}
