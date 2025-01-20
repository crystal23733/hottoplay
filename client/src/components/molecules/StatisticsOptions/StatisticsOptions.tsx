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
        <Label htmlFor="hot">핫 넘버 (등장 빈도가 높음)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="cold" id="cold" />
        <Label htmlFor="cold">콜드 넘버 (등장 빈도가 낮음)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="bonus" id="bonus" />
        <Label htmlFor="bonus">보너스 넘버 (보너스 번호 기반)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="weighted" id="weighted" />
        <Label htmlFor="weighted">가중치 기반</Label>
      </div>
    </RadioGroup>
  );
};

export default StatisticsOptions;
