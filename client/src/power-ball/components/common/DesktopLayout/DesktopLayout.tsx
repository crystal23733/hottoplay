'use client';

import { useEffect, useState } from 'react';
// import Advertisement from '../Advertisement/Advertisement';

/**
 * 데스크톱 광고 레이아웃 컴포넌트 (사이드바)
 * @param {DesktopAdLayoutProps} props - 데스크톱 광고 레이아웃 속성
 * @returns {React.ReactNode} 데스크톱 광고 레이아웃
 */
export default function DesktopAdLayout({ children }: { children: React.ReactNode }) {
  const [isDesktop, setIsDesktop] = useState(false);

  // 데스크톱 기기 확인 (1280px 이상)
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };

    // 초기 확인
    checkDesktop();

    // 리사이즈 이벤트 핸들러
    window.addEventListener('resize', checkDesktop);

    return () => {
      window.removeEventListener('resize', checkDesktop);
    };
  }, []);

  if (!isDesktop) return <>{children}</>;

  return (
    <div className="relative flex justify-center">
      {/* 왼쪽 사이드바 광고 */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2">
        {/* 승인 후 아래 주석 해제
        <Advertisement adSlot="1357924680" adSize="skyscraper" className="h-screen max-h-[600px]" />
        */}
        <div className="w-[160px] h-[600px]"></div>
      </div>

      {/* 콘텐츠 - 너비 제한 */}
      <div className="w-full max-w-[calc(100%-360px)] mx-auto px-4">{children}</div>

      {/* 오른쪽 사이드바 광고 */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2">
        {/* 승인 후 아래 주석 해제
        <Advertisement adSlot="2468013579" adSize="skyscraper" className="h-screen max-h-[600px]" />
        */}
        <div className="w-[160px] h-[600px]"></div>
      </div>
    </div>
  );
}
