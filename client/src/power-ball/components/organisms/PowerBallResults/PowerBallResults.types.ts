/**
 * 파워볼 번호 인터페이스
 * @property {number[]} white_numbers - 파워볼 번호
 * @property {number} powerball - 파워볼 보너스 번호
 */
interface PowerBallNumber {
  white_numbers: number[];
  powerball: number;
}

/**
 * 파워볼 결과 인터페이스
 * @property {PowerBallNumber[]} numbers - 생성된 번호 세트 배열
 * @property {string} method - 생성 방식
 * @property {boolean} isLoading - 로딩 상태
 */
export default interface PowerBallResultsProps {
  numbers: PowerBallNumber[];
  method: string;
}
