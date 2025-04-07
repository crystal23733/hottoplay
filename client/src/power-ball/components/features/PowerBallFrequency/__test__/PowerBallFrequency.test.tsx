import { render, screen, fireEvent } from '@testing-library/react';
import PowerBallFrequency from '../PowerBallFrequency';
import usePowerBallNumberFrequency from '@/power-ball/hooks/usePowerBallNumberFrequency';
import { useToast } from '@/common/hooks/use-toast';
import { NumberFrequencyResponse } from '@/api/powerBall/powerBallDraw.types';

// 훅 모킹
jest.mock('@/power-ball/hooks/usePowerBallNumberFrequency');
jest.mock('@/common/hooks/use-toast');

// UI 컴포넌트 모킹
jest.mock('lucide-react', () => ({
  RefreshCw: () => <div data-testid="refresh-icon" />,
}));

jest.mock('@/ui/Button', () => ({
  Button: ({
    children,
    onClick,
    disabled,
    className,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    disabled: boolean;
    className: string;
  }) => (
    <button
      data-testid="refresh-button"
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  ),
}));

jest.mock('../../../organisms/NumberFrequencyCharts/NumberFrequencyCharts', () => {
  return jest.fn(({ data, loading, error }) => (
    <div data-testid="frequency-charts" data-loading={loading} data-error={error || ''}>
      {data ? 'Charts Loaded' : 'No Data'}
    </div>
  ));
});

describe('PowerBallFrequency 컴포넌트', () => {
  beforeEach(() => {
    // 기본 모킹 설정
    (useToast as jest.Mock).mockReturnValue({
      toast: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('로딩 상태일 때 새로고침 버튼이 비활성화되어야 합니다', () => {
    (usePowerBallNumberFrequency as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refreshFrequency: jest.fn(),
    });

    render(<PowerBallFrequency />);

    const refreshButton = screen.getByTestId('refresh-button');
    expect(refreshButton).toBeDisabled();

    const frequencyCharts = screen.getByTestId('frequency-charts');
    expect(frequencyCharts).toHaveAttribute('data-loading', 'true');
  });

  it('에러 발생 시 토스트 알림이 표시되어야 합니다', () => {
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });

    (usePowerBallNumberFrequency as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: '데이터 로딩 오류 발생',
      refreshFrequency: jest.fn(),
    });

    render(<PowerBallFrequency />);

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Data loading error',
      description: '데이터 로딩 오류 발생',
      variant: 'destructive',
    });

    const frequencyCharts = screen.getByTestId('frequency-charts');
    expect(frequencyCharts).toHaveAttribute('data-error', '데이터 로딩 오류 발생');
  });

  it('데이터가 로드되면 차트가 표시되어야 합니다', () => {
    const mockData: NumberFrequencyResponse = {
      white_balls: [{ number: 1, count: 10 }],
      power_balls: [{ number: 2, count: 5 }],
    };

    (usePowerBallNumberFrequency as jest.Mock).mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
      refreshFrequency: jest.fn(),
    });

    render(<PowerBallFrequency />);

    const refreshButton = screen.getByTestId('refresh-button');
    expect(refreshButton).not.toBeDisabled();

    const frequencyCharts = screen.getByTestId('frequency-charts');
    expect(frequencyCharts).toHaveAttribute('data-loading', 'false');
    expect(frequencyCharts).toHaveAttribute('data-error', '');
    expect(screen.getByText('Charts Loaded')).toBeInTheDocument();
  });

  it('새로고침 버튼 클릭 시 refreshFrequency 함수가 호출되어야 합니다', () => {
    const mockRefreshFrequency = jest.fn();
    const mockToast = jest.fn();

    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (usePowerBallNumberFrequency as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refreshFrequency: mockRefreshFrequency,
    });

    render(<PowerBallFrequency />);

    const refreshButton = screen.getByTestId('refresh-button');
    fireEvent.click(refreshButton);

    expect(mockRefreshFrequency).toHaveBeenCalledTimes(1);
    expect(mockToast).toHaveBeenCalledWith({
      description: 'Refreshing number frequency data...',
    });
  });
});
