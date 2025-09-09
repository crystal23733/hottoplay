/* eslint-disable react/forbid-dom-props, react/no-unknown-property, @typescript-eslint/no-explicit-any */
'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

/**
 * 상단 광고 컴포넌트 (Up-Down)
 */
export default function TopAd() {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className="w-full flex justify-center py-2">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7408626546715060"
        data-ad-slot="9600184389"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
