import { NextResponse } from 'next/server';
import { searchUnsplashImage } from '@/app/lib/searchImage';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || '').trim();
  if (!q) {
    return NextResponse.json({ imageUrl: null, creditText: null, creditUrl: null });
  }

  const result = await searchUnsplashImage(q);
  return NextResponse.json(result);
}
