import { Card } from '@/ui/Card';
import NumberStatCardProps from './NumberStatCard.types';
import { Target, Trophy } from 'lucide-react';
import MESSAGES from './constants/messages';
import COLORS from './constants/styles';
import { memo } from 'react';

/**
 * 파워볼 번호 통계 카드 컴포넌트
 * @param stat - 통계 데이터
 * @returns 파워볼 번호 통계 카드
 * @example
 * <NumberStatCard stat={stat} />
 */
const NumberStatCard: React.FC<NumberStatCardProps> = ({ stat }) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-bold">{stat.number}</span>
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            {MESSAGES.TOTAL_APPEARANCES}: {stat.white_ball_count + stat.power_ball_count}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <Target className={`h-4 w-4 ${COLORS.WHITE_BALL}`} />
          </div>
          <div>
            <div className="font-medium">{MESSAGES.WHITE_BALL.TITLE}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {MESSAGES.WHITE_BALL.APPEARED} {stat.white_ball_count} {MESSAGES.WHITE_BALL.TIMES}
            </div>
            {stat.last_white_ball_date && (
              <div className="text-xs text-muted-foreground mt-1">
                {MESSAGES.WHITE_BALL.LAST_DRAWN}: {stat.last_white_ball_date}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-1">
            <Target className={`h-4 w-4 ${COLORS.POWER_BALL}`} />
          </div>
          <div>
            <div className="font-medium">{MESSAGES.POWER_BALL.TITLE}</div>
            <div className="text-sm text-muted-foreground">
              {MESSAGES.POWER_BALL.APPEARED} {stat.power_ball_count} {MESSAGES.POWER_BALL.TIMES}
            </div>
            {stat.last_power_ball_date && (
              <div className="text-xs text-muted-foreground mt-1">
                {MESSAGES.POWER_BALL.LAST_DRAWN}: {stat.last_power_ball_date}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default memo(NumberStatCard);
