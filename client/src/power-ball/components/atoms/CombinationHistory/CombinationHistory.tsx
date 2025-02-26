import { memo } from 'react';
import CombinationHistoryProps from './CombinationHistory.types';
import { History } from 'lucide-react';
import MESSAGES from './constants/messages';

/**
 * 번호 조합의 등장 이력을 보여주는 컴포넌트
 * @param {CombinationHistoryProps} props - 조합 통계 정보
 * @param {CombinationStatistics} props.stats - 조합 통계 정보
 * @returns {React.ReactNode} 조합 통계 정보를 표시하는 컴포넌트
 * @example
 * <CombinationHistory stats={stats} />
 */
const CombinationHistory: React.FC<CombinationHistoryProps> = ({ stats }) => {
  return (
    <div className="flex items-start gap-3">
      <History className="h-4 w-4 mt-1 text-primary" />
      <div>
        <div className="font-medium">
          {stats.appearance_count === 0 && MESSAGES.APPEARANCES.NEVER}
          {stats.appearance_count === 1 && MESSAGES.APPEARANCES.ONCE}
          {stats.appearance_count > 1 && (
            <>
              {MESSAGES.APPEARANCES.MULTIPLE} {stats.appearance_count} {MESSAGES.APPEARANCES.TIMES}
            </>
          )}
        </div>
        {stats.last_appearance && (
          <div className="text-sm text-muted-foreground mt-1">
            {MESSAGES.LAST_SEEN}: {stats.last_appearance}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(CombinationHistory);
