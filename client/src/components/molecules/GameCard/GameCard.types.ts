/**
 * 게임 카드 인터페이스
 * @property {string} title - 타이틀
 * @property {string} description - 설명
 * @property {string} bgColor - 배경 색상
 * @property {string} href - 링크
 * @property {string} country - 국가
 * @property {string} language - 언어
 */
export default interface GameCardProps {
  title: string;
  description: string;
  bgColor: string;
  href: string;
  country: string;
  language: string;
}
