'use client';

import { useEffect, useState } from 'react';
import TopAd from '@/components/ads/TopAd';
import BottomAd from '@/components/ads/BottomAd';
import SideAd from '@/components/ads/SideAd';

interface AdLayoutProps {
  children: React.ReactNode;
}

/**
 * 반응형 광고 레이아웃 컴포넌트
 * - 모바일: 상단/하단 광고
 * - 태블릿: 상단/하단 광고
 * - 데스크톱: 사이드 광고 추가
 */
export default function AdLayout({ children }: AdLayoutProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1200);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    return () => {
      window.removeEventListener('resize', checkDesktop);
    };
  }, []);

  if (isDesktop) {
    // 데스크톱: 사이드 광고 포함
    return (
      <div className="flex justify-center min-h-screen">
        {/* 왼쪽 사이드 광고 */}
        <div className="hidden xl:block w-[160px] p-2 sticky top-4 h-fit">
          <SideAd />
        </div>

        {/* 메인 콘텐츠 */}
        <div className="flex-1 max-w-4xl">
          <TopAd />
          <div className="px-4">{children}</div>
          <BottomAd />
        </div>

        {/* 오른쪽 사이드 광고 */}
        <div className="hidden xl:block w-[160px] p-2 sticky top-4 h-fit">
          <SideAd />
        </div>
      </div>
    );
  }

  // 모바일/태블릿: 상단/하단 광고만
  return (
    <div className="min-h-screen">
      <TopAd />
      <div className="px-4">{children}</div>
      <BottomAd />
    </div>
  );
}
