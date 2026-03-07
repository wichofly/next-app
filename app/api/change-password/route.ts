import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcrypt';
import { authOptions } from '../auth/[...nextauth]/route';
import { changePasswordSchema } from '../schema';
import { prisma } from '@/prisma/client';

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const validation = changePasswordSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.issues[0].message },
      { status: 400 },
    );
  }

  const { currentPassword, newPassword } = validation.data;

  if (currentPassword === newPassword) {
    return NextResponse.json(
      { error: 'New password must be different from current password' },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  if (!user.hashedPassword) {
    return NextResponse.json(
      { error: 'Password login is not enabled for this account' },
      { status: 400 },
    );
  }

  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.hashedPassword,
  );

  if (!isCurrentPasswordValid) {
    return NextResponse.json(
      { error: 'Current password is incorrect' },
      { status: 400 },
    );
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { hashedPassword },
  });

  return NextResponse.json(
    { message: 'Password updated successfully' },
    { status: 200 },
  );
};
