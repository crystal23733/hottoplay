import { render, screen } from '@testing-library/react';
import MegaMillionsDrawDetail from '../MegaMillionsDrawDetail';
import useMegaMillionsDrawDetail from '@/megamillions/hooks/useMegaMillionsDrawDetail';
import { useToast } from '@/common/hooks/use-toast';
import { DrawDetailResponse } from '@/api/megamillions/megaMillionsDraw.types';

// 훅 모킹
jest.mock('@/megamillions/hooks/useMegaMillionsDrawDetail');
jest.mock('@/common/hooks/use-toast');

// 컴포넌트 모킹
jest.mock('next/link', () => {
  const MockedLink = (props: { href: string; children: React.ReactNode }) => (
    <a href={props.href}>{props.children}</a>
  );
  MockedLink.displayName = 'MockedLink';
  return MockedLink;
});

jest.mock('lucide-react', () => ({
  ArrowLeft: () => <div data-testid="arrow-left-icon" />,
}));

jest.mock('@/ui/Button', () => {
  const MockedButton = (props: {
    children: React.ReactNode;
    asChild?: boolean;
    variant?: string;
    className?: string;
    onClick?: () => void;
  }) => (
    <button data-variant={props.variant} className={props.className} onClick={props.onClick}>
      {props.children}
    </button>
  );
  MockedButton.displayName = 'MockedButton';
  return { Button: MockedButton };
});

jest.mock('@/ui/Card', () => {
  const MockedCard = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card">{children}</div>
  );
  MockedCard.displayName = 'MockedCard';

  const MockedCardHeader = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-header">{children}</div>
  );
  MockedCardHeader.displayName = 'MockedCardHeader';

  const MockedCardTitle = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-title">{children}</div>
  );
  MockedCardTitle.displayName = 'MockedCardTitle';

  const MockedCardContent = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-content">{children}</div>
  );
  MockedCardContent.displayName = 'MockedCardContent';

  return {
    Card: MockedCard,
    CardHeader: MockedCardHeader,
    CardTitle: MockedCardTitle,
    CardContent: MockedCardContent,
  };
});

jest.mock('../../../../components/atoms/MegaMillionsNumber/MegaMillionsNumber', () => {
  const MockedMegaMillionsNumber = ({
    number,
    isMegaBall,
  }: {
    number: number;
    isMegaBall: boolean;
  }) => (
    <div data-testid={isMegaBall ? 'megamillions-number' : 'white-number'} data-number={number}>
      {number}
    </div>
  );
  MockedMegaMillionsNumber.displayName = 'MockedMegaMillionsNumber';
  return MockedMegaMillionsNumber;
});

jest.mock('../../../../components/molecules/PrizeBreakdownTable/PrizeBreakdownTable', () => {
  const MockedPrizeBreakdownTable = ({ prizeBreakdown }: { prizeBreakdown: unknown[] }) => (
    <div data-testid="prize-breakdown-table" data-prizes={prizeBreakdown.length}>
      Prize Breakdown Table
    </div>
  );
  MockedPrizeBreakdownTable.displayName = 'MockedPrizeBreakdownTable';
  return MockedPrizeBreakdownTable;
});

