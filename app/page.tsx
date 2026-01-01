'use client';

import { useState } from 'react';
import { GreetingForm } from '@/app/components/GreetingForm';
import { GreetingCard } from '@/app/components/GreetingCard';
import type { GreetingInput, GreetingOutput, ImageResult } from '@/app/lib/types';
import { EVENT_DEFAULT_KEYWORDS } from '@/app/lib/events';

export default function HomePage() {
  const [data, setData] = useState<GreetingOutput | null>(null);
  const [image, setImage] = useState<ImageResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onGenerate(input: GreetingInput) {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error || 'Failed to generate greeting');
      }

      setData(json as GreetingOutput);

      const keywords: string[] = Array.isArray(json?.imageKeywords) && json.imageKeywords.length
        ? json.imageKeywords
        : EVENT_DEFAULT_KEYWORDS[input.eventType];

      const q = encodeURIComponent(keywords[0] || 'celebration');
      const imgRes = await fetch(`/api/image?q=${q}`);
      const imgJson = await imgRes.json();
      setImage(imgJson as ImageResult);
    } catch (e: any) {
      setError(e?.message || 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">מחולל ברכות מעוצבות</h1>
        <p className="mt-2 text-gray-700">
          יוצר ברכות ארוכות, אישיות ומותאמות לאירוע, עם עיצוב להדפסה.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <GreetingForm onGenerate={onGenerate} isLoading={isLoading} />

        <div className="space-y-4">
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800">
              {error}
              <div className="mt-2 text-sm text-red-700">
                ודא שיש לך OPENAI_API_KEY בקובץ env.
              </div>
            </div>
          )}

          {data ? (
            <GreetingCard data={data} image={image} />
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600">
              כאן תופיע הברכה המעוצבת לאחר יצירה.
            </div>
          )}

          <div className="rounded-2xl bg-white p-6 text-sm text-gray-600">
            <div className="font-semibold text-gray-800">הגדרה מהירה</div>
            <ol className="mt-2 list-decimal pr-5 space-y-1">
              <li>צור קובץ <span className="font-mono">.env.local</span> והוסף <span className="font-mono">OPENAI_API_KEY</span>.</li>
              <li>אופציונלי: הוסף <span className="font-mono">UNSPLASH_ACCESS_KEY</span> לתמונות אוטומטיות.</li>
              <li>הרץ <span className="font-mono">npm install</span> ואז <span className="font-mono">npm run dev</span>.</li>
            </ol>
          </div>
        </div>
      </div>

      <footer className="mt-10 text-xs text-gray-500">
        טיפ: ניתן לערוך את תבנית הכתיבה והעיצוב בקובץ <span className="font-mono">app/lib/generateGreeting.ts</span>.
      </footer>
    </main>
  );
}
