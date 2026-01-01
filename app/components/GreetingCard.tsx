'use client';

import clsx from 'clsx';
import type { GreetingOutput, ImageResult } from '@/app/lib/types';

export function GreetingCard({
  data,
  image,
}: {
  data: GreetingOutput;
  image: ImageResult | null;
}) {
  const accent = data.design?.accentColors?.[0] || '#111827';
  const accent2 = data.design?.accentColors?.[1] || '#E5E7EB';

  return (
    <div className="rounded-2xl bg-white shadow print:shadow-none">
      <div className="relative h-72 overflow-hidden rounded-t-2xl">
        {image?.imageUrl ? (
          <img
            src={image.imageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${accent}, ${accent2})`,
            }}
          />
        )}

        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute bottom-5 right-6 left-6 text-white">
          <div
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
            style={{ background: 'rgba(0,0,0,0.35)' }}
          >
            ברכה מעוצבת
          </div>
          <h1 className="mt-2 text-3xl font-bold leading-tight">{data.title}</h1>
        </div>
      </div>

      <div className="p-8">
        <div
          className={clsx(
            'whitespace-pre-line text-lg leading-8 text-gray-800',
            'selection:bg-gray-200'
          )}
        >
          {data.greetingText}
        </div>

        <div className="mt-6 whitespace-pre-line text-lg text-gray-800">{data.closing}</div>

        <div className="mt-8 text-left text-xl font-semibold">{data.signature}</div>

        {image?.creditText && (
          <div className="mt-6 text-sm text-gray-500">
            {image.creditUrl ? (
              <a className="underline" href={image.creditUrl} target="_blank" rel="noreferrer">
                {image.creditText}
              </a>
            ) : (
              image.creditText
            )}
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-xl bg-black px-4 py-2 text-white"
          >
            הדפסה
          </button>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(`${data.title}\n\n${data.greetingText}\n\n${data.closing}\n${data.signature}`);
            }}
            className="rounded-xl border border-gray-300 px-4 py-2"
          >
            העתקת טקסט
          </button>
        </div>
      </div>
    </div>
  );
}
