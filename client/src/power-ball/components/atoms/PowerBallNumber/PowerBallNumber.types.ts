/**
 * 파워볼 번호 컴포넌트 속성 타입
 * @property {number} number - 파워볼 번호
 * @property {boolean} isPowerball - 파워볼 번호 여부
 * @property {string} className - 클래스 이름
 */
export default interface PowerBallNumberProps {
  number: number;
  isPowerball?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
