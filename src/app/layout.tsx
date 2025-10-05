import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ConvexProviderWrapper } from '@/components/providers/ConvexProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Prop.AI - Build Your Wealth Through Trusted Real Estate',
  description: 'Discover premium properties in Bangalore\'s most prestigious locations. Your journey to smart investments and lasting prosperity begins here.',
  keywords: 'Prop.AI, real estate, Bangalore properties, premium real estate, property investment, wealth building',
  authors: [{ name: 'Prop.AI Team' }],
  creator: 'Prop.AI',
  publisher: 'Prop.AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://prop-ai.com'),
  openGraph: {
    title: 'Prop.AI - Build Your Wealth Through Trusted Real Estate',
    description: 'Discover premium properties in Bangalore\'s most prestigious locations. Your journey to smart investments and lasting prosperity begins here.',
    url: 'https://prop-ai.com',
    siteName: 'Prop.AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Prop.AI - Premium Real Estate Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prop.AI - Build Your Wealth Through Trusted Real Estate',
    description: 'Discover premium properties in Bangalore\'s most prestigious locations. Your journey to smart investments and lasting prosperity begins here.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <html lang="en" className="scroll-smooth">
          <body className={inter.className}>
            <ConvexProviderWrapper>
              {children}
            </ConvexProviderWrapper>
          </body>
        </html>
  );
}
