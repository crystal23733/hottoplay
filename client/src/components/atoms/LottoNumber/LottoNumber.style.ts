/**
 * LottoNumber 컴포넌트의 스타일 상수 정의
 */
export default {
  /** 기본 스타일 */
  base: 'flex items-center justify-center rounded-full transition-colors',

  /** 크기별 스타일 매핑 */
  sizes: {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  },

  /** 상태별 스타일 매핑 */
  states: {
    selected: 'bg-primary text-primary-foreground',
    default: 'bg-muted hover:bg-muted/80',
  },

  /** 상호작용 스타일 */
  interaction: {
    clickable: 'cursor-pointer',
    disabled: 'opacity-50 cursor-not-allowed',
  },
} as const;
