import { memo } from 'react';
import SelectedNumberBadgeProps from './SelectedNumberBadge.types';

/**
 * 선택된 번호를 표시하는 컴포넌트
 * @param {SelectedNumberBadgeProps} props - 선택된 번호 정보
 * @param {number} props.number - 표시할 번호
 * @returns {React.ReactNode} 번호를 표시하는 컴포넌트
 * @example
 * <SelectedNumberBadge number={42} />
 */
const SelectedNumberBadge: React.FC<SelectedNumberBadgeProps> = ({ number }) => {
  return (
    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
      {number}
    </div>
  );
};

export default memo(SelectedNumberBadge);
