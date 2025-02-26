import type { Metadata } from 'next';
import env from '@/config/meta/env';
import hottoplay from '@/lotto/constants/hottoplay';
import PowerBallNav from '@/power-ball/components/atoms/PowerBallNav/PowerBallNav';

export const metadata: Metadata = {
  metadataBase: new URL(env.url.base),
  alternates: {
    canonical: 'https://hottoplay.com/power-ball',
  },
  title: 'US Powerball Number Generator | Free Lottery Number Generator',
  description: `Generate Powerball numbers based on historical data analysis. Choose from various methods: random combinations, frequently occurring numbers, rarely drawn numbers, and never-before-seen unique combinations.`,
  keywords: [
    'Powerball numbers',
    'lottery number generator',
    'US Powerball',
    'random number generator',
    'Powerball generator',
    'historical lottery numbers',
    'powerball number combinations',
    'number predictions',
    'winning numbers',
    'powerball number generator',
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
    title: `US Powerball Number Generator | Free Lottery Number Generator`,
    description:
      'Free Powerball number generator with multiple generation methods based on historical data analysis.',
    url: `${env.url.base}/power-ball`,
    siteName: hottoplay,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/powerball-image.png',
        width: 1200,
        height: 630,
        alt: 'US Powerball Number Generator - Multiple Generation Methods',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `US Powerball Number Generator | Free Lottery Number Generator`,
    description:
      'Free Powerball number generator with multiple generation methods based on historical data analysis.',
    images: ['/powerball-image.png'],
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
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Powerball Number Generator</h1>
        <p className="text-muted-foreground">
          Generate your Powerball numbers using different strategies or analyze number statistics.
        </p>
      </div>

      <PowerBallNav />

      {children}
    </div>
  );
}
