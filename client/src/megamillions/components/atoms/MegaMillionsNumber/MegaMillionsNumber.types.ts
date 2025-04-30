/**
 * 메가밀리언스 번호 컴포넌트 속성 타입
 * @property {number} number - 메가밀리언스 번호
 * @property {boolean} isMegaBall - 메가볼 여부
 * @property {string} className - 클래스 이름
 */
export default interface MegaMillionsNumberProps {
  number: number;
  isMegaBall?: boolean;
  className?: string;
  style?: React.CSSProperties;
}