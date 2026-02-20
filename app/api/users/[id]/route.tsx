import { NextRequest, NextResponse } from 'next/server';
import { userSchema } from '../schema';

interface Props {
  params: Promise<{ id: number }>;
}

export const GET = async (request: NextRequest, { params }: Props) => {
  const { id } = await params;

  // Fetch data from a db
  // If not found, return a 404 error
  // Else return data
  // Make a rule and say if id is greater than 10, we are going to return a 404 error, otherwise we will return the data

  if (id > 10)
    return NextResponse.json({ message: 'User not found' }, { status: 404 });

  return NextResponse.json({ id: 1, name: 'Jesus' });
};

export const PUT = async (request: NextRequest, { params }: Props) => {
  const body = await request.json();
  const { id } = await params;

  const validation = userSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });

  if (id > 10)
    return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json({ id: 1, name: body.name });
};

export const DELETE = async (request: NextRequest, { params }: Props) => {
  const { id } = await params;

  if (id > 10)
    return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json({ message: 'User deleted' });
};
