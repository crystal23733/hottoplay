/**
 * 번호와 빈도수 정보를 담은 인터페이스
 *
 * @interface PopularNumber
 * @property {number} number - 로또 번호
 * @property {number} frequency - 해당 번호가 나온 횟수
 */
export interface PopularNumber {
  number: number;
  frequency: number;
}

/**
 * PopularNumbersResult 컴포넌트의 Props 타입 정의
 *
 * @interface PopularNumbersResultProps
 * @property {PopularNumber[]} numbers - 번호와 빈도수 정보를 담은 배열
 * @property {string} [title='가장 많이 나온 번호'] - 결과 섹션의 제목
 */
export interface PopularNumbersResultProps {
  numbers: PopularNumber[];
  title?: string;
}
