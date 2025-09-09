/**
 * 구글 애드센스 관련 타입 정의
 */

// 애드센스 광고 설정 객체
export interface AdSenseConfig {
  enable_page_level_ads?: boolean;
  overlays?: {
    bottom?: boolean;
  };
  [key: string]: unknown;
}

// 애드센스 전역 객체 타입
export interface AdsByGoogle {
  push(config?: AdSenseConfig): void;
  length: number;
  [index: number]: AdSenseConfig;
}

// Window 객체 확장
declare global {
  interface Window {
    adsbygoogle: AdsByGoogle;
  }
}

// 애드센스 광고 슬롯 타입
export interface AdSlotConfig {
  'data-ad-client': string;
  'data-ad-slot': string;
  'data-ad-format'?: 'auto' | 'autorelaxed' | 'rectangle' | 'vertical' | 'horizontal';
  'data-full-width-responsive'?: 'true' | 'false';
}

export type AdFormat = 'auto' | 'autorelaxed';
export type AdSize = 'responsive' | 'fixed';
