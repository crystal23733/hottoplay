/* eslint-disable react/forbid-dom-props, react/no-unknown-property */
'use client';

import { useEffect } from 'react';
import env from '@/config/meta/env';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

/**
 * 상단 광고 컴포넌트 (Up-Down)
 */
export default function TopAd() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
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
