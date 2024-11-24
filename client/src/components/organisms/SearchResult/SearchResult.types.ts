/**
 * 로또 회차별 상세 정보
 *
 * @interface LottoRoundDetail
 * @property {number} round - 회차 번호 (drwNo)
 * @property {string} date - 추첨일 (drwNoDate)
 * @property {number[]} numbers - 당첨 번호 배열 (drwtNo1~6)
 * @property {number} bonus - 보너스 번호 (bnusNo)
 * @property {number} totalSales - 총 판매금액 (totSellamnt)
 * @property {number} firstPrize - 1등 당첨금액 (firstWinamnt)
 * @property {number} firstWinnerCount - 1등 당첨자 수 (firstPrzwnerCo)
 * @property {number} firstAccumulated - 1등 당첨금 총액 (firstAccumamnt)
 */
export interface LottoRoundDetail {
  round: number;
  date: string;
  numbers: number[];
  bonus: number;
  totalSales: number;
  firstPrize: number;
  firstWinnerCount: number;
  firstAccumulated: number;
}

/**
 * SearchResult 컴포넌트의 Props 타입 정의
 *
 * @interface SearchResultProps
 * @property {LottoRoundDetail[]} results - 검색된 회차별 상세 결과 배열
 * @property {string} [title='회차별 당첨 번호'] - 결과 섹션의 제목
 */
export interface SearchResultProps {
  results: LottoRoundDetail[];
  title?: string;
}
