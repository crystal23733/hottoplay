import { Card } from '@/ui/Card';
import PowerBallResultsProps from './PowerBallResults.types';
import { memo } from 'react';
import { CalendarClock } from 'lucide-react';
import PowerBallSet from '../../molecules/PowerBallSet/PowerBallSet';

/**
 * 파워볼 결과 표시 컴포넌트
 * @param {PowerBallResultsProps} props - 파워볼 결과 표시 컴포넌트 속성
 * @returns {React.ReactNode} 파워볼 결과 표시 컴포넌트
 * @example
 * <PowerBallResults numbers={numbers} method={method} />
 */
const PowerBallResults: React.FC<PowerBallResultsProps> = ({ numbers, method }) => {
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
          <PowerBallSet
            key={index}
            whiteNumbers={set.white_numbers}
            powerball={set.powerball}
            setNumber={index + 1}
            animationDelay={index * 100}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(PowerBallResults);
