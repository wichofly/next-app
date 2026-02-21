import { NextResponse } from 'next/server';
import { productSchema } from '../schema';

export const GET = () => {
  return NextResponse.json([
    { id: 1, name: 'Milk', price: 2.5 },
    { id: 2, name: 'Bread', price: 3.5 },
  ]);
};

export const POST = async (request: Request) => {
  const body = await request.json();

  const validation = productSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });

  return NextResponse.json({ id: 3, name: body.name, price: body.price }, { status: 201 });
}