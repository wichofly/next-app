import { NextResponse } from 'next/server';
import { productSchema } from '../schema';
import { prisma } from '@/prisma/client';

export const GET = async () => {
  const products = await prisma.product.findMany();

  return NextResponse.json(products);
};

export const POST = async (request: Request) => {
  const body = await request.json();

  const validation = productSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });

  const newProduct = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
    },
  });

  return NextResponse.json(newProduct, { status: 201 });
};
