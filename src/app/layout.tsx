import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FashionHero - Size Twin',
  description: 'Prototyp FashionHero z funkcjonalnością Size Twin.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
