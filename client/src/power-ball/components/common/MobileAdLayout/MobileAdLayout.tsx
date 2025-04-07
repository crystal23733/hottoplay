'use client';

import { useEffect, useState } from 'react';
// import Advertisement from '../Advertisement/Advertisement';

/**
 * 모바일 광고 레이아웃 컴포넌트 (상단, 하단)
 * @param {MobileAdLayoutProps} props - 모바일 광고 레이아웃 속성
 * @returns {React.ReactNode} 모바일 광고 레이아웃
 */
export default function MobileAdLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 기기 확인
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 초기 확인
    checkMobile();

    // 리사이즈 이벤트 핸들러
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!isMobile) return <>{children}</>;

  return (
    <>
      {/* 상단 광고 */}
      <div className="sticky top-0 z-10 bg-background">
        {/* 
          광고 활성화 시 아래 주석 해제
          <Advertisement adSlot="1234567890" adSize="mobile-banner" />
        */}
        {/* 주석 제거 시 아래 코드 삭제 */}
        <div className="h-[50px] bg-muted/30 flex items-center justify-center text-muted text-xs">
          상단 광고 영역 (구글 애드센스 승인 후 활성화)
        </div>
      </div>

      {/* 컨텐츠 */}
      <div className="min-h-[calc(100vh-100px)]">{children}</div>

      {/* 하단 광고 */}
      <div className="sticky bottom-0 z-10 bg-background">
        {/* 
          광고 활성화 시 아래 주석 해제
          <Advertisement adSlot="0987654321" adSize="mobile-banner" />
        */}
        {/* 주석 제거 시 아래 코드 삭제 */}
        <div className="h-[50px] bg-muted/30 flex items-center justify-center text-muted text-xs">
          하단 광고 영역 (구글 애드센스 승인 후 활성화)
        </div>
      </div>
    </>
  );
}
