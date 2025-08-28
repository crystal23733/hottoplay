import { NumberFrequencyResponse } from '@/api/megamillions/megaMillionsDraw.types';

/**
 * 번호 빈도 차트 컴포넌트 속성
 * @property {NumberFrequencyResponse | null} data - 빈도 데이터 응답
 * @property {boolean} loading - 로딩 상태
 * @property {string | null} error - 에러 메시지
 */
export default interface NumberFrequencyChartsProps {
  data: NumberFrequencyResponse | null;
  loading: boolean;
  error: string | null;
}
