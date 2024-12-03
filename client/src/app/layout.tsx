import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../../style/globals.css';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import env from '@/config/meta/env';
import hottoplay from '@/constants/hottoplay';

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
    default: `${hottoplay} - 로또 예상번호 조합기`,
    template: `%s | ${hottoplay}`,
  },
  description:
    '새로운 로또번호 조합을 생성합니다. 유니크한 번호 조합, 가장 많이 당첨된 번호 기반 조합, 사용자가 제시하는 번호 조합 등 다양한 방식으로 제작자와 함께 무료로 번호를 생성해보세요.',
  keywords: [
    '로또',
    '로또번호생성',
    '로또분석',
    '당첨번호',
    '번호조합',
    '로또예측',
    '무료',
    '모바일',
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
    title: `${hottoplay} - 로또 예상번호 조합기`,
    description:
      '새로운 로또번호 조합을 생성합니다. 유니크한 번호 조합, 가장 많이 당첨된 번호 기반 조합, 사용자가 제시하는 번호 조합 등 다양한 방식으로 제작자와 함께 무료로 번호를 생성해보세요.',
    url: env.url.base,
    siteName: hottoplay,
    locale: 'ko_KR',
    type: 'website',
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
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID as string;
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID as string;
  return (
    <html lang="en">
      <head>
        <GoogleTagManager gtmId={env.analytics.gtmId} />
        <GoogleAnalytics gaId={env.analytics.gaId} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
