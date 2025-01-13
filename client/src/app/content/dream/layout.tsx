import { Metadata } from 'next';
import env from '@/config/meta/env';
import hottoplay from '@/constants/hottoplay';

export const metadata: Metadata = {
  metadataBase: new URL(env.url.base),
  title: `행운의 꿈 해몽 | ${hottoplay}`,
  description:
    '로또 당첨과 관련된 꿈 해몽을 알아보세요. 돼지, 뱀, 물고기 등 다양한 꿈에 대한 해석을 무료로 제공합니다. 재미로 보는 꿈 해몽 서비스입니다.',
  keywords: [
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
  return <>{children}</>;
}
