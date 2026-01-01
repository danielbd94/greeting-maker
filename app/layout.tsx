import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Greeting Maker',
  description: 'Generate beautifully designed, personalized greetings for events.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
