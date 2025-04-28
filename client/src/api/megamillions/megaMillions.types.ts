/**
 * 메가밀리언 번호 생성 요청 타입
 * @property method - 생성 방법 (예: "random", "hot", "cold", "unique")
 * @property count - 생성할 번호 개수
 */
export interface MegaMillionsGenerateRequest {
  method: string;
  count: number;
}

/**
 * 메가밀리언 번호 구조 타입
 * @property white_numbers - 흰색 번호 배열 (5개 번호, 1-70 범위)
 * @property mega_ball - 메가볼 번호 (1-25 범위)
 */
export interface MegaMillionsNumber {
  white_numbers: number[];
  mega_ball: number;
}

/**
 * 메가밀리언 번호 생성 응답 타입
 * @property numbers - 생성된 번호 배열
 */
export interface MegaMillionsGenerateResponse {
  numbers: MegaMillionsNumber[];
}

/**
 * 단일 번호 통계 정보
 * @property {number} number - 선택된 번호
 * @property {number} white_ball_count - 흰 공 추첨 횟수
 * @property {number} mega_ball_count - 메가볼 추첨 횟수
 * @property {string} last_white_ball_date - 흰 공 마지막 추첨 날짜
 * @property {string} last_mega_ball_date - 메가볼 마지막 추첨 날짜
 */
export interface NumberStatistics {
  number: number;
  white_ball_count: number;
  mega_ball_count: number;
  last_white_ball_date: string;
  last_mega_ball_date: string;
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
 * @property {NumberStatistics[]} numberStats - 각 번호별 통계 정보
 * @property {CombinationStatistics} combinationStats - 전체 조합의 통계 정보
 */
export interface StatisticsResponse {
  numberStats: NumberStatistics[];
  combinationStats: CombinationStatistics;
}

/**
 * 통계 API 요청 데이터
 * @property {number[]} numbers - 통계를 조회할 번호 배열
 */
export interface StatisticsRequest {
  numbers: number[];
}

/**
 * 추첨 결과 데이터
 * @property {string} draw_date - 추첨 날짜
 * @property {number[]} white_numbers - 흰색 번호 배열
 * @property {number} mega_ball - 메가볼 번호
 * @property {string} multiplier - 당첨금 배수
 */
export interface MegaMillionsDraw {
  draw_date: string;
  white_numbers: number[];
  mega_ball: number;
  multiplier: string;
}

/**
 * 추첨 결과 목록 응답 타입
 * @property {MegaMillionsDraw[]} draws - 추첨 결과 목록
 */
export interface MegaMillionsDrawsResponse {
  draws: MegaMillionsDraw[];
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
}/**
 * 메가밀리언 번호 생성 요청 타입
 * @property method - 생성 방법 (예: "random", "hot", "cold", "unique")
 * @property count - 생성할 번호 개수
 */
export interface MegaMillionsGenerateRequest {
  method: string;
  count: number;
}

/**
 * 메가밀리언 번호 구조 타입
 * @property white_numbers - 흰색 번호 배열 (5개 번호, 1-70 범위)
 * @property mega_ball - 메가볼 번호 (1-25 범위)
 */
export interface MegaMillionsNumber {
  white_numbers: number[];
  mega_ball: number;
}

/**
 * 메가밀리언 번호 생성 응답 타입
 * @property numbers - 생성된 번호 배열
 */
export interface MegaMillionsGenerateResponse {
  numbers: MegaMillionsNumber[];
}

/**
 * 단일 번호 통계 정보
 * @property {number} number - 선택된 번호
 * @property {number} white_ball_count - 흰 공 추첨 횟수
 * @property {number} mega_ball_count - 메가볼 추첨 횟수
 * @property {string} last_white_ball_date - 흰 공 마지막 추첨 날짜
 * @property {string} last_mega_ball_date - 메가볼 마지막 추첨 날짜
 */
export interface NumberStatistics {
  number: number;
  white_ball_count: number;
  mega_ball_count: number;
  last_white_ball_date: string;
  last_mega_ball_date: string;
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
 * @property {NumberStatistics[]} numberStats - 각 번호별 통계 정보
 * @property {CombinationStatistics} combinationStats - 전체 조합의 통계 정보
 */
export interface StatisticsResponse {
  numberStats: NumberStatistics[];
  combinationStats: CombinationStatistics;
}

/**
 * 통계 API 요청 데이터
 * @property {number[]} numbers - 통계를 조회할 번호 배열
 */
export interface StatisticsRequest {
  numbers: number[];
}

/**
 * 추첨 결과 데이터
 * @property {string} draw_date - 추첨 날짜
 * @property {number[]} white_numbers - 흰색 번호 배열
 * @property {number} mega_ball - 메가볼 번호
 * @property {string} multiplier - 당첨금 배수
 */
export interface MegaMillionsDraw {
  draw_date: string;
  white_numbers: number[];
  mega_ball: number;
  multiplier: string;
}

/**
 * 추첨 결과 목록 응답 타입
 * @property {MegaMillionsDraw[]} draws - 추첨 결과 목록
 */
export interface MegaMillionsDrawsResponse {
  draws: MegaMillionsDraw[];
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