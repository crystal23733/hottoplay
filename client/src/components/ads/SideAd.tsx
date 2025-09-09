/* eslint-disable react/forbid-dom-props, react/no-unknown-property, @typescript-eslint/no-explicit-any */
'use client';

import { useEffect } from 'react';
import env from '@/config/meta/env';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

/**
 * 사이드 광고 컴포넌트
 */
export default function SideAd() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('SideAd 로드 오류:', err);
    }
  }, []);

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
