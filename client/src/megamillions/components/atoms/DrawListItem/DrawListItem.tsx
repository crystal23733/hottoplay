import { Card } from '@/ui/Card';
import MegaMillionsNumber from '../../atoms/MegaMillionsNumber/MegaMillionsNumber';
import Link from 'next/link';
import { memo } from 'react';
import DrawListItemProps from './DrawListItem.types';

/**
 * 메가밀리언스 추첨 결과 목록 아이템 컴포넌트
 * @param {DrawListItemProps} props - 추첨 결과 목록 아이템 속성
 * @returns {React.ReactNode} 추첨 결과 목록 아이템
 */
const DrawListItem: React.FC<DrawListItemProps> = ({ draw }) => {
  return (
    <Link
      href={`/mega-millions/draws/draw-detail?date=${encodeURIComponent(draw.draw_date)}`}
      passHref
    >
      <Card className="p-4 transition-all hover:shadow-md cursor-pointer">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-2">
            <div className="text-lg font-medium">{draw.draw_date}</div>

            {draw.estimated_jackpot && (
              <div className="text-sm text-primary font-medium">
                Jackpot: {draw.estimated_jackpot}
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              Multiplier: {draw.mega_plier || 'None'}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {draw.white_numbers.map((number, index) => (
              <MegaMillionsNumber
                key={index}
                number={number}
                isMegaBall={false}
                className="w-8 h-8 text-sm"
              />
            ))}
            <div
              className="w-4 h-px bg-gray-200 mx-2"
              role="separator"
              aria-orientation="vertical"
            />
            <MegaMillionsNumber
              number={draw.mega_ball}
              isMegaBall={true}
              className="w-8 h-8 text-sm"
            />
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default memo(DrawListItem);
