import { Metadata } from 'next';
import env from '@/config/meta/env';
import hottoplay from '@/lotto/constants/hottoplay';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL(env.url.base),
  alternates: {
    canonical: `${env.url.base}/lotto`,
  },
  title: `행운의 꿈 해몽 로또 번호 | ${hottoplay}`,
  description:
    '로또 당첨과 관련된 꿈 해몽을 알아보세요. 돼지, 뱀, 물고기 등 다양한 꿈에 대한 해석을 무료로 제공합니다. 재미로 보는 꿈 해몽 서비스입니다.',
  keywords: [
    '꿈으로 로또 맞추기',
    '돼지꿈 로또번호',
    '뱀꿈 로또번호',
    '물고기꿈 로또번호',
    '집꿈 로또번호',
    '로또 당첨 꿈',
    '행운의 꿈 로또',
    '돈 관련 꿈 해몽',
    '로또 명당 꿈',
    '복권 당첨 꿈',
    '대박 꿈 해몽',
    // 핵심 키워드
    '행운의 꿈',
    '꿈 해몽',
    '로또 꿈',

    // 구체적인 꿈 키워드
    '돼지 꿈 해몽',
    '뱀 꿈 해몽',
    '물고기 꿈 해몽',

    // 검색 의도 키워드
    '길몽 해석',
    '재물운 꿈',
    '행운의 징조',

    // 부가 키워드
    '무료 꿈 해몽',
    '꿈 해석',
    '꿈 풀이',
  ],
  openGraph: {
    title: `행운의 꿈 해몽 | ${hottoplay}`,
    description:
      '꿈 해몽을 알아보세요. 돼지, 뱀, 물고기 등 다양한 꿈에 대한 해석을 무료로 제공합니다.',
    url: `${env.url.base}/content/dream`,
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '행운의 꿈 해몽 - 재미로 보는 꿈 해석',
      },
    ],
  },
};

export default function DreamLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 구조화된 데이터 추가 */}
      <Script
        id="dream-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "행운의 꿈 해몽 로또 번호",
            "author": {
              "@type": "Organization",
              "name": hottoplay
            },
            "publisher": {
              "@type": "Organization",
              "name": hottoplay,
              "logo": {
                "@type": "ImageObject",
                "url": `${env.url.base}/logo.png`
              }
            },
            "description": "로또 당첨과 관련된 꿈 해몽 정보",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `${env.url.base}/lotto/content/dream`
            }
          })
        }}
      />
      {children}
    </>
  );
}
