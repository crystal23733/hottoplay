import { render, screen } from '@testing-library/react';
import DrawListItem from '../DrawListItem';
import { MegaMillionsDraw } from '@/api/megamillions/megaMillions.types';

// 의존성 모킹
jest.mock('next/link', () => {
  const MockComponent = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid="link">
      {children}
    </a>
  );
  return MockComponent;
});

jest.mock('../../../atoms/MegaMillionsNumber/MegaMillionsNumber', () => {
  return jest.fn(({ number, isMegaBall, className }) => (
    <div
      data-testid={isMegaBall ? 'mega-ball-number' : 'white-number'}
      data-number={number}
      className={className}
    >
      {number}
    </div>
  ));
});

jest.mock('@/ui/Card', () => ({
  Card: ({ children, className }: { children: React.ReactNode; className: string }) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
}));

describe('DrawListItem 컴포넌트', () => {
  // 테스트 데이터
  const mockDraw: MegaMillionsDraw = {
    draw_date: '2023-04-01',
    white_numbers: [10, 23, 35, 47, 52],
    mega_ball: 12,
    multiplier: '2X',
  };

  it('모든 정보가 올바르게 렌더링되어야 합니다', () => {
    render(<DrawListItem draw={mockDraw} />);

    // 날짜 확인
    expect(screen.getByText('2023-04-01')).toBeInTheDocument();

    // 추정 당첨금 확인
    expect(screen.getByText('Multiplier: 2X')).toBeInTheDocument();

    // 링크 경로 확인
    const link = screen.getByTestId('link');
    expect(link).toHaveAttribute('href', '/mega-millions/draws/draw-detail?date=2023-04-01');
  });

  it('흰색 공과 메가볼이 올바르게 렌더링되어야 합니다', () => {
    render(<DrawListItem draw={mockDraw} />);

    // 흰색 공 확인
    const whiteNumbers = screen.getAllByTestId('white-number');
    expect(whiteNumbers).toHaveLength(5);

    // 흰색 공 번호 확인
    expect(whiteNumbers[0]).toHaveAttribute('data-number', '10');
    expect(whiteNumbers[1]).toHaveAttribute('data-number', '23');
    expect(whiteNumbers[2]).toHaveAttribute('data-number', '35');
    expect(whiteNumbers[3]).toHaveAttribute('data-number', '47');
    expect(whiteNumbers[4]).toHaveAttribute('data-number', '52');

    // 메가볼 확인
    const megaBall = screen.getByTestId('mega-ball-number');
    expect(megaBall).toHaveAttribute('data-number', '12');
  });

  it('구분선이 있어야 합니다', () => {
    render(<DrawListItem draw={mockDraw} />);

    const separator = screen.getByRole('separator');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
  });
});
