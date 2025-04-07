/**
 * 파워볼 추첨 결과 상세 정보 인터페이스
 * @property {string} date - 추첨 날짜
 * @property {string[]} white_numbers - 흰색 공 번호 배열
 * @property {string} powerball - 파워볼 번호
 * @property {string} power_play - 파워플레이 배수
 * @property {string} era - 규칙 시대
 * @property {Rules} rules - 게임 규칙
 * @property {string} estimated_jackpot - 추정 당첨금
 * @property {string} cash_value - 현금 가치
 * @property {string} jackpot_winners_location - 잭팟 당첨자 위치
 * @property {string} match5_pp_winners_location - 5+PP 당첨자 위치
 * @property {string} match5_winners_location - 5 당첨자 위치
 * @property {PrizeTier[]} prize_breakdown - 상금 분류
 */
export interface DrawDetailResponse {
  date: string;
  white_numbers: string[];
  powerball: string;
  power_play: string;
  era: string;
  rules: Rules;
  estimated_jackpot?: string;
  cash_value?: string;
  jackpot_winners_location?: string;
  match5_pp_winners_location?: string;
  match5_winners_location?: string;
  prize_breakdown?: PrizeTier[];
}

/**
 * 상금 등급 정보 인터페이스
 * @property {string} prize_tier - 상금 등급 (예: "Match 5 + Power Ball")
 * @property {string} winners - 당첨자 수
 * @property {string} prize - 당첨금액
 * @property {string} power_play - 파워플레이 당첨금액
 */
export interface PrizeTier {
  prize_tier: string;
  winners: string;
  prize: string;
  power_play: string;
}

/**
 * 파워볼 게임 규칙 인터페이스
 * @property {number[]} white_ball_range - 흰 공 번호 범위 [최소, 최대]
 * @property {number[]} power_ball_range - 파워볼 번호 범위 [최소, 최대]
 */
export interface Rules {
  white_ball_range: number[];
  power_ball_range: number[];
}

/**
 * 추첨 결과 요약 인터페이스
 * @property {string} date - 추첨 날짜
 * @property {string[]} white_numbers - 흰색 공 번호 배열
 * @property {string} powerball - 파워볼 번호
 * @property {string} power_play - 파워플레이 배수
 * @property {string} estimated_jackpot - 추정 당첨금액
 * @property {string} jackpot_winners - 잭팟 당첨자 수
 */
export interface DrawSummary {
  date: string;
  white_numbers: string[];
  powerball: string;
  power_play: string;
  estimated_jackpot?: string;
  jackpot_winners?: string;
}

/**
 * 추첨 결과 목록 요청 인터페이스
 * @property {number} page - 페이지 번호
 * @property {number} page_size - 페이지 크기
 * @property {string} search_term - 검색어
 * @property {number} year - 연도
 * @property {number} month - 월
 * @property {number} day - 일
 * @property {string} start_date - 시작 날짜 (형식: "Mon, Jan 2, 2006")
 * @property {string} end_date - 종료 날짜 (형식: "Mon, Jan 2, 2006")
 * @property {number} number - 특정 번호
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
 * 추첨 결과 목록 응답 인터페이스
 * @property {DrawSummary[]} draws - 추첨 결과 목록
 * @property {number} total_count - 총 결과 수
 * @property {number} page - 현재 페이지
 * @property {number} page_size - 페이지 크기
 */
export interface DrawListResponse {
  draws: DrawSummary[];
  total_count: number;
  page: number;
  page_size: number;
}

/**
 * 특정 회차 요청 인터페이스
 * @property {string} date - 추첨 날짜
 */
export interface DrawDetailRequest {
  date: string;
}

/**
 * 번호 빈도 응답 인터페이스
 * @property {NumberFrequency[]} white_balls - 흰 공 번호 빈도
 * @property {NumberFrequency[]} power_balls - 파워볼 번호 빈도
 */
export interface NumberFrequencyResponse {
  white_balls: NumberFrequency[];
  power_balls: NumberFrequency[];
}

/**
 * 번호 빈도 인터페이스
 * @property {number} number - 번호
 * @property {number} count - 출현 횟수
 */
export interface NumberFrequency {
  number: number;
  count: number;
}
