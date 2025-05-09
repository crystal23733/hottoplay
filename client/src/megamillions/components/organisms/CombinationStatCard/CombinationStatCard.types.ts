import { CombinationStatistics } from '@/api/megamillions/megaMillions.types';

/**
 * 번호 조합 통계 카드 컴포넌트의 속성 타입
 * @property {CombinationStatistics} stats - 조합 통계 정보
 * @property {number[]} selectedNumbers - 선택된 번호 배열
 */
export default interface CombinationStatCardProps {
  stats?: CombinationStatistics;
  selectedNumbers: number[];
}
