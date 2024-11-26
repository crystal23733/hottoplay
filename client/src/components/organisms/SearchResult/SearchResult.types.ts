/**
 * 로또 회차별 상세 정보
 *
 * @interface LottoRoundDetail
 * @property {number} drwNo - 회차 번호
 * @property {string} drwNoDate - 추첨 날짜
 * @property {number[]} numbers - 당첨 번호 배열 (drwtNo1~6)
 * @property {number} bnusNo - 보너스 번호
 * @property {number} totSellamnt - 총 판매 금액
 * @property {number} firstWinamnt - 1등 당첨금
 * @property {number} firstPrzwnerCo - 1등 당첨자 수
 * @property {number} firstAccumamnt - 1등 누적 당첨금
 */
export interface LottoRoundDetail {
  totSellamnt: number; // 총 판매 금액
  returnValue: string; // API 응답 상태 (예: 'success')
  drwNoDate: string; // 추첨 날짜
  firstWinamnt: number; // 1등 당첨금
  firstPrzwnerCo: number; // 1등 당첨자 수
  bnusNo: number; // 보너스 번호
  firstAccumamnt: number; // 1등 누적 당첨금
  drwNo: number; // 회차 번호
  numbers: number[]; // 당첨 번호 배열 (drwtNo1~6)
}

/**
 * SearchResult 컴포넌트의 Props 타입 정의
 *
 * @interface SearchResultProps
 * @property {LottoRoundDetail[]} results - 검색된 회차별 상세 결과 배열
 * @property {string} [title='회차별 당첨 번호'] - 결과 섹션의 제목
 */
export interface SearchResultProps {
  results: LottoRoundDetail;
  title?: string;
}
