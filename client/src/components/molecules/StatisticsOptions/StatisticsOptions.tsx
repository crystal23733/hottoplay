import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';
import StatisticsOptionsProps from './StatisticsOptions.types';
import { Label } from '@/ui/label';

/**
 * 통계 기반 번호 생성 옵션
 * @param value - 선택된 옵션
 * @param onChange - 옵션 변경 함수
 * @returns
 */
const StatisticsOptions: React.FC<StatisticsOptionsProps> = ({ value, onChange }) => {
  return (
    <RadioGroup value={value} onValueChange={onChange as (value: string) => void}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="hot" id="hot" />
        <Label htmlFor="hot">핫 넘버 (상위 20% + 중간 50% 조합)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="cold" id="cold" />
        <Label htmlFor="cold">콜드 넘버 (최근 50회차 기준 저빈도)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="balanced" id="balanced" />
        <Label htmlFor="balanced">밸런스 (구간별 균등 분배)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="weighted" id="weighted" />
        <Label htmlFor="weighted">가중치 기반 (전체 빈도 반영)</Label>
      </div>
    </RadioGroup>
  );
};

export default StatisticsOptions;
