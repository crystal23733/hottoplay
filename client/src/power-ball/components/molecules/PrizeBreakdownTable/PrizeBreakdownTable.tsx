import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui/table';
import PrizeBreakdownTableProps from './PrizeBreakdownTable.types';
import { memo } from 'react';

/**
 * 상금 분류 테이블 컴포넌트
 * @param {PrizeBreakdownTableProps} props - 상금 분류 테이블 컴포넌트 속성
 * @param {PrizeTier[]} props.prizeBreakdown - 상금 분류 테이블 데이터
 * @returns {React.ReactNode} 상금 분류 테이블 컴포넌트
 */
const PrizeBreakdownTable: React.FC<PrizeBreakdownTableProps> = ({ prizeBreakdown }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Prize Tier</TableHead>
            <TableHead>Winners</TableHead>
            <TableHead>Prize</TableHead>
            <TableHead>Power Play</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prizeBreakdown.map((tier, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{tier.prize_tier}</TableCell>
              <TableCell>{tier.winners}</TableCell>
              <TableCell>{tier.prize}</TableCell>
              <TableCell>{tier.power_play}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default memo(PrizeBreakdownTable);
