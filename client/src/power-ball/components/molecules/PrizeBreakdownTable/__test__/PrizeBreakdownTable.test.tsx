import { render, screen } from '@testing-library/react';
import PrizeBreakdownTable from '../PrizeBreakdownTable';
import { PrizeTier } from '@/api/powerBall/powerBallDraw.types';

// 테이블 컴포넌트 모킹
jest.mock('@/ui/table', () => ({
  Table: ({ children }: { children: React.ReactNode }) => (
    <table data-testid="table">{children}</table>
  ),
  TableHeader: ({ children }: { children: React.ReactNode }) => (
    <thead data-testid="table-header">{children}</thead>
  ),
  TableBody: ({ children }: { children: React.ReactNode }) => (
    <tbody data-testid="table-body">{children}</tbody>
  ),
  TableRow: ({ children }: { children: React.ReactNode }) => (
    <tr data-testid="table-row">{children}</tr>
  ),
  TableHead: ({ children }: { children: React.ReactNode }) => (
    <th data-testid="table-head">{children}</th>
  ),
  TableCell: ({ children, className }: { children: React.ReactNode; className: string }) => (
    <td data-testid="table-cell" className={className}>
      {children}
    </td>
  ),
}));

describe('PrizeBreakdownTable 컴포넌트', () => {
  // 테스트용 데이터
  const mockPrizeBreakdown: PrizeTier[] = [
    {
      prize_tier: 'Match 5 + Power Ball',
      winners: '1',
      prize: '$100,000,000',
      power_play: 'N/A',
    },
    {
      prize_tier: 'Match 5',
      winners: '4',
      prize: '$1,000,000',
      power_play: '$2,000,000',
    },
    {
      prize_tier: 'Match 4 + Power Ball',
      winners: '25',
      prize: '$50,000',
      power_play: '$150,000',
    },
  ];

  it('테이블 헤더가 올바르게 렌더링되어야 합니다', () => {
    render(<PrizeBreakdownTable prizeBreakdown={mockPrizeBreakdown} />);

    const headerCells = screen.getAllByTestId('table-head');
    expect(headerCells).toHaveLength(4);

    expect(headerCells[0]).toHaveTextContent('Prize Tier');
    expect(headerCells[1]).toHaveTextContent('Winners');
    expect(headerCells[2]).toHaveTextContent('Prize');
    expect(headerCells[3]).toHaveTextContent('Power Play');
  });

  it('올바른 수의 행이 렌더링되어야 합니다', () => {
    render(<PrizeBreakdownTable prizeBreakdown={mockPrizeBreakdown} />);

    const rows = screen.getAllByTestId('table-row');
    // 헤더 행 1개 + 데이터 행 3개 = 총 4개 행
    expect(rows).toHaveLength(4);
  });

  it('각 행이 올바른 데이터로 렌더링되어야 합니다', () => {
    render(<PrizeBreakdownTable prizeBreakdown={mockPrizeBreakdown} />);

    const cells = screen.getAllByTestId('table-cell');

    // 첫 번째 행 (Match 5 + Power Ball)
    expect(cells[0]).toHaveTextContent('Match 5 + Power Ball');
    expect(cells[1]).toHaveTextContent('1');
    expect(cells[2]).toHaveTextContent('$100,000,000');
    expect(cells[3]).toHaveTextContent('N/A');

    // 두 번째 행 (Match 5)
    expect(cells[4]).toHaveTextContent('Match 5');
    expect(cells[5]).toHaveTextContent('4');
    expect(cells[6]).toHaveTextContent('$1,000,000');
    expect(cells[7]).toHaveTextContent('$2,000,000');
  });

  it('빈 데이터가 주어졌을 때 빈 테이블이 렌더링되어야 합니다', () => {
    render(<PrizeBreakdownTable prizeBreakdown={[]} />);

    // 헤더는 여전히 존재해야 함
    expect(screen.getAllByTestId('table-head')).toHaveLength(4);

    // 데이터 행은 없어야 함
    const rows = screen.getAllByTestId('table-row');
    expect(rows).toHaveLength(1); // 헤더 행만 존재
  });

  it('Prize Tier 셀이 굵은 폰트로 표시되어야 합니다', () => {
    render(<PrizeBreakdownTable prizeBreakdown={mockPrizeBreakdown} />);

    // 첫 번째 행의 첫 번째 셀(Prize Tier)을 확인
    const prizeTierCells = screen
      .getAllByTestId('table-cell')
      .filter(cell => cell.textContent?.includes('Match 5 + Power Ball'));

    expect(prizeTierCells[0]).toHaveClass('font-medium');
  });
});
