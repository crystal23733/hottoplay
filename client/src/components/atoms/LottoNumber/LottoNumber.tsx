import { LOTTO_NUMBER_SIZES, LottoNumberProps } from './LottoNumber.types';

/**
 * 단일 로또 번호를 원형으로 표시하는 컴포넌트
 *
 * @component LottoNumber
 * @param {Object} props - 컴포넌트 props
 * @param {number | string} props.number - 표시할 로또 번호 또는 특수 문자
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - 번호 원의 크기
 * @param {boolean} [props.isSelected=false] - 번호의 선택 상태
 * @param {boolean} [props.disabled=false] - 번호의 비활성화 상태
 * @param {() => void} [props.onClick] - 번호 클릭 시 실행될 콜백 함수
 * @param {string} [props.className] - 추가 스타일링을 위한 클래스명
 *
 * @example
 * // 기본 사용
 * <LottoNumber number={1} />
 *
 * // 선택된 상태의 큰 크기 번호
 * <LottoNumber
 *   number={1}
 *   size="lg"
 *   isSelected
 *   onClick={() => console.log('번호 1이 선택됨')}
 * />
 *
 * // 비활성화된 작은 크기 번호
 * <LottoNumber
 *   number="?"
 *   size="sm"
 *   disabled
 * />
 */
const LottoNumber: React.FC<LottoNumberProps> = ({
  number,
  size = 'md',
  isSelected = false,
  disabled = false,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full ${LOTTO_NUMBER_SIZES[size]} ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'} ${onClick && !disabled ? 'cursor-pointer hover:bg-muted/80' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={!disabled ? onClick : undefined}
    >
      {number}
    </div>
  );
};

export default LottoNumber;
