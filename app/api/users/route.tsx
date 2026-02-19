import { NextRequest, NextResponse } from 'next/server';

export const GET = () => {
  return NextResponse.json([
    { id: 1, name: 'Jesus' },
    { id: 2, name: 'Paul' },
  ]);
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  // Validate the request body
  if (!body.name)
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });

  // Save the data to a db
  return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: number } },
) => {
  const { id } = params;
  const body = await request.json();

  if (!body.name)
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });

  if (id > 10)
    return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json({ id: 1, name: body.name });
};
