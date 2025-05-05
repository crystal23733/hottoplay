import { NumberFrequency } from '@/api/powerBall/powerBallDraw.types';

/**
 * 번호 빈도 차트 컴포넌트 속성
 * @property {NumberFrequency[]} data - 빈도 데이터
 * @property {string} title - 차트 제목
 * @property {string} color - 차트 색상
 * @property {string} label - 데이터 레이블
 * @property {number} height - 차트 높이
 */
export default interface FrequencyChartProps {
  data: NumberFrequency[];
  title: string;
  color: string;
  label?: string;
  height?: number;
}
