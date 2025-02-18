import localFont from 'next/font/local';
import '../../style/globals.css';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { Toaster } from '@/ui/toaster';
import env from '@/config/meta/env';
import { Metadata } from 'next';
import hottoplay from '@/lotto/constants/hottoplay';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  metadataBase: new URL(env.url.base),
  title: {
    template: `%s | ${hottoplay}`,
    default: 'hottoplay - 파워볼 & 로또 번호 조합 | Powerball & Lotto Number Generator',
  },
  description:
    '파워볼과 로또 번호 조합을 위한 최적의 플랫폼. 당신의 행운의 번호를 찾아보세요. The optimal platform for Powerball and Lotto number generation.',
  keywords: [
    '파워볼',
    '로또',
    '번호 조합',
    'Powerball',
    'Lotto',
    'number generator',
    'number combination',
    'winning numbers',
    'lotto number generator',
    'powerball number generator',
    'lotto number combination',
    'powerball number combination',
    'lotto number combinations',
    'powerball number combinations',
    'number predictions',
  ],
  authors: [{ name: hottoplay }],
  creator: hottoplay,
  publisher: hottoplay,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `${hottoplay} - 로또 번호 조합 & Powerball Number Generator`,
    description:
      'The optimal platform for Powerball and Lotto number combinations. Find your lucky numbers. | 파워볼과 로또 번호 조합을 위한 최적의 플랫폼',
    url: env.url.base,
    siteName: hottoplay,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/home-image.png',
        width: 1200,
        height: 630,
        alt: '로또번호 예상 조합기 - 다양한 방식의 랜덤 번호 생성',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${hottoplay} - 로또 번호 생성기 & Powerball Number Generator`,
    description:
      'The optimal platform for Powerball and Lotto number combinations. Find your lucky numbers. | 파워볼과 로또 번호 조합을 위한 최적의 플랫폼',
    images: ['/home-image.png'],
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
  category: '로또',
  other: {
    'google-site-verification': env.siteVerification.google,
    'naver-site-verification': env.siteVerification.naver,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <GoogleTagManager gtmId={env.analytics.gtmId} />
        <GoogleAnalytics gaId={env.analytics.gaId} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
