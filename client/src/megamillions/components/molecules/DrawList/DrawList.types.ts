import { MegaMillionsDraw } from '@/api/megamillions/megaMillions.types';

/**
 * 메가밀리언스 추첨 결과 목록 컴포넌트 타입
 * @property {MegaMillionsDraw[]} draws - 추첨 결과 목록
 * @property {boolean} loading - 로딩 상태
 */
export default interface DrawListProps {
  draws: MegaMillionsDraw[];
  loading: boolean;
}
