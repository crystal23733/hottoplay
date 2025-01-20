export type PatternType = 'sequential' | 'oddeven' | 'distributed';

/**
 * 패턴 기반 번호 생성 옵션 컴포넌트 속성
 * @param value - 선택된 옵션
 */
export default interface PatternOptionsProps {
  value: PatternType;
  onChange: (value: PatternType) => void;
}
