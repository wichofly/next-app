import { NextRequest, NextResponse } from 'next/server';

export const GET = () => {
  return NextResponse.json([
    { id: 1, name: 'Jesus' },
    { id: 2, name: 'Paul' },
  ]);
};
