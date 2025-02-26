import { cn } from '@/lib/utils';
import PowerBallNumberProps from './PowerBallNumber.types';

/**
 * 파워볼 번호 컴포넌트
 * @param {PowerBallNumberProps} props - 파워볼 번호 컴포넌트 속성
 * @returns {React.ReactNode} 파워볼 번호 컴포넌트
 * @example
 * <PowerBallNumber number={23} />
 * <PowerBallNumber number={7} isPowerball />
 * <PowerBallNumber number={15} className="text-blue-500" />
 */
const PowerBallNumber: React.FC<PowerBallNumberProps> = ({
  number,
  isPowerball = false,
  className,
  style,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        'w-10 h10 md:w-12 md:h-12',
        'rounded-full font-bold text-lg md:text-xl',
        'transition-transform hover:scale-110',
        isPowerball ? 'bg-red-600 text-white' : 'bg-white text-gray-800 border-2 border-gray-200',
        className
      )}
      style={style}
      aria-label={`${isPowerball ? 'Powerball' : 'Number'} ${number}`}
    >
      {number}
    </div>
  );
};

export default PowerBallNumber;
