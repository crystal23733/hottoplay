import { useState, useEffect } from 'react';

/**
 * 면책조항 위치 계산을 위한 커스텀 훅
 * @returns {Object} 디바이스 타입 정보
 */
export default function useDisclaimerPosition() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 1280);
    };

    // 초기 상태 설정
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isMobileOrTablet,
    // 모바일 환경에서는 광고 위에 위치 (50px)
    // 태블릿 환경에서는 광고 위에 위치 (90px)
    // 데스크톱 환경에서는 하단에 위치
    positionClass: isMobileOrTablet
      ? 'bottom-[calc(50px+0.5rem)] md:bottom-[calc(90px+0.5rem)] left-0 right-0'
      : 'bottom-4 left-0 right-0',
  };
}
