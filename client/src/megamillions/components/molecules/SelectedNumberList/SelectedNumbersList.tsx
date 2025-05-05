import { memo } from 'react';
import SelectedNumberBadge from '../../atoms/SelectedNumberBadge/SelectedNumberBadge';
import MESSAGES from './constants/messages';
import SelectedNumberListProps from './SelectedNumberList.types';

/**
 * 선택된 번호 목록을 표시하는 컴포넌트
 * @param {SelectedNumberListProps} props - 선택된 번호 목록 정보
 * @param {number[]} props.numbers - 선택된 번호 목록
 * @returns {React.ReactNode} 선택된 번호 목록을 표시하는 컴포넌트
 * @example
 * <SelectedNumberList numbers={[1, 2, 3]} />
 */
const SelectedNumbersList: React.FC<SelectedNumberListProps> = ({ numbers }) => {
  return (
    <div>
      <div className="text-sm text-muted-foreground mb-2">{MESSAGES.SELECTED_NUMBERS}</div>
      <div className="flex flex-wrap gap-2">
        {numbers.map(num => (
          <SelectedNumberBadge key={num} number={num} />
        ))}
      </div>
    </div>
  );
};

export default memo(SelectedNumbersList);
