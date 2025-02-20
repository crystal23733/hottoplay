/**
 * 파워볼 번호 세트 컴포넌트 타입
 * @property whiteNumbers 흰색 번호 배열(5개)
 * @property powerball 파워볼 번호
 * @property setNumber 세트 번호 (여러 세트 중 몇 번째인지)
 * @property animationDelay 애니메이션 지연 시간 (ms)
 */
export default interface PowerBallSetProps {
  whiteNumbers: number[];
  powerball: number;
  setNumber: number;
  animationDelay?: number;
}
