/**
 * 파워볼 생성기 컴포넌트 속성 타입
 * @property {number} count - 생성할 번호 세트 수
 * @property {function} onCountChange - 카운트 변경 핸들러
 * @property {function} onGenerate - 번호 생성 핸들러
 * @property {boolean} isLoading - 로딩 상태
 * @property {boolean} disabled - 비활성화 여부
 */
export default interface PowerBallGeneratorProps {
  count: number;
  onCountChange: (count: number) => void;
  onGenerate: () => void;
  isLoading: boolean;
  disabled?: boolean;
}
