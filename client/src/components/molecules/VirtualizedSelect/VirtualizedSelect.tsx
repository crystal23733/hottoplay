import { Select, SelectContent, SelectTrigger, SelectValue } from '@/ui/Select';
import VirtualizedSelectProps from './VirtualizedSelect.types';
import { FixedSizeList } from 'react-window';
import VirtualizedSelectItem from '../VirtualizedSelectItem/VirtualizedSelectItem';

/**
 * 가상화 셀렉트 컴포넌트
 * @param options - 옵션 목록
 * @param value - 선택된 값
 * @param onValueChange - 값 변경 함수
 * @param placeholder - 플레이스홀더
 * @returns {JSX.Element} 가상화 셀렉트 요소
 */
const VirtualizedSelect: React.FC<VirtualizedSelectProps> = ({
  options,
  value,
  onValueChange,
  placeholder,
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="p-0">
        <FixedSizeList
          height={ITEM_HEIGHT * ITEM_TO_SHOW}
          itemCount={options.length}
          itemSize={ITEM_HEIGHT}
          width="100%"
          itemData={{ options, onValueChange }}
        >
          {VirtualizedSelectItem}
        </FixedSizeList>
      </SelectContent>
    </Select>
  );
};

export default VirtualizedSelect;
