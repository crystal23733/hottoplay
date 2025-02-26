/**
 * 게임 인터페이스
 * @param {string} title - 타이틀
 * @param {string} description - 설명
 * @param {string} bgColor - 배경 색상
 * @param {string} href - 링크
 * @param {string} country - 국가
 * @param {string} language - 언어
 */
export default interface Game {
  title: string;
  description: string;
  bgColor: string;
  href: string;
  country: string;
  language: string;
}
