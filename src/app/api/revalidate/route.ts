import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path');

  if (path) {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path, timestamp: new Date().toISOString() });
  }

  return NextResponse.json({ error: 'Path query parameter is required' }, { status: 400 });
}
