'use client';

import { cn } from '@/lib/utils';
import DisclaimerProps from './Disclaimer.types';
import useDisclaimerPosition from '@/power-ball/hooks/useDisclaimerPosition';

/**
 * 파워볼 면책조항 컴포넌트 - 화면에 따라다니는 스타일
 * @param {DisclaimerProps} props - 면책조항 컴포넌트 속성
 * @returns {React.ReactNode} 면책조항 컴포넌트
 */
const Disclaimer: React.FC<DisclaimerProps> = ({ className, ...props }) => {
  const { positionClass } = useDisclaimerPosition();

  return (
    <div className={cn('fixed z-50 mx-auto max-w-4xl px-4', positionClass, className)} {...props}>
      <div className="rounded-lg bg-black/80 p-3 text-xs text-white shadow-lg backdrop-blur-sm md:text-sm">
        <p className="text-center font-medium">
          The website is not affiliated with, or endorsed by the Multi-State Lottery Association, or
          the Powerball lottery game.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
