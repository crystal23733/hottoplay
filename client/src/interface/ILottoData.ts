/**
 * 로또 회차별 데이터 인터페이스
 * @interface ILottoData
 */
export default interface ILottoRoundData {
  totSellamnt: number; // 총 판매 금액
  returnValue: string; // API 응답 상태 (예: 'success')
  drwNoDate: string; // 추첨 날짜
  firstWinamnt: number; // 1등 당첨금
  drwtNo6: number; // 당첨 번호 6번
  drwtNo4: number; // 당첨 번호 4번
  firstPrzwnerCo: number; // 1등 당첨자 수
  drwtNo5: number; // 당첨 번호 5번
  bnusNo: number; // 보너스 번호
  firstAccumamnt: number; // 1등 누적 당첨금
  drwNo: number; // 회차 번호
  drwtNo2: number; // 당첨 번호 2번
  drwtNo3: number; // 당첨 번호 3번
  drwtNo1: number; // 당첨 번호 1번
}
