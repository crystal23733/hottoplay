import { DrawSummary } from '@/api/powerBall/powerBallDraw.types';

/**
 * 파워볼 추첨 결과 목록 컴포넌트 타입
 * @property {DrawSummary[]} draws - 추첨 결과 목록
 * @property {boolean} loading - 로딩 상태
 */
export default interface DrawListProps {
  draws: DrawSummary[];
  loading: boolean;
}
