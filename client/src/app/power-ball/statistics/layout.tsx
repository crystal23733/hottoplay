import type { Metadata } from 'next';
import env from '@/config/meta/env';
import hottoplay from '@/lotto/constants/hottoplay';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL(env.url.base),
  alternates: {
    canonical: `${env.url.base}/power-ball/statistics`,
  },
  title: 'Powerball Statistics & Analysis | Comprehensive Historical Data',
  description: `Analyze Powerball numbers based on historical data since October 7, 2015. Check frequency, patterns, and last appearance dates for any number combination.`,
  keywords: [
    'Powerball statistics',
    'Powerball number analysis',
    'Powerball historical data',
    'Powerball number patterns',
    'Powerball winning combinations',
    'Powerball probability analysis',
    'Powerball jackpot statistics',
    'Powerball number pairs',
    'Powerball data visualization',
    'Powerball statistical trends',
    'Powerball odds analysis',
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
    title: `Powerball Statistics & Analysis | Comprehensive Historical Data`,
    description:
      'Analyze Powerball numbers and track their frequency, patterns, and historical appearances.',
    url: `${env.url.base}/power-ball/statistics`,
    siteName: hottoplay,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/powerball-image.png',
        width: 1200,
        height: 630,
        alt: 'Powerball Number Statistics and Analysis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US Powerball Number Statistics | Historical Data Analysis',
    description:
      'Analyze Powerball numbers and track their frequency, patterns, and historical appearances.',
    images: ['/powerball-statistics-image.png'],
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
        <h1 className="text-2xl font-bold mb-2">Powerball Number Statistics</h1>
        <p className="text-muted-foreground">
          Analyze historical Powerball numbers since October 7, 2015. Select numbers to see their
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
            name: 'Powerball Statistics and Analysis',
            description:
              'Comprehensive statistical analysis of Powerball numbers and drawings since 2015',
            keywords: ['Powerball', 'statistics', 'probability', 'analysis', 'historical data'],
            url: `${env.url.base}/power-ball/statistics`,
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
