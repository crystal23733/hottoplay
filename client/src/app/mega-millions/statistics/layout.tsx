import type { Metadata } from 'next';
import env from '@/config/meta/env';
import hottoplay from '@/lotto/constants/hottoplay';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL(env.url.base),
  alternates: {
    canonical: `${env.url.base}/mega-millions/statistics`,
  },
  title: 'MegaMillions Statistics & Analysis | Comprehensive Historical Data',
  description: `Analyze MegaMillions numbers based on historical data since April 8, 2025. Check frequency, patterns, and last appearance dates for any number combination.`,
  keywords: [
    'MegaMillions statistics',
    'MegaMillions number analysis',
    'MegaMillions historical data',
    'MegaMillions number patterns',
    'MegaMillions winning combinations',
    'MegaMillions probability analysis',
    'MegaMillions jackpot statistics',
    'MegaMillions number pairs',
    'MegaMillions data visualization',
    'MegaMillions statistical trends',
    'MegaMillions odds analysis',
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
    title: `MegaMillions Statistics & Analysis | Comprehensive Historical Data`,
    description:
      'Analyze MegaMillions numbers and track their frequency, patterns, and historical appearances.',
    url: `${env.url.base}/mega-millions/statistics`,
    siteName: hottoplay,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/mega-millions-image.png',
        width: 1200,
        height: 630,
        alt: 'MegaMillions Number Statistics and Analysis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US MegaMillions Number Statistics | Historical Data Analysis',
    description:
      'Analyze MegaMillions numbers and track their frequency, patterns, and historical appearances.',
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

export default function PowerBallLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">MegaMillions Number Statistics</h1>
        <p className="text-muted-foreground">
          Analyze historical MegaMillions numbers since April 8, 2025. Select numbers to see their
          frequency, patterns, and last appearance dates.
        </p>
      </div>

      <Script
        id="statistics-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Dataset',
            name: 'MegaMillions Statistics and Analysis',
            description:
              'Comprehensive statistical analysis of MegaMillions numbers and drawings since 2025',
            keywords: ['MegaMillions', 'statistics', 'probability', 'analysis', 'historical data'],
            url: `${env.url.base}/mega-millions/statistics`,
            creator: {
              '@type': 'Organization',
              name: hottoplay,
            },
            temporalCoverage: '2015-10/',
            spatialCoverage: {
              '@type': 'Place',
              name: 'United States',
            },
            variableMeasured: [
              'Number frequency',
              'Pair analysis',
              'Jackpot trends',
              'Drawing probabilities',
            ],
          }),
        }}
      />

      {children}
    </div>
  );
}
