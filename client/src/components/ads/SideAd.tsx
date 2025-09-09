/* eslint-disable react/forbid-dom-props, react/no-unknown-property */
'use client';

import { useEffect } from 'react';
import env from '@/config/meta/env';
import type { AdsByGoogle } from '@/types/adsense';

declare global {
  interface Window {
    adsbygoogle: AdsByGoogle;
  }
}

/**
 * 사이드 광고 컴포넌트
 */
export default function SideAd() {
  useEffect(() => {
    try {
      // 실제 광고 ID가 설정된 경우에만 광고 로드
      if (env.adsense.clientId && !env.adsense.clientId.includes('placeholder')) {
        (window.adsbygoogle =
          window.adsbygoogle ||
          ({
            push: () => {},
            length: 0,
          } as AdsByGoogle)).push();
      }
    } catch (err) {
      console.error('SideAd 로드 오류:', err);
    }
  }, []);

  // 광고 설정이 없으면 렌더링하지 않음
  if (!env.adsense.clientId || env.adsense.clientId.includes('placeholder')) {
    return null;
  }

  return (
    <div className="w-full flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={env.adsense.clientId}
        data-ad-slot={env.adsense.sideAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
