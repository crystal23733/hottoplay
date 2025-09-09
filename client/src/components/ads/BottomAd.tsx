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
 * 하단 광고 컴포넌트 (autorelaxed)
 */
export default function BottomAd() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('BottomAd 로드 오류:', err);
    }
  }, []);

  return (
    <div className="w-full flex justify-center py-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="autorelaxed"
        data-ad-client={env.adsense.clientId}
        data-ad-slot={env.adsense.bottomAdSlot}
      />
    </div>
  );
}
