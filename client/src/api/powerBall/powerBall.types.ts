/**
 * 파워볼 번호 생성 요청 타입
 * @property method - 생성 방법 (예: "quick", "manual")
 * @property count - 생성할 번호 개수
 */
export interface PowerBallGenerateRequest {
  method: string;
  count: number;
}

/**
 * 파워볼 번호 생성 응답 타입
 * @property numbers - 생성된 번호 배열
 * @property white_numbers - 흰색 번호 배열
 * @property powerball - 빨간색 번호
 */
export interface PowerBallNumber {
  white_numbers: number[];
  powerball: number;
}

/**
 * 파워볼 번호 생성 응답 타입
 * @property numbers - 생성된 번호 배열
 */
export interface PowerBallGenerateResponse {
  numbers: PowerBallNumber[];
}

// * 파워볼 통계 로직 인터페이스
/**
 * 단일 번호 통계 정보
 * @property {number} number - 선택된 번호
 * @property {number} white_ball_count - 흰 공 추첨 횟수
 * @property {number} power_ball_count - 파워볼 추첨 횟수
 * @property {string} last_white_ball_date - 흰 공 마지막 추첨 날짜
 * @property {string} last_power_ball_date - 파워볼 마지막 추첨 날짜
 */
export interface NumberStatistics {
  number: number;
  white_ball_count: number;
  power_ball_count: number;
  last_white_ball_date: string;
  last_power_ball_date: string;
}

/**
 * 번호 조합의 통계 정보
 * @property {number[]} numbers - 선택된 번호 배열
 * @property {number} appearance_count - 해당 조합이 나온 횟수
 * @property {string} last_appearance - 마지막으로 나온 날짜
 */
export interface CombinationStatistics {
  numbers: number[];
  appearance_count: number;
  last_appearance: string;
}

/**
 * 통계 API 응답 데이터
 * @property {NumberStatistics[]} 각 번호별 통계 정보
 * @property {CombinationStatistics[]} 전체 조합의 통계 정보
 */
export interface StatisticsResponse {
  numberStats: NumberStatistics[];
  combinationStats: CombinationStatistics;
}

/**
 * 통계 API 요청 데이터
 * @property {number[]} number - 통계를 조회할 번호 배열
 */
export interface StatisticsRequest {
  numbers: number[];
}
