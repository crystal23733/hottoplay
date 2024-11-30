/**
 * 광고 레이아웃 컴포넌트의 Props 타입 정의
 */
export default interface AdLayoutProps {
  /** 메인 컨텐츠 */
  children: React.ReactNode;
  /** 모바일 광고 표시 여부 */
  showMobileAd?: boolean;
}
