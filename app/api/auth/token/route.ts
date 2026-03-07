import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const token = await getToken({ req: request });
  return NextResponse.json({ token });
};
