import { NextRequest, NextResponse } from 'next/server';
import { request } from 'node:http';
import { productSchema } from '../../schema';

interface ProductsAPIProps {
  params: Promise<{ id: number }>;
}

export const GET = async (request: Request, { params }: ProductsAPIProps) => {
  const { id } = await params;

  if (id > 10)
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });

  return NextResponse.json({ id, name: 'Milk', price: 2.5 });
};

export const PUT = async (
  request: NextRequest,
  { params }: ProductsAPIProps,
) => {
  const body = await request.json();
  const { id } = await params;

  const validation = productSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });

  if (id > 10)
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });

  return NextResponse.json({ id, name: body.name, price: body.price });
};

export const DELETE = async (
  request: NextRequest,
  { params }: ProductsAPIProps,
) => {
  const { id } = await params;

  if (id > 10)
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });

  return NextResponse.json({ message: 'Product deleted' });
};
