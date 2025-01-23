import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../../style/globals.css';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { Toaster } from '@/ui/toaster';
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
  alternates: {
    canonical: env.url.base,
  },
  title: {
    default: `로또 예상번호 생성기 | ${hottoplay} - 유니크 로또 조합 생성`,
    template: '%s | 로또 번호 생성기',
  },
  description: `로또 예상번호 생성기 ${hottoplay}는 유니크 로또 번호, 많이 나온 번호, 커스텀 번호를 무료로 제공합니다. 다양한 방식으로 로또 번호를 분석하고 조합해보세요.`,
  keywords: [
    // 주요 검색 키워드 (상위 노출 목표)
    '로또 번호 생성기',
    '로또 예상번호',
    '로또 번호 조합',
    '로또 조합기',

    // 서비스 특징 키워드
    '무료 로또 번호',
    '유니크 로또 번호',
    '로또 번호 추천',
    '로또 당첨 통계',
    'lotto',
    'hotto',

    // 브랜드 키워드
    'hottoplay',
    'hotto lotto',
    '핫투플레이',

    // 연관 검색어
    '로또 번호 분석',
    '로또 확률 계산',
    '로또 당첨 번호',
    '로또 번호 생성',
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
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '로또번호 예상 조합기 - 다양한 방식의 랜덤 번호 생성',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${hottoplay} - 로또 번호 생성기`,
    description:
      '로또 번호 생성기입니다. 랜덤 번호, 유니크 번호, 많이 나온 번호 기반 생성, 커스텀 번호 생성 등 다양한 방식으로 무료로 번호를 생성해보세요.',
    images: ['/og-image.png'],
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
