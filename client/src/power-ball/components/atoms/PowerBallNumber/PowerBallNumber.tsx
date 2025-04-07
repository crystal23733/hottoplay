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
        'w-10 h-10 md:w-12 md:h-12', // 기본 크기를 약간 키움
        'rounded-full font-bold text-lg md:text-xl',
        'transition-transform hover:scale-105', // 호버 효과 약간 줄임
        isPowerball ? 'bg-red-600 text-white' : 'bg-white text-gray-800 border-2 border-gray-200',
        'flex-shrink-0', // flex container에서 공이 축소되지 않게 설정
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
