'use client';

import { useEffect, useState } from 'react';
// import Advertisement from '../Advertisement/Advertisement';

/**
 * 태블릿 광고 레이아웃 컴포넌트
 * @param {TabletAdLayoutProps} props - 태블릿 광고 레이아웃 속성
 * @returns {React.ReactNode} 태블릿 광고 레이아웃
 */
export default function TabletAdLayout({ children }: { children: React.ReactNode }) {
  const [isTablet, setIsTablet] = useState(false);

  // 태블릿 기기 확인 (768px~1279px)
  useEffect(() => {
    const checkTablet = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 768 && width < 1280);
    };

    // 초기 확인
    checkTablet();

    // 리사이즈 이벤트 핸들러
    window.addEventListener('resize', checkTablet);

    return () => {
      window.removeEventListener('resize', checkTablet);
    };
  }, []);

  if (!isTablet) return <>{children}</>;

  return (
    <div className="flex flex-col">
      {/* 상단 광고 - 태블릿용 */}
      <div className="sticky top-0 z-10">
        {/* 승인 후 아래 주석 해제
        <Advertisement adSlot="8765432109" adSize="leaderboard" className="mx-auto my-2" />
        */}
        <div className="w-full h-[90px] mx-auto my-2"></div>
      </div>

      {/* 컨텐츠 */}
      <div className="min-h-[calc(100vh-190px)] py-4">{children}</div>

      {/* 하단 광고 - 태블릿용 */}
      <div className="sticky bottom-0 z-10">
        {/* 승인 후 아래 주석 해제
        <Advertisement adSlot="9876543210" adSize="leaderboard" className="mx-auto my-2" />
        */}
        <div className="w-full h-[90px] mx-auto my-2"></div>
      </div>
    </div>
  );
}
