// client/src/api/megamillions/megaMillionsDraw.types.ts에 추가할 타입
/**
 * 메가밀리언스 추첨 결과 상세 응답 인터페이스
 * @property {string} draw_date - 추첨 날짜
 * @property {number[]} white_numbers - 메인 번호
 * @property {number} mega_ball - 메가볼
 * @property {string | null} mega_plier - 메가볼 곱수
 * @property {string | null} estimated_jackpot - 추정 상금
 * @property {string | null} cash_option - 현금 상금
 * @property {number | null} jackpot_winners - 상금 당첨자 수
 */
export interface DrawDetailResponse {
  draw_date: string;
  white_numbers: number[];
  mega_ball: number;
  mega_plier: string | null;
  estimated_jackpot?: string;
  cash_option?: string;
  jackpot_winners?: number;
  prize_breakdown?: PrizeTier[];
  era: string;
  rules: Rules;
}

/**
 * 상금 등급 정보 인터페이스
 * @property {string} category - 상금 등급
 * @property {string} match - 매치 수
 * @property {string} prize - 상금
 * @property {number} winners - 당첨자 수
 * @property {string} prize_fund - 상금 자금
 */
export interface PrizeTier {
  category: string;
  match: string;
  prize: string;
  winners: number;
  prize_fund: string;
}

/**
 * 메가밀리언스 게임 규칙 인터페이스
 * @property {number[]} white_ball_range - 메인 번호 범위
 * @property {number[]} mega_ball_range - 메가볼 번호 범위
 * @property {string} start_date - 게임 시작 날짜
 * @property {string | null} end_date - 게임 종료 날짜
 */
export interface Rules {
  white_ball_range: number[];
  mega_ball_range: number[];
  start_date: string;
  end_date: string | null;
}

/**
 * 메가밀리언스 번호 빈도 응답 인터페이스
 * @property {NumberFrequency[]} white_balls - 메인 번호 빈도
 * @property {NumberFrequency[]} mega_balls - 메가볼 빈도
 */
export interface NumberFrequencyResponse {
  white_balls: NumberFrequency[];
  mega_balls: NumberFrequency[];
}

/**
 * 번호 빈도 인터페이스
 * @property {number} number - 번호
 * @property {number} count - 빈도
 */
export interface NumberFrequency {
  number: number;
  count: number;
}
