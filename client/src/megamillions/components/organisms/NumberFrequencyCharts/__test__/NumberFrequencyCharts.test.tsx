import { render, screen } from '@testing-library/react';
import NumberFrequencyCharts from '../NumberFrequencyCharts';
import { NumberFrequencyResponse } from '@/api/megamillions/megaMillionsDraw.types';

// UI 컴포넌트 모킹
jest.mock('@/ui/Card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div data-testid="card">{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-header">{children}</div>
  ),
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-content">{children}</div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-title">{children}</div>
  ),
}));

jest.mock('@/ui/Tabs', () => ({
  Tabs: ({ children, className }: { children: React.ReactNode; className: string }) => (
    <div data-testid="tabs" className={className}>
      {children}
    </div>
  ),
  TabsContent: ({ children, value }: { children: React.ReactNode; value: string }) => (
    <div data-testid={`tabs-content-${value}`}>{children}</div>
  ),
  TabsList: ({ children, className }: { children: React.ReactNode; className: string }) => (
    <div data-testid="tabs-list" className={className}>
      {children}
    </div>
  ),
  TabsTrigger: ({ children, value }: { children: React.ReactNode; value: string }) => (
    <button data-testid={`tab-${value}`} data-value={value}>
      {children}
    </button>
  ),
}));

// FrequencyChart 컴포넌트 모킹
jest.mock('../../../molecules/FrequencyChart/FrequencyChart', () => {
  return jest.fn(({ data, title, color, height }) => (
    <div data-testid="frequency-chart" data-color={color} data-height={height}>
      <div data-testid="chart-title">{title}</div>
      <div data-testid="chart-data-count">{data.length}</div>
    </div>
  ));
});

describe('NumberFrequencyCharts 컴포넌트', () => {
  // 테스트 데이터
  const mockData: NumberFrequencyResponse = {
    white_balls: [
      { number: 1, count: 10 },
      { number: 2, count: 15 },
    ],
    mega_balls: [
      { number: 1, count: 5 },
      { number: 2, count: 8 },
    ],
  };

  it('로딩 상태를 올바르게 표시해야 합니다', () => {
    render(<NumberFrequencyCharts data={null} loading={true} error={null} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByTestId('card-title')).toHaveTextContent('Number Frequency Analysis');
  });

  it('에러 상태를 올바르게 표시해야 합니다', () => {
    render(<NumberFrequencyCharts data={null} loading={false} error="오류 발생" />);

    expect(screen.getByText('An error occurred while loading the data.')).toBeInTheDocument();
    expect(screen.getByTestId('card-title')).toHaveTextContent('Number Frequency Analysis');
  });

  it('데이터가 있을 때 탭과 차트를 올바르게 표시해야 합니다', () => {
    render(<NumberFrequencyCharts data={mockData} loading={false} error={null} />);

    // 탭이 올바르게 렌더링되었는지 확인
    expect(screen.getByTestId('tab-white')).toBeInTheDocument();
    expect(screen.getByTestId('tab-power')).toBeInTheDocument();

    // 기본적으로 white 탭이 선택되었는지 확인
    const whiteTabContent = screen.getByTestId('tabs-content-white');
    expect(whiteTabContent).toBeInTheDocument();

    // white 탭의 차트가 올바른 데이터로 렌더링되었는지 확인
    const chartInWhiteTab = whiteTabContent.querySelector('[data-testid="frequency-chart"]');
    expect(chartInWhiteTab).toBeInTheDocument();
    expect(chartInWhiteTab?.getAttribute('data-color')).toBe('#3b82f6');

    // 차트 데이터 항목 수 확인
    const chartDataCount = whiteTabContent.querySelector('[data-testid="chart-data-count"]');
    expect(chartDataCount).toHaveTextContent('2');
  });
});
