/**
 * 구글 애드센스 권장 광고 크기 매핑
 * leaderboard: 728x90 - 데스크톱 상단
 * large-rectangle: 336x280 - 콘텐츠 중간
 * medium-rectangle: 300x250 - 콘텐츠 중간/끝
 * mobile-banner: 300x50 - 모바일 상단/하단
 * skyscraper: 160x600 - 사이드바
 */
export const AD_SIZES = {
  leaderboard: 'w-[728px] h-[90px]',
  'large-rectangle': 'w-[336px] h-[280px]',
  'medium-rectangle': 'w-[300px] h-[250px]',
  'mobile-banner': 'w-[300px] h-[50px]',
  skyscraper: 'w-[160px] h-[600px]',
} as const;
