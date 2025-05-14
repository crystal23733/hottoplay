import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';
import MegaMillionsMethodSelectProps from './MegaMillionsMethodSelect.types';
import { Label } from '@/ui/label';
import MEGAMILLIONS_METHODS from './constants/MegaMillionsMethod';
import { Card, CardContent } from '@/ui/Card';
import { cn } from '@/lib/utils';

/**
 * 메가밀리언스 메서드 선택 컴포넌트
 * @param {MegaMillionsMethodSelectProps} props - 메가밀리언스 메서드 선택 컴포넌트 속성
 * @returns {React.ReactNode} 메가밀리언스 메서드 선택 컴포넌트
 * @example
 * <MegaMillionsMethodSelect value={value} onChange={onChange} disabled={disabled} />
 */
const MegaMillionsMethodSelect: React.FC<MegaMillionsMethodSelectProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="space-y-4">
      <RadioGroup
        value={value}
        onValueChange={onChange as (value: string) => void}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        disabled={disabled}
      >
        {MEGAMILLIONS_METHODS.map(method => (
          <Card
            key={method.id}
            className={cn(
              'cursor-pointer transition-all hover:border-primary',
              value === method.id && 'border-primary bg-primary/5'
            )}
            onClick={() => !disabled && onChange(method.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <method.icon className="w-4 h-4" />
                    <Label htmlFor={method.id} className="text-lg font-medium cursor-pointer">
                      {method.label}
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{method.shortDescription}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>

      {/* 선택된 방식의 자세한 설명 */}
      <Card className="bg-muted">
        <CardContent className="p-4">
          <p className="text-sm leading-relaxed">
            {MEGAMILLIONS_METHODS.find(m => m.id === value)?.description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MegaMillionsMethodSelect;
