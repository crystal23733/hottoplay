'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { AD_SIZES } from '@/constants/AD_SIZES';

/**
 * 구글 애드센스 광고 컴포넌트
 * @param {AdvertisementProps} props - 광고 컴포넌트 속성
 * @returns {React.ReactNode} 광고 컴포넌트
 */
interface AdvertisementProps {
  adSlot: string;
  adSize: keyof typeof AD_SIZES;
  className?: string;
}

export default function Advertisement({ adSlot, adSize, className }: AdvertisementProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // 광고 초기화 및 로드
    const initAd = () => {
      try {
        if (adRef.current && adRef.current.children.length === 0) {
          // AdSense 코드가 로드된 경우에만 광고 렌더링
          if (typeof window !== 'undefined' && window.adsbygoogle) {
            const ins = document.createElement('ins');
            ins.className = 'adsbygoogle';
            ins.style.display = 'block';

            // data-ad-client은 실제 애드센스 ID로 교체해야 함
            ins.setAttribute('data-ad-client', 'ca-pub-XXXXXXXXXXXXXXXX');
            ins.setAttribute('data-ad-slot', adSlot);
            ins.setAttribute('data-ad-format', 'auto');
            ins.setAttribute('data-full-width-responsive', 'true');

            adRef.current.appendChild(ins);
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        }
      } catch (error) {
        console.error('Advertisement loading error:', error);
      }
    };

    // 광고 로드
    initAd();

    // 페이지 변경 시 새로운 광고 로드
    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = '';
      }
    };
  }, [adSlot, pathname]); // pathname을 의존성에 추가하여 페이지 변경 시 새로운 광고 로드

  return (
    <div
      ref={adRef}
      className={cn(
        'bg-muted/30 flex items-center justify-center text-muted mx-auto',
        AD_SIZES[adSize],
        className
      )}
    >
      <div className="text-xs text-center p-2">
        Advertisement
        <br />
        <span className="text-[10px]">(광고는 사이트 운영 비용에 사용됩니다)</span>
      </div>
    </div>
  );
}
