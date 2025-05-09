/**
 * 메가밀리언 번호 인터페이스
 * @property {number[]} white_numbers - 메가밀리언 번호
 * @property {number} mega_ball - 메가밀리언 보너스 번호
 */
interface MegaMillionsNumber {
  white_numbers: number[];
  mega_ball: number;
}

/**
 * 메가밀리언 결과 인터페이스
 * @property {MegaMillionsNumber[]} numbers - 생성된 번호 세트 배열
 * @property {string} method - 생성 방식
 * @property {boolean} isLoading - 로딩 상태
 */
export default interface MegaMillionsResultsProps {
  numbers: MegaMillionsNumber[];
  method: string;
}
