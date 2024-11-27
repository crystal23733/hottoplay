import { SelectOption } from '../VirtualizedSelectItem/VirtualizedSelectItem.types';

/**
 * 셀렉트 타입
 */
export default interface VirtualizedSelectProps {
  options: SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
}
