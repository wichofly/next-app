import { NextRequest, NextResponse } from 'next/server';
import { request } from 'node:http';
import { productSchema } from '../../schema';
import { prisma } from '@/prisma/client';

interface ProductsAPIProps {
  params: Promise<{ id: string }>;
}

export const GET = async (request: Request, { params }: ProductsAPIProps) => {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });

  if (!product)
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });

  return NextResponse.json(product);
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

  const updatedProduct = await prisma.product.update({
    where: { id: parseInt(id) },
    data: {
      name: body.name,
      price: body.price,
    },
  });

  if (!updatedProduct)
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });

  return NextResponse.json(updatedProduct);
};

export const DELETE = async (
  request: NextRequest,
  { params }: ProductsAPIProps,
) => {
  const { id } = await params;

  const deletedProduct = await prisma.product.delete({
    where: { id: parseInt(id) },
  });

  if (!deletedProduct)
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });

  return NextResponse.json({ message: 'Product deleted' });
};
