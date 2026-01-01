import type { ImageResult } from './types';

export async function searchUnsplashImage(query: string): Promise<ImageResult> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    return { imageUrl: null, creditText: null, creditUrl: null };
  }

  const url = new URL('https://api.unsplash.com/search/photos');
  url.searchParams.set('query', query);
  url.searchParams.set('per_page', '1');
  url.searchParams.set('orientation', 'landscape');

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
    // Avoid Next.js caching for dynamic content
    cache: 'no-store',
  });

  if (!res.ok) {
    return { imageUrl: null, creditText: null, creditUrl: null };
  }

  const json: any = await res.json();
  const photo = json?.results?.[0];
  if (!photo) {
    return { imageUrl: null, creditText: null, creditUrl: null };
  }

  const name: string | null = photo?.user?.name ?? null;
  const profile: string | null = photo?.user?.links?.html ?? null;
  const imageUrl: string | null = photo?.urls?.regular ?? null;

  const creditText = name ? `צילום: ${name} (Unsplash)` : 'צילום: Unsplash';
  const creditUrl = profile || photo?.links?.html || null;

  return { imageUrl, creditText, creditUrl };
}
