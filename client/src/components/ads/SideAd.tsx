/* eslint-disable react/forbid-dom-props, react/no-unknown-property, @typescript-eslint/no-explicit-any */
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

/**
 * 사이드 광고 컴포넌트
 */
export default function SideAd() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('SideAd 로드 실패:', error);
    }
  }, [pathname]); // pathname 변경 시마다 새로운 광고 로드

  return (
    <div className="w-full flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7408626546715060"
        data-ad-slot="6287625334"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
