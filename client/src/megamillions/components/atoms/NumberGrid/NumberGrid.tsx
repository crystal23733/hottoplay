import { cn } from '@/lib/utils';
import NumberGridProps from './NumberGrid.types';
import { memo } from 'react';

/**
 * 메가밀리언스 번호 선택을 위한 그리드 컴포넌트
 * @example
 * <NumberGrid
 *   selectedNumbers={[1, 2, 3]}
 *   onNumberSelect={(num) => handleSelect(num)}
 * />
 */
const NumberGrid: React.FC<NumberGridProps> = ({ selectedNumbers, onNumberSelect, disabled }) => {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-2">
      {Array.from({ length: 69 }, (_, i) => i + 1).map(number => (
        <button
          key={number}
          onClick={() => !disabled && onNumberSelect(number)}
          type="button"
          disabled={disabled}
          className={cn(
            'aspect-square rounded-full text-sm font-medium',
            'transition-all duration-200',
            'hover:scale-110 focus-visible:scale-110',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            selectedNumbers.includes(number)
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted hover:bg-muted/80',
            disabled && 'opacity-50 cursor-not-allowed hover:scale-100'
          )}
          aria-label={`Number ${number}`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default memo(NumberGrid);
