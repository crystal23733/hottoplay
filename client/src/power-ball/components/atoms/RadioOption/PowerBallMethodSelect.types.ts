export type PowerBallMethod = 'random' | 'hot' | 'cold' | 'unique';

/**
 * 파워볼 메서드 정보
 * @property {PowerBallMethod} id - 메서드 ID
 * @property {string} label - 메서드 라벨
 * @property {string} shortDescription - 메서드 짧은 설명
 * @property {string} description - 메서드 설명
 * @property {React.ComponentType<{ className?: string }>} icon - 메서드 아이콘
 */
export interface PowerBallMethodInfo {
  id: PowerBallMethod;
  label: string;
  shortDescription: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

/**
 * 파워볼 메서드 선택 컴포넌트 속성 타입
 * @property {PowerBallMethod} value - 선택된 메서드
 * @property {(value: PowerBallMethod) => void} onChange - 메서드 변경 핸들러
 * @property {boolean} disabled - 비활성화 여부
 */
export default interface PowerBallMethodSelectProps {
  value: PowerBallMethod;
  onChange: (value: PowerBallMethod) => void;
  disabled?: boolean;
}
