import type { Metadata } from 'next';
import env from '@/config/meta/env';
import hottoplay from '@/lotto/constants/hottoplay';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL(env.url.base),
  alternates: {
    canonical: `${env.url.base}/power-ball/draws`,
  },
  title: 'Powerball Drawing Results | Latest Winning Numbers and Jackpots',
  description:
    'View the latest Powerball drawing results, winning numbers, jackpot amounts, and prize breakdowns. Stay updated with historical Powerball results and trends.',
  keywords: [
    'Powerball results',
    'Powerball winning numbers',
    'Powerball drawing results',
    'Powerball jackpot',
    'Powerball prize breakdown',
    'latest Powerball numbers',
    'Powerball drawing dates',
    'Powerball winners',
    'Powerball cash value',
    'Powerball history',
    'US lottery results',
  ],
  openGraph: {
    title: 'Powerball Drawing Results | Latest Winning Numbers and Jackpots',
    description:
      'View the latest Powerball drawing results, winning numbers, jackpot amounts, and prize breakdowns.',
    url: `${env.url.base}/power-ball/draws`,
    siteName: hottoplay,
    locale: 'en_US',
    type: 'website',
  },
};

export default function PowerBallDrawsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Script
        id="draws-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Dataset',
            name: 'Powerball Drawing Results',
            description:
              'Historical Powerball drawing results including winning numbers and jackpot amounts',
            keywords: ['Powerball', 'lottery results', 'winning numbers', 'jackpot'],
            url: `${env.url.base}/power-ball/draws`,
            sameAs: `${env.url.base}/power-ball`,
            creator: {
              '@type': 'Organization',
              name: hottoplay,
            },
            license: 'https://creativecommons.org/licenses/by-nc/4.0/',
          }),
        }}
      />
      {children}
    </>
  );
}
