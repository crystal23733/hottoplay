/**
 * 숫자 그리드 컴포넌트 속성
 * @property {number[]} selectedNumbers - 선택된 숫자 배열
 * @property {function} onNumberSelect - 숫자 선택 핸들러
 * @property {boolean} disabled - 비활성화 여부
 */
export default interface NumberGridProps {
  selectedNumbers: number[];
  onNumberSelect: (number: number) => void;
  disabled?: boolean;
}
