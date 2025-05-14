import type { Metadata } from 'next';
import env from '@/config/meta/env';
import hottoplay from '@/lotto/constants/hottoplay';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL(env.url.base),
  alternates: {
    canonical: `${env.url.base}/mega-millions/frequency`,
  },
  title: 'MegaMillions Number Frequency Analysis | Hot and Cold Numbers',
  description:
    'Analyze MegaMillions number frequencies to identify hot and cold numbers. View detailed charts and statistics of most and least frequently drawn MegaMillions numbers.',
  keywords: [
    'MegaMillions number frequency',
    'MegaMillions hot numbers',
    'MegaMillions cold numbers',
    'most frequent MegaMillions numbers',
    'least drawn MegaMillions numbers',
    'MegaMillions number statistics',
    'MegaMillions frequency chart',
    'MegaMillions number analysis',
    'MegaMillions number patterns',
    'MegaMillions frequency data',
    'MegaMillions number trends',
  ],
  openGraph: {
    title: 'MegaMillions Number Frequency Analysis | Hot and Cold Numbers',
    description:
      'Analyze MegaMillions number frequencies to identify hot and cold numbers with detailed charts and statistics.',
    url: `${env.url.base}/mega-millions/frequency`,
    siteName: hottoplay,
    locale: 'en_US',
    type: 'website',
  },
};

export default function MegaMillionsFrequencyLayout({
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
            name: 'MegaMillions Number Frequency Analysis',
            description:
              'Statistical analysis of MegaMillions number frequencies showing hot and cold numbers',
            keywords: [
              'MegaMillions',
              'number frequency',
              'hot numbers',
              'cold numbers',
              'statistical analysis',
            ],
            url: `${env.url.base}/mega-millions/frequency`,
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
