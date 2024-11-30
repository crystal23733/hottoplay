/**
 * LottoResult 컴포넌트의 Props 타입 정의
 *
 * @interface LottoResultProps
 * @property {number[] | null} numbers - 표시할 로또 번호 배열
 * @property {string} [title='생성된 번호'] - 결과 섹션의 제목
 * @property {'sm' | 'md' | 'lg'} [size='lg'] - 번호 원의 크기
 */
export default interface LottoResultProps {
  numbers: number[] | null;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
}
