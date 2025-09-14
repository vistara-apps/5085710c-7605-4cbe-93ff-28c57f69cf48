import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CryptoPulse - Your real-time edge in crypto markets',
  description: 'Real-time crypto asset tracking, on-chain activity alerts, altcoin opportunity scans, and sentiment analysis for crypto enthusiasts using Base.',
  keywords: ['crypto', 'cryptocurrency', 'trading', 'base', 'miniapp'],
  openGraph: {
    title: 'CryptoPulse',
    description: 'Your real-time edge in crypto markets',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
