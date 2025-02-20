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
