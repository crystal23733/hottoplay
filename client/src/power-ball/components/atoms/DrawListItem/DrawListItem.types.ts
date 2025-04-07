import { DrawSummary } from '@/api/powerBall/powerBallDraw.types';

/**
 * 회차 목록 아이템 타입
 * @property {DrawSummary} draw - 회차 정보
 */
export default interface DrawListItemProps {
  draw: DrawSummary;
}
