import { PrizeTier } from '@/api/megamillions/megaMillionsDraw.types';

/**
 * 상금 분류 테이블 컴포넌트
 * @property {PrizeTier[]} prizeBreakdown - 상금 분류 테이블 데이터
 */
export default interface PrizeBreakdownTableProps {
  prizeBreakdown: PrizeTier[];
}
