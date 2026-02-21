import { NextRequest, NextResponse } from 'next/server';
import { userSchema } from '../schema';
import { prisma } from '@/prisma/client';

export const GET = async () => {
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const validation = userSchema.safeParse(body);

  // Validate the request body
  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });

  const existingUser = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (existingUser)
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });

  // Save the data to a db
  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      username: body.username,
      email: body.email,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
};
