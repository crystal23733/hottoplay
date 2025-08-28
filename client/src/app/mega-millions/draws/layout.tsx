import type { Metadata } from 'next';
import env from '@/config/meta/env';
import hottoplay from '@/lotto/constants/hottoplay';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL(env.url.base),
  alternates: {
    canonical: `${env.url.base}/mega-millions/draws`,
  },
  title: 'MegaMillions Drawing Results | Latest Winning Numbers and Jackpots',
  description:
    'View the latest MegaMillions drawing results, winning numbers, jackpot amounts, and prize breakdowns. Stay updated with historical MegaMillions results and trends.',
  keywords: [
    'MegaMillions results',
    'MegaMillions winning numbers',
    'MegaMillions drawing results',
    'MegaMillions jackpot',
    'MegaMillions prize breakdown',
    'latest MegaMillions numbers',
    'MegaMillions drawing dates',
    'MegaMillions winners',
    'MegaMillions cash value',
    'MegaMillions history',
    'US lottery results',
  ],
  openGraph: {
    title: 'MegaMillions Drawing Results | Latest Winning Numbers and Jackpots',
    description:
      'View the latest MegaMillions drawing results, winning numbers, jackpot amounts, and prize breakdowns.',
    url: `${env.url.base}/mega-millions/draws`,
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
            name: 'MegaMillions Drawing Results',
            description:
              'Historical MegaMillions drawing results including winning numbers and jackpot amounts',
            keywords: ['MegaMillions', 'lottery results', 'winning numbers', 'jackpot'],
            url: `${env.url.base}/mega-millions/draws`,
            sameAs: `${env.url.base}/mega-millions`,
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
