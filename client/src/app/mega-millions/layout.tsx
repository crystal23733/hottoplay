import type { Metadata } from 'next';
import env from '@/config/meta/env';
import hottoplay from '@/lotto/constants/hottoplay';
import MegaMillionsNav from '@/megamillions/components/atoms/MegaMillionsNav/MegaMillionsNav';
import Script from 'next/script';
import Disclaimer from '@/megamillions/components/atoms/Disclaimer/Disclaimer';

export const metadata: Metadata = {
  metadataBase: new URL(env.url.base),
  alternates: {
    canonical: `${env.url.base}/mega-millions`,
    languages: {
      ko: `${env.url.base}/lotto`,
      'en-US': `${env.url.base}/mega-millions`,
    },
  },
  title: 'US MegaMillions Number Generator | Free Lottery Number Predictions',
  description: `Generate MegaMillions numbers based on historical data analysis. Choose from various methods: random combinations, frequently occurring numbers, rarely drawn numbers, and never-before-seen unique combinations.`,
  keywords: [
    'best MegaMillions numbers',
    'MegaMillions winning strategy',
    'how to win MegaMillions',
    'MegaMillions drawing days',
    'MegaMillions number picker',
    'online MegaMillions number generator',
    'MegaMillions frequency analysis',
    'MegaMillions hot numbers',
    'MegaMillions cold numbers',
    'lucky MegaMillions numbers',
    'MegaMillions numbers',
    'lottery number generator',
    'US MegaMillions',
    'random number generator',
    'MegaMillions generator',
    'historical lottery numbers',
    'MegaMillions number combinations',
    'number predictions',
    'winning numbers',
    'MegaMillions number generator',
  ],
  authors: [{ name: `${hottoplay}` }],
  creator: hottoplay,
  publisher: hottoplay,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `US MegaMillions Number Generator | Free Lottery Number Generator`,
    description:
      'Free MegaMillions number generator with multiple generation methods based on historical data analysis.',
    url: `${env.url.base}/mega-millions`,
    siteName: hottoplay,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/mega-millions-image.png',
        width: 1200,
        height: 630,
        alt: 'US MegaMillions Number Generator - Multiple Generation Methods',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `US MegaMillions Number Generator | Free Lottery Number Generator`,
    description:
      'Free MegaMillions number generator with multiple generation methods based on historical data analysis.',
    images: ['/mega-millions-image.png'],
    creator: '@hottoplay',
    site: '@hottoplay',
  },
  applicationName: hottoplay,
  appleWebApp: {
    capable: true,
    title: hottoplay,
    statusBarStyle: 'default',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: env.siteVerification.google,
  },
  category: 'lotto',
  other: {
    'google-site-verification': env.siteVerification.google,
    'naver-site-verification': env.siteVerification.naver,
  },
};

export default function MegaMillionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">MegaMillions Number Generator</h1>
        <p className="text-muted-foreground">
          Generate your MegaMillions numbers using different strategies or analyze number
          statistics.
        </p>
      </div>

      <MegaMillionsNav />

      {children}

      <Disclaimer />

      <Script
        id="megamillions-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'MegaMillions Number Generator',
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '253',
            },
          }),
        }}
      />
    </div>
  );
}
