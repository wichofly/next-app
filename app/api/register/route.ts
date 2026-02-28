import { NextRequest, NextResponse } from 'next/server';
import { createUserSchema } from '../schema';
import { prisma } from '@/prisma/client';
import bcrypt from 'bcrypt';

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const validation = createUserSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user)
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      hashedPassword,
    },
  });

  return NextResponse.json({ email: newUser.email }, { status: 201 });
};
