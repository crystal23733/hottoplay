import { cn } from '@/lib/utils';
import MegaMillionsNumberProps from './MegaMillionsNumber.types';

/**
 * 메가밀리언스 번호 컴포넌트
 * @param {MegaMillionsNumberProps} props - 메가밀리언스 번호 컴포넌트 속성
 * @returns {React.ReactNode} 메가밀리언스 번호 컴포넌트
 * @example
 * <MegaMillionsNumber number={23} />
 * <MegaMillionsNumber number={7} isMegaBall />
 * <MegaMillionsNumber number={15} className="text-blue-500" />
 */
const MegaMillionsNumber: React.FC<MegaMillionsNumberProps> = ({
  number,
  isMegaBall = false,
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
        isMegaBall ? 'bg-red-600 text-white' : 'bg-white text-gray-800 border-2 border-gray-200',
        'flex-shrink-0', // flex container에서 공이 축소되지 않게 설정
        className
      )}
      style={style}
      aria-label={`${isMegaBall ? 'Mega Ball' : 'Number'} ${number}`}
    >
      {number}
    </div>
  );
};

export default MegaMillionsNumber;
