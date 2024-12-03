import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../../style/globals.css';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

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
  other: {
    'google-site-verification': '',
  },
  title: 'hottoplay',
  description:
    '역대 로또 당첨 번호를 분석하여 새로운 번호 조합을 생성합니다. 유니크한 번호 조합, 가장 많이 당첨된 번호 기반 조합, 사용자가 제시하는 번호 조합 등 다양한 방식으로 제작자와 함께 번호를 생성해보세요.',
  keywords: '로또, 로또번호생성, 로또분석, 당첨번호, 번호조합, 로또예측, 무료',
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
        <GoogleTagManager gtmId={GTM_ID} />
        <GoogleAnalytics gaId={GA_ID} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
