/* eslint-disable react/forbid-dom-props, react/no-unknown-property, @typescript-eslint/no-explicit-any */
'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

/**
 * 오른쪽 사이드 광고 컴포넌트 (side-right)
 */
export default function SideRightAd() {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className="w-full flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7408626546715060"
        data-ad-slot="1647642365"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
