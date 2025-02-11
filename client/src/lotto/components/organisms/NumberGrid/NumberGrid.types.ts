/**
 * NumberGrid 컴포넌트의 Props 타입 정의
 *
 * @interface NumberGridProps
 * @property {number[]} selectedNumbers - 현재 선택된 번호들의 배열
 * @property {(number: number) => void} onNumberToggle - 번호 선택/해제 시 호출되는 콜백 함수
 * @property {boolean} [disabled=false] - 전체 그리드의 비활성화 상태
 * @property {number} [maxSelection] - 최대 선택 가능한 번호 개수
 */
export default interface NumberGridProps {
  selectedNumbers: number[];
  onNumberToggle: (number: number) => void;
  disabled?: boolean;
  maxSelection?: number;
}
