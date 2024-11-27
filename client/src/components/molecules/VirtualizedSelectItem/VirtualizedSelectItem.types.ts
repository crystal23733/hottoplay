/**
 * 셀렉트 데이터 타입
 */
export interface SelectOption {
  value: string;
  label: string;
}

/**
 * 가상화 셀렉트 아이템 타입
 */
export interface VirtualizedSelectItemProps {
  index: number;
  style: React.CSSProperties;
  data: {
    options: SelectOption[];
    onValueChange: (value: string) => void;
  };
}
