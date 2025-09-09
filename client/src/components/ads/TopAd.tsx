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
 * 상단 광고 컴포넌트 (Up-Down)
 */
export default function TopAd() {
  useEffect(() => {
    try {
      (window.adsbygoogle =
        window.adsbygoogle ||
        ({
          push: () => {},
          length: 0,
        } as AdsByGoogle)).push();
    } catch (err) {
      console.error('TopAd 로드 오류:', err);
    }
  }, []);

  return (
    <div className="w-full flex justify-center py-2">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={env.adsense.clientId}
        data-ad-slot={env.adsense.topAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
