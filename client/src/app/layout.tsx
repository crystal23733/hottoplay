import localFont from 'next/font/local';
import '../../style/globals.css';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { Toaster } from '@/ui/toaster';
import env from '@/config/meta/env';

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
