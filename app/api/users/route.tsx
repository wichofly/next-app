import { NextRequest, NextResponse } from 'next/server';
import { userSchema } from './schema';

export const GET = () => {
  return NextResponse.json([
    { id: 1, name: 'Jesus' },
    { id: 2, name: 'Paul' },
  ]);
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const validation = userSchema.safeParse(body);

  // Validate the request body
  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });

  // Save the data to a db
  return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
};

