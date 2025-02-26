/**
 * LottoNumber 컴포넌트의 스타일 상수 정의
 */
export const LottoNumberStyle = {
  /** 기본 스타일 */
  base: 'flex items-center justify-center rounded-full text-white font-bold transition-all duration-200',

  /** 크기별 스타일 매핑 */
  sizes: {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  },

  /** 상태별 스타일 매핑 */
  states: {
    selected: 'ring-2 ring-primary shadow-lg brightness-110',
    default: '',
  },

  /** 상호작용 스타일 */
  interaction: {
    clickable: 'hover:brightness-110 hover:shadow-md cursor-pointer',
    disabled: 'opacity-40 cursor-not-allowed',
  },
} as const;

/**
 *
 * @param {number} num - 번호
 * @returns 번호에 따른 색깔 할당
 */
export const getNumberColor = (num: number): string => {
  if (typeof num !== 'number') return 'bg-gray-200';

  if (num <= 10) return 'bg-[#fbc400]';
  if (num <= 20) return 'bg-[#69c8f2]';
  if (num <= 30) return 'bg-[#ff7272]';
  if (num <= 40) return 'bg-[#aaa]';
  return 'bg-[#b0d840]';
};
