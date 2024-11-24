'use client';
import NumberGridProps from './NumberGrid.types';
import LottoNumber from '@/components/atoms/LottoNumber/LottoNumber';

/**
 * 1부터 45까지의 로또 번호를 그리드 형태로 표시하고 선택할 수 있는 컴포넌트
 *
 * @component NumberGrid
 * @param {Object} props - 컴포넌트 props
 * @param {number[]} props.selectedNumbers - 현재 선택된 번호들의 배열
 * @param {(number: number) => void} props.onNumberToggle - 번호 선택/해제 시 호출되는 콜백 함수
 * @param {boolean} [props.disabled=false] - 전체 그리드의 비활성화 상태
 * @param {number} [props.maxSelection] - 최대 선택 가능한 번호 개수
 */
const NumberGrid: React.FC<NumberGridProps> = ({
  selectedNumbers,
  onNumberToggle,
  disabled,
  maxSelection,
}) => {
  const isNumberDisabled = (number: number): boolean => {
    if (disabled) return true;
    if (!maxSelection) return false;
    return !selectedNumbers.includes(number) && selectedNumbers.length >= maxSelection;
  };

  const handleNumberClick = (number: number) => {
    if (isNumberDisabled(number)) return;
    onNumberToggle(number);
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {Array.from({ length: 45 }, (_, i) => i + 1).map(number => (
        <LottoNumber
          key={number}
          number={number}
          isSelected={selectedNumbers.includes(number)}
          disabled={isNumberDisabled(number)}
          onClick={() => handleNumberClick(number)}
        />
      ))}
    </div>
  );
};

export default NumberGrid;
