import { render, screen } from '@testing-library/react';
import PowerBallDrawDetail from '../PowerBallDrawDetail';
import usePowerBallDrawDetail from '@/power-ball/hooks/usePowerBallDrawDetail';
import { useToast } from '@/common/hooks/use-toast';
import { DrawDetailResponse } from '@/api/powerBall/powerBallDraw.types';

// 훅 모킹
jest.mock('@/power-ball/hooks/usePowerBallDrawDetail');
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

jest.mock('../../../../components/atoms/PowerBallNumber/PowerBallNumber', () => {
  const MockedPowerBallNumber = ({
    number,
    isPowerball,
  }: {
    number: number;
    isPowerball: boolean;
  }) => (
    <div data-testid={isPowerball ? 'powerball-number' : 'white-number'} data-number={number}>
      {number}
    </div>
  );
  MockedPowerBallNumber.displayName = 'MockedPowerBallNumber';
  return MockedPowerBallNumber;
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

describe('PowerBallDrawDetail 컴포넌트', () => {
  const mockDate = '2023-04-01';

  const mockToast = jest.fn();

  const mockDrawData: DrawDetailResponse = {
    date: '2023-04-01',
    white_numbers: ['10', '20', '30', '40', '50'],
    powerball: '15',
    power_play: '3X',
    era: 'current',
    rules: {
      white_ball_range: [1, 69],
      power_ball_range: [1, 26],
    },
    estimated_jackpot: '$100 Million',
    cash_value: '$50 Million',
    jackpot_winners_location: 'California',
    match5_pp_winners_location: 'None',
    match5_winners_location: 'Texas, Florida',
    prize_breakdown: [
      {
        prize_tier: 'Match 5 + Power Ball',
        winners: '1',
        prize: '$100,000,000',
        power_play: 'N/A',
      },
      {
        prize_tier: 'Match 5',
        winners: '2',
        prize: '$1,000,000',
        power_play: '$2,000,000',
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
  });

  it('로딩 상태일 때 스켈레톤 UI가 표시되어야 합니다', () => {
    (usePowerBallDrawDetail as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    const { container } = render(<PowerBallDrawDetail date={mockDate} />);

    // 스켈레톤 UI 요소 체크 - className으로 찾기
    const skeletonElements = container.getElementsByClassName('animate-pulse');
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it('데이터가 없을 때 "Drawing result not found" 메시지가 표시되어야 합니다', () => {
    (usePowerBallDrawDetail as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    render(<PowerBallDrawDetail date={mockDate} />);

    expect(screen.getByText('Drawing result not found')).toBeInTheDocument();
    expect(
      screen.getByText(`We couldn't find the drawing result for ${mockDate}`)
    ).toBeInTheDocument();

    // 뒤로 가기 버튼 확인
    const backButton = screen.getByText('Back to Drawing Results');
    expect(backButton).toBeInTheDocument();
  });

  it('에러 발생 시 토스트 알림이 표시되어야 합니다', () => {
    (usePowerBallDrawDetail as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: '서버 오류가 발생했습니다',
    });

    render(<PowerBallDrawDetail date={mockDate} />);

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Error',
      description: '서버 오류가 발생했습니다',
      variant: 'destructive',
    });
  });

  it('데이터가 있을 때 모든 정보가 올바르게 표시되어야 합니다', () => {
    (usePowerBallDrawDetail as jest.Mock).mockReturnValue({
      data: mockDrawData,
      loading: false,
      error: null,
    });

    render(<PowerBallDrawDetail date={mockDate} />);

    // 기본 정보
    expect(screen.getByText(`Powerball Result: ${mockDrawData.date}`)).toBeInTheDocument();
    expect(screen.getByText(`Power Play: ${mockDrawData.power_play}`)).toBeInTheDocument();

    // 당첨 번호
    const whiteNumbers = screen.getAllByTestId('white-number');
    expect(whiteNumbers).toHaveLength(5);
    expect(whiteNumbers[0]).toHaveAttribute('data-number', '10');
    expect(whiteNumbers[4]).toHaveAttribute('data-number', '50');

    const powerballNumber = screen.getByTestId('powerball-number');
    expect(powerballNumber).toHaveAttribute('data-number', '15');

    // 잭팟 정보
    expect(screen.getByText('Estimated Jackpot:')).toBeInTheDocument();
    expect(screen.getByText('$100 Million')).toBeInTheDocument();
    expect(screen.getByText('Cash Value:')).toBeInTheDocument();
    expect(screen.getByText('$50 Million')).toBeInTheDocument();
    expect(screen.getByText('California')).toBeInTheDocument();
    expect(screen.getByText('Texas, Florida')).toBeInTheDocument();

    // 상금 분류 테이블
    const prizeTable = screen.getByTestId('prize-breakdown-table');
    expect(prizeTable).toBeInTheDocument();
    expect(prizeTable).toHaveAttribute('data-prizes', '2');
  });

  it('일부 데이터가 없을 때 대체 텍스트가 표시되어야 합니다', () => {
    const partialData: DrawDetailResponse = {
      ...mockDrawData,
      estimated_jackpot: undefined,
      cash_value: undefined,
      jackpot_winners_location: undefined,
      match5_pp_winners_location: undefined,
      match5_winners_location: undefined,
      prize_breakdown: undefined,
    };

    (usePowerBallDrawDetail as jest.Mock).mockReturnValue({
      data: partialData,
      loading: false,
      error: null,
    });

    render(<PowerBallDrawDetail date={mockDate} />);

    // 필수 데이터는 존재해야 함
    expect(screen.getByText(`Powerball Result: ${mockDrawData.date}`)).toBeInTheDocument();

    // 없는 데이터는 None으로 표시되어야 함
    const noneTexts = screen.getAllByText('None');
    expect(noneTexts.length).toBe(3);

    // 상금 분류 테이블은 없어야 함
    expect(screen.queryByTestId('prize-breakdown-table')).not.toBeInTheDocument();
  });

  it('뒤로 가기 버튼 렌더링을 확인합니다', () => {
    (usePowerBallDrawDetail as jest.Mock).mockReturnValue({
      data: mockDrawData,
      loading: false,
      error: null,
    });

    render(<PowerBallDrawDetail date={mockDate} />);

    const backButton = screen.getByText('Back to Drawing Results');
    expect(backButton).toBeInTheDocument();
    expect(backButton.closest('a')).toHaveAttribute('href', '/power-ball/draws');
  });
});
