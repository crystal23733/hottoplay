'use client';

import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';
import MegaMillionsMethodSelectProps, {
  MegaMillionsMethod,
} from './MegaMillionsMethodSelect.types';
import { MEGAMILLIONS_METHODS } from './constants/methodInfo.ts';
import { cn } from '@/lib/utils';

/**
 * 메가밀리언 메서드 선택 컴포넌트
 * @param props 메가밀리언 메서드 선택 컴포넌트 속성
 * @returns 메가밀리언 메서드 선택 컴포넌트
 * @example
 * <MegaMillionsMethodSelect value="random" onChange={(value) => setValue(value)} />
 */
const MegaMillionsMethodSelect: React.FC<MegaMillionsMethodSelectProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <RadioGroup
      defaultValue={value}
      value={value}
      onValueChange={value => onChange(value as MegaMillionsMethod)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      disabled={disabled}
    >
      {MEGAMILLIONS_METHODS.map(method => (
        <div key={method.id}>
          <RadioGroupItem value={method.id} id={method.id} className="peer sr-only" />
          <label
            htmlFor={method.id}
            className={cn(
              'flex flex-col gap-2 p-4 rounded-lg border-2 cursor-pointer',
              'hover:border-primary/50 hover:bg-muted/50',
              'peer-checked:border-primary peer-checked:bg-primary/5',
              'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
              'peer-disabled:hover:border-muted peer-disabled:hover:bg-transparent'
            )}
          >
            <div className="flex items-start gap-3">
              <method.icon className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
              <div className="space-y-1">
                <div className="font-medium">{method.label}</div>
                <div className="text-sm text-muted-foreground">{method.shortDescription}</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{method.description}</p>
          </label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default MegaMillionsMethodSelect;
