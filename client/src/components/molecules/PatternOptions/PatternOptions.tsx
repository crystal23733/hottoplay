import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';
import PatternOptionsProps from './PatternOptions.types';
import { Label } from '@/ui/label';

const PatternOptions: React.FC<PatternOptionsProps> = ({ value, onChange }) => {
  return (
    <RadioGroup value={value} onValueChange={onChange as (value: string) => void}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="sequential" id="sequential" />
        <Label htmlFor="sequential">연속된 숫자 포함</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="oddEven" id="oddEven" />
        <Label htmlFor="oddEven">홀짝 비율 조정</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="distributed" id="distributed" />
        <Label htmlFor="distributed">구간별 분배</Label>
      </div>
    </RadioGroup>
  );
};

export default PatternOptions;
