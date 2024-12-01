import { SelectItem } from '@/ui/Select';
import { VirtualizedSelectItemProps } from './VirtualizedSelectItem.types';

/**
 * 가상화 셀렉트 아이템 컴포넌트
 * @param index - 아이템 인덱스
 * @param style - 아이템 스타일
 * @param data - 아이템 데이터
 * @returns {JSX.Element} 선택 아이템 요소
 */
const VirtualizedSelectItem: React.FC<VirtualizedSelectItemProps> = ({ index, style, data }) => {
  const { options, onValueChange } = data;
  const option = options[index];

  return (
    <SelectItem
      key={option.value}
      value={option.value}
      onClick={() => onValueChange(option.value)}
      style={style}
    >
      {option.label}
    </SelectItem>
  );
};

export default VirtualizedSelectItem;