describe('MegaMillionsDrawDetail 컴포넌트', () => {
  const mockDate = '2023-04-01';

  const mockToast = jest.fn();

  const mockDrawData: DrawDetailResponse = {
    draw_date: '2023-04-01',
    white_numbers: [10, 20, 30, 40, 50],
    mega_ball: 15,
    mega_plier: '3X',
    era: 'current',
    rules: {
      white_ball_range: [1, 69],
      mega_ball_range: [1, 25],
      start_date: '2023-04-01',
      end_date: '2023-04-01',
    },
    estimated_jackpot: '$100 Million',
    cash_option: '$50 Million',
    jackpot_winners: 1,
    prize_breakdown: [
      {
        category: 'Match 5 + Mega Ball',
        match: '5',
        prize: '$100,000,000',
        winners: 1,
        prize_fund: 'N/A',
      },
      {
        category: 'Match 5',
        match: '5',
        prize: '$1,000,000',
        winners: 2,
        prize_fund: 'N/A',
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
  });

  it('로딩 상태일 때 스켈레톤 UI가 표시되어야 합니다', () => {
    (useMegaMillionsDrawDetail as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    const { container } = render(<MegaMillionsDrawDetail date={mockDate} />);

    // 스켈레톤 UI 요소 체크 - className으로 찾기
    const skeletonElements = container.getElementsByClassName('animate-pulse');
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it('데이터가 없을 때 "Drawing result not found" 메시지가 표시되어야 합니다', () => {
    (useMegaMillionsDrawDetail as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    render(<MegaMillionsDrawDetail date={mockDate} />);

    expect(screen.getByText('Drawing result not found')).toBeInTheDocument();
    expect(
      screen.getByText(`We couldn't find the drawing result for ${mockDate}`)
    ).toBeInTheDocument();

    // 뒤로 가기 버튼 확인
    const backButton = screen.getByText('Back to Drawing Results');
    expect(backButton).toBeInTheDocument();
  });

  it('에러 발생 시 토스트 알림이 표시되어야 합니다', () => {
    (useMegaMillionsDrawDetail as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: '서버 오류가 발생했습니다',
    });

    render(<MegaMillionsDrawDetail date={mockDate} />);

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Error',
      description: '서버 오류가 발생했습니다',
      variant: 'destructive',
    });
  });

  it('데이터가 있을 때 모든 정보가 올바르게 표시되어야 합니다', () => {
    (useMegaMillionsDrawDetail as jest.Mock).mockReturnValue({
      data: mockDrawData,
      loading: false,
      error: null,
    });

    render(<MegaMillionsDrawDetail date={mockDate} />);

    // 기본 정보
    expect(screen.getByText(`Mega Millions Result: ${mockDrawData.draw_date}`)).toBeInTheDocument();
    expect(screen.getByText(`Multiplier: ${mockDrawData.mega_plier}`)).toBeInTheDocument();

    // 당첨 번호
    const whiteNumbers = screen.getAllByTestId('white-number');
    expect(whiteNumbers).toHaveLength(5);
    expect(whiteNumbers[0]).toHaveAttribute('data-number', '10');
    expect(whiteNumbers[4]).toHaveAttribute('data-number', '50');

    const megaBallNumber = screen.getByTestId('megamillions-number');
    expect(megaBallNumber).toHaveAttribute('data-number', '15');

    // 잭팟 정보
    expect(screen.getByText('Estimated Jackpot:')).toBeInTheDocument();
    expect(screen.getByText('$100 Million')).toBeInTheDocument();
    expect(screen.getByText('Cash Value:')).toBeInTheDocument();
    expect(screen.getByText('$50 Million')).toBeInTheDocument();
    expect(screen.getByText('Jackpot Winners:')).toBeInTheDocument();
    expect(screen.getByText('1 winners')).toBeInTheDocument();

    // 상금 분류 테이블
    const prizeTable = screen.getByTestId('prize-breakdown-table');
    expect(prizeTable).toBeInTheDocument();
    expect(prizeTable).toHaveAttribute('data-prizes', '2');
  });

  it('일부 데이터가 없을 때 대체 텍스트가 표시되어야 합니다', () => {
    const partialData: DrawDetailResponse = {
      ...mockDrawData,
      estimated_jackpot: undefined,
      cash_option: undefined,
      jackpot_winners: undefined,
      prize_breakdown: undefined,
    };

    (useMegaMillionsDrawDetail as jest.Mock).mockReturnValue({
      data: partialData,
      loading: false,
      error: null,
    });

    render(<MegaMillionsDrawDetail date={mockDate} />);

    // 필수 데이터는 존재해야 함
    expect(screen.getByText(`Mega Millions Result: ${mockDrawData.draw_date}`)).toBeInTheDocument();

    // 없는 데이터는 None으로 표시되어야 함
    const noneTexts = screen.getAllByText('None');
    expect(noneTexts.length).toBe(1);

    // 상금 분류 테이블은 없어야 함
    expect(screen.queryByTestId('prize-breakdown-table')).not.toBeInTheDocument();
  });

  it('뒤로 가기 버튼 렌더링을 확인합니다', () => {
    (useMegaMillionsDrawDetail as jest.Mock).mockReturnValue({
      data: mockDrawData,
      loading: false,
      error: null,
    });

    render(<MegaMillionsDrawDetail date={mockDate} />);

    const backButton = screen.getByText('Back to Drawing Results');
    expect(backButton).toBeInTheDocument();
    expect(backButton.closest('a')).toHaveAttribute('href', '/mega-millions/draws');
  });
});
