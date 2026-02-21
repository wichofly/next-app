import { NextRequest, NextResponse } from 'next/server';
import { userSchema } from '../../schema';
import { prisma } from '@/prisma/client';

interface Props {
  params: Promise<{ id: string }>;
}

export const GET = async (request: NextRequest, { params }: Props) => {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });

  // Fetch data from a db
  // If not found, return a 404 error
  // Else return data
  // Make a rule and say if id is greater than 10, we are going to return a 404 error, otherwise we will return the data

  if (!user)
    return NextResponse.json({ message: 'User not found' }, { status: 404 });

  return NextResponse.json(user);
};

export const PUT = async (request: NextRequest, { params }: Props) => {
  const body = await request.json();
  const { id } = await params;

  const validation = userSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });

  const existingUser = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (existingUser)
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) }, 
    data: {
      name: body.name,
      email: body.email,
    },
  });

  if (!updatedUser)
    return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json(updatedUser);
};

export const DELETE = async (request: NextRequest, { params }: Props) => {
  const { id } = await params;

  const deletedUser = await prisma.user.delete({
    where: { id: parseInt(id) },
  });

  if (!deletedUser)
    return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json({ message: 'User deleted' });
};
