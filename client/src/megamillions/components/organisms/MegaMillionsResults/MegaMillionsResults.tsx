import { Card } from '@/ui/Card';
import MegaMillionsResultsProps from './MegaMillionsResults.types';
import { memo } from 'react';
import { CalendarClock } from 'lucide-react';
import MegaMillionsSet from '../../molecules/MegaMillionsSet/MegaMillionsSet';

/**
 * 메가밀리언 결과 표시 컴포넌트
 * @param {MegaMillionsResultsProps} props - 메가밀리언 결과 표시 컴포넌트 속성
 * @returns {React.ReactNode} 메가밀리언 결과 표시 컴포넌트
 * @example
 * <MegaMillionsResults numbers={numbers} method={method} />
 */
const MegaMillionsResults: React.FC<MegaMillionsResultsProps> = ({ numbers, method }) => {
  if (numbers.length === 0) {
    return null;
  }

  const generatedTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <div className="space-y-6">
      <Card className="p-4 bg-muted/50">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarClock className="h-4 w-4" />
          <span>
            Generated on {generatedTime} using {method}
          </span>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {numbers.map((set, index) => (
          <MegaMillionsSet
            key={index}
            whiteNumbers={set.white_numbers}
            mega_ball={set.mega_ball}
            setNumber={index + 1}
            animationDelay={index * 100}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(MegaMillionsResults);
