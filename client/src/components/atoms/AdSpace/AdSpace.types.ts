/**
 * 광고 공간 컴포넌트의 Props 타입 정의
 */
export interface AdSpaceProps {
  /** 광고 영역 식별 라벨 */
  label: string;
  /** 광고 공간의 높이 */
  height?: 'sm' | 'md' | 'lg';
  /** 추가 스타일링을 위한 클래스명 */
  className?: string;
}

/**
 * 광고 공간 높이 매핑
 */
export const AD_SPACE_HEIGHTS = {
  sm: 'h-[100px]',
  md: 'h-[120px]',
  lg: 'h-[300px]',
} as const;
