import type { Metadata } from 'next';
import env from '@/config/meta/env';
import hottoplay from '@/lotto/constants/hottoplay';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL(env.url.base),
  alternates: {
    canonical: `${env.url.base}/power-ball/frequency`,
  },
  title: 'Powerball Number Frequency Analysis | Hot and Cold Numbers',
  description:
    'Analyze Powerball number frequencies to identify hot and cold numbers. View detailed charts and statistics of most and least frequently drawn Powerball numbers.',
  keywords: [
    'Powerball number frequency',
    'Powerball hot numbers',
    'Powerball cold numbers',
    'most frequent Powerball numbers',
    'least drawn Powerball numbers',
    'Powerball number statistics',
    'Powerball frequency chart',
    'Powerball number analysis',
    'Powerball number patterns',
    'Powerball frequency data',
    'Powerball number trends',
  ],
  openGraph: {
    title: 'Powerball Number Frequency Analysis | Hot and Cold Numbers',
    description:
      'Analyze Powerball number frequencies to identify hot and cold numbers with detailed charts and statistics.',
    url: `${env.url.base}/power-ball/frequency`,
    siteName: hottoplay,
    locale: 'en_US',
    type: 'website',
  },
};

export default function PowerBallFrequencyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Script
        id="frequency-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Dataset',
            name: 'Powerball Number Frequency Analysis',
            description:
              'Statistical analysis of Powerball number frequencies showing hot and cold numbers',
            keywords: [
              'Powerball',
              'number frequency',
              'hot numbers',
              'cold numbers',
              'statistical analysis',
            ],
            url: `${env.url.base}/power-ball/frequency`,
            creator: {
              '@type': 'Organization',
              name: hottoplay,
            },
            temporalCoverage: '2015-10/',
            spatialCoverage: {
              '@type': 'Place',
              name: 'United States',
            },
          }),
        }}
      />
      {children}
    </>
  );
}
