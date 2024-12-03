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
  title: {
    default: `${hottoplay} - 로또 예상번호 조합기`,
    template: `%s | ${hottoplay}`,
  },
  description:
    '새로운 로또번호 조합을 생성합니다. 유니크한 번호 조합, 가장 많이 당첨된 번호 기반 조합, 사용자가 제시하는 번호 조합 등 다양한 방식으로 제작자와 함께 무료로 번호를 생성해보세요.',
  keywords: [
    // 핵심 키워드
    '로또 번호 생성기',
    '로또 번호 조합',
    '로또 번호 추천',

    // 기능 관련 키워드
    '유니크 로또 번호',
    '많이 나온 로또 번호',
    '커스텀 로또 번호',
    '무료 로또 번호 생성',

    // 검색 의도 키워드
    '로또 당첨 번호 확인',
    '로또 번호 분석',
    '로또 당첨 확률',
    '로또 번호 통계',

    // 사용성 키워드
    '간편한 로또 번호 생성',
    '모바일 로또 번호 생성',
    '웹 로또 번호 생성기',
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
    <html lang="en">
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
