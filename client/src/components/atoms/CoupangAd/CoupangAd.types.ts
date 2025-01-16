/**
 * 쿠팡 파트너스 광고 크기 타입
 */
export type CoupangAdSize = 'banner' | 'medium-banner' | 'rectangle' | 'skyscraper' | 'long-banner';

/**
 * 쿠팡 파트너스 광고 Props 타입 정의
 */
export interface CoupangAdProps {
  /** 광고 크기 */
  size?: CoupangAdSize;
  /** 추가 스타일링을 위한 클래스명 */
  className?: string;
}

/**
 * 쿠팡 파트너스 광고 크기 매핑
 */
export const COUPANG_AD_SIZES = {
  banner: 'w-[728px] h-[90px]', // 데스크톱 배너
  'medium-banner': 'w-[468px] h-[60px]', // 중간 배너
  rectangle: 'w-[300px] h-[250px]', // 사각형 배너
  skyscraper: 'w-[160px] h-[600px]', // 스카이스크래퍼
  'long-banner': 'w-[120px] h-[600px]', // 긴 배너
} as const;
