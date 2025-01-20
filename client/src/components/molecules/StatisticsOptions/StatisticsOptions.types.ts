export type StatisticsType = 'hot' | 'cold' | 'bonus' | 'weighted';

/**
 * 통계 기반 번호 생성 옵션 컴포넌트 속성
 * @param value - 선택된 옵션
 * @param onChange - 옵션 변경 함수
 */
export default interface StatisticsOptionsProps {
  value: StatisticsType;
  onChange: (value: StatisticsType) => void;
}
