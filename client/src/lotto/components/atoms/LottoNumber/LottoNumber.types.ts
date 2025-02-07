/**
 * 로또 번호 컴포넌트의 Props 타입 정의
 *
 * @interface LottoNumberProps
 * @property {number | string} number - 표시할 로또 번호 또는 특수 문자(예: '?')
 * @property {'sm' | 'md' | 'lg'} [size='md'] - 번호 원의 크기 (sm: 32px, md: 40px, lg: 48px)
 * @property {boolean} [isSelected=false] - 번호의 선택 상태 여부
 * @property {boolean} [disabled=false] - 번호의 비활성화 상태 여부
 * @property {() => void} [onClick] - 번호 클릭 시 실행될 콜백 함수
 * @property {string} [className] - 추가 스타일링을 위한 클래스명
 */
export default interface LottoNumberProps {
  number: number | string;
  size?: 'sm' | 'md' | 'lg';
  isSelected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}
