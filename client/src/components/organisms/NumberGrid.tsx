'use client';

import { Toggle } from '@/ui/Toggle';

/**
 * 1부터 45까지의 로또 번호를 그리드 형태로 표시하고 선택할 수 있는 컴포넌트
 *
 * @component
 * @param {Object} props
 * @param {number[]} props.selectedNumbers - 현재 선택된 번호들의 배열
 * @param {(number: number) => void} props.onNumberToggle - 번호 선택/해제 시 호출되는 콜백 함수
 *
 * @example
 * ```tsx
 * <NumberGrid
 *   selectedNumbers={[1, 2, 3]}
 *   onNumberToggle={(num) => console.log(num)}
 * />
 * ```
 */
interface NumberGridProps {
  selectedNumbers: number[];
  onNumberToggle: (number: number) => void;
}

export default function NumberGrid({ selectedNumbers, onNumberToggle }: NumberGridProps) {
  return (
    <div className="grid grid-cols-7 gap-2">
      {Array.from({ length: 45 }, (_, i) => i + 1).map(number => (
        <Toggle
          key={number}
          className="h-10 w-10"
          pressed={selectedNumbers.includes(number)}
          onPressedChange={() => onNumberToggle(number)}
        >
          {number}
        </Toggle>
      ))}
    </div>
  );
}
