import { render, screen } from '@testing-library/react';
import FrequencyChart from '../FrequencyChart';
import { NumberFrequency } from '@/api/powerBall/powerBallDraw.types';

// recharts 컴포넌트 모킹
jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => children,
    BarChart: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="bar-chart">{children}</div>
    ),
    Bar: () => <div data-testid="bar" />,
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    CartesianGrid: () => <div data-testid="cartesian-grid" />,
    Tooltip: () => <div data-testid="tooltip" />,
    Legend: () => <div data-testid="legend" />,
  };
});

describe('FrequencyChart 컴포넌트', () => {
  const mockData: NumberFrequency[] = [
    { number: 1, count: 10 },
    { number: 2, count: 15 },
    { number: 3, count: 8 },
  ];

  it('제목과 차트가 올바르게 렌더링되어야 합니다', () => {
    render(<FrequencyChart data={mockData} title="테스트 차트" color="#ff0000" />);

    expect(screen.getByText('테스트 차트')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });

  it('커스텀 레이블과 높이가 적용되어야 합니다', () => {
    const { container } = render(
      <FrequencyChart
        data={mockData}
        title="커스텀 차트"
        color="#0000ff"
        label="출현 횟수"
        height={400}
      />
    );

    expect(screen.getByText('커스텀 차트')).toBeInTheDocument();
    const chartContainer = container.querySelector('div[style*="height"]');
    expect(chartContainer).toBeInTheDocument();
  });

  it('데이터가 없을 때도 오류 없이 렌더링되어야 합니다', () => {
    render(<FrequencyChart data={[]} title="빈 차트" color="#00ff00" />);

    expect(screen.getByText('빈 차트')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });
});
