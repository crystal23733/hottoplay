import { ComponentType } from 'react';

export type MegaMillionsMethod = 'random' | 'hot' | 'cold' | 'unique';

/**
 * 메가밀리언 메서드 정보
 * @property {MegaMillionsMethod} id - 메서드 ID
 * @property {string} label - 메서드 라벨
 * @property {string} shortDescription - 메서드 짧은 설명
 * @property {string} description - 메서드 설명
 * @property {React.ComponentType<{ className?: string }>} icon - 메서드 아이콘
 */
export interface MegaMillionsMethodInfo {
  id: MegaMillionsMethod;
  label: string;
  shortDescription: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}

/**
 * 메가밀리언 메서드 선택 컴포넌트 속성 타입
 * @property {MegaMillionsMethod} value - 선택된 메서드
 * @property {(value: MegaMillionsMethod) => void} onChange - 메서드 변경 핸들러
 * @property {boolean} disabled - 비활성화 여부
 */
export default interface MegaMillionsMethodSelectProps {
  value: MegaMillionsMethod;
  onChange: (value: MegaMillionsMethod) => void;
  disabled?: boolean;
}
