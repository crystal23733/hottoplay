// client/src/api/megamillions/megaMillionsDraw.types.ts
import { MegaMillionsDraw } from './megaMillions.types';

/**
 * 추첨 결과 목록 요청 타입
 * @property {number} page - 페이지 번호
 * @property {number} page_size - 페이지 크기
 * @property {string} [search_term] - 검색어 (선택적)
 * @property {number} [year] - 연도 필터 (선택적)
 * @property {number} [month] - 월 필터 (선택적)
 * @property {number} [day] - 일 필터 (선택적)
 * @property {string} [start_date] - 시작 날짜 필터 (선택적)
 * @property {string} [end_date] - 종료 날짜 필터 (선택적)
 * @property {number} [number] - 번호 필터 (선택적)
 */
export interface DrawListRequest {
  page: number;
  page_size: number;
  search_term?: string;
  year?: number;
  month?: number;
  day?: number;
  start_date?: string;
  end_date?: string;
  number?: number;
}

/**
 * 추첨 결과 목록 응답 타입
 * @property {MegaMillionsDraw[]} draws - 추첨 결과 목록
 * @property {number} total_count - 전체 결과 수
 * @property {number} page - 현재 페이지 번호
 * @property {number} page_size - 페이지 크기
 */
export interface DrawListResponse {
  draws: MegaMillionsDraw[];
  total_count: number;
  page: number;
  page_size: number;
}

/**
 * 추첨 결과 상세 요청 타입
 * @property {string} date - 조회할 날짜 (YYYY-MM-DD 형식)
 */
export interface DrawDetailRequest {
  date: string;
}

/**
 * 추첨 결과 상세 응답 타입
 * @property {MegaMillionsDraw} draw - 추첨 결과 상세 정보
 * @property {PrizeBreakdown[]} prize_breakdown - 당첨금 정보
 */
export interface DrawDetailResponse {
  draw: MegaMillionsDraw;
  prize_breakdown: PrizeBreakdown[];
}

/**
 * 당첨금 정보 타입
 * @property {string} prize_category - 당첨 종류
 * @property {string} match - 매치 패턴
 * @property {string} prize - 당첨금액
 * @property {number} winners - 당첨자 수
 * @property {string} prize_fund - 당첨금 총액
 */
export interface PrizeBreakdown {
  category: string;
  match: string;
  prize: string;
  winners: number;
  prize_fund: string;
}

/**
 * 번호 빈도 데이터
 * @property {number} number - 번호
 * @property {number} frequency - 출현 빈도 (횟수)
 * @property {number} percentage - 출현 확률 (%)
 */
export interface NumberFrequency {
  number: number;
  frequency: number;
  percentage: number;
}

/**
 * 번호 빈도 응답 타입
 * @property {NumberFrequency[]} white_ball_frequency - 흰 공 빈도 데이터
 * @property {NumberFrequency[]} mega_ball_frequency - 메가볼 빈도 데이터
 */
export interface NumberFrequencyResponse {
  white_ball_frequency: NumberFrequency[];
  mega_ball_frequency: NumberFrequency[];
}
