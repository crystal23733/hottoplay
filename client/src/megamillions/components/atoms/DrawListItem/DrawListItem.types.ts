import { MegaMillionsDraw } from '@/api/megamillions/megaMillions.types';

/**
 * 회차 목록 아이템 타입
 * @property {MegaMillionsDraw} draw - 회차 정보
 */
export default interface DrawListItemProps {
  draw: MegaMillionsDraw;
}
