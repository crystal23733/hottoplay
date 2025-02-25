import { memo } from 'react';
import CombinationStatCardProps from './CombinationStatCard.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/Card';
import MESSAGES from './constants/messages';
import { Info } from 'lucide-react';
import SelectedNumbersList from '../../molecules/SelectedNumberList/SelectedNumbersList';
import CombinationHistory from '../../atoms/CombinationHistory/CombinationHistory';

/**
 * 선택된 번호 조합의 통계 정보를 보여주는 카드 컴포넌트
 * @param {CombinationStatCardProps} props - 조합 통계 정보
 * @param {CombinationStatistics} props.stats - 조합 통계 정보
 * @param {number[]} props.selectedNumbers - 선택된 번호 배열
 * @returns {React.ReactNode} 조합 통계 정보를 표시하는 컴포넌트
 * @example
 * <CombinationStatCard stats={stats} selectedNumbers={[1, 2, 3]} />
 */
const CombinationStatCard: React.FC<CombinationStatCardProps> = ({ stats, selectedNumbers }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{MESSAGES.TITLE}</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedNumbers.length === 0 ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Info className="h-4 w-4" />
            <p>{MESSAGES.NO_NUMBERS}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <SelectedNumbersList numbers={selectedNumbers} />
            {stats && (
              <div className="pt-4 border-t">
                <CombinationHistory stats={stats} />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(CombinationStatCard);
