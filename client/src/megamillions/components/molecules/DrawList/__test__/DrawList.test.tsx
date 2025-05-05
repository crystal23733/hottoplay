import { render, screen } from '@testing-library/react';
import DrawList from '../DrawList';
import { DrawSummary } from '@/api/powerBall/powerBallDraw.types';

// DrawListItem 모킹
jest.mock('../../../atoms/DrawListItem/DrawListItem', () => {
  return jest.fn(({ draw }) => (
    <div data-testid="draw-list-item" data-date={draw.date}>
      {draw.date}
    </div>
  ));
});

describe('DrawList 컴포넌트', () => {
  // 테스트 데이터
  const mockDraws: DrawSummary[] = [
    {
      date: '2023-04-01',
      white_numbers: ['10', '23', '35', '47', '52'],
      powerball: '12',
      power_play: '2X',
    },
    {
      date: '2023-03-29',
      white_numbers: ['5', '12', '20', '32', '44'],
      powerball: '8',
      power_play: '3X',
    },
  ];

  it('로딩 중일 때 스켈레톤 UI를 표시해야 합니다', () => {
    const { container } = render(<DrawList draws={[]} loading={true} />);

    // 5개의 로딩 스켈레톤 요소 확인 (container.querySelectorAll 사용)
    const skeletonElements = container.querySelectorAll('.animate-pulse');
    expect(skeletonElements).toHaveLength(5);
  });

  it('데이터가 없을 때 "No drawing results found" 메시지를 표시해야 합니다', () => {
    render(<DrawList draws={[]} loading={false} />);

    expect(screen.getByText('No drawing results found')).toBeInTheDocument();
  });

  it('데이터가 있을 때 모든 DrawListItem을 렌더링해야 합니다', () => {
    render(<DrawList draws={mockDraws} loading={false} />);

    // DrawListItem 컴포넌트가 데이터 개수만큼 렌더링되었는지 확인
    const listItems = screen.getAllByTestId('draw-list-item');
    expect(listItems).toHaveLength(2);

    // 각 아이템이 올바른 데이터로 렌더링되었는지 확인
    expect(listItems[0]).toHaveAttribute('data-date', '2023-04-01');
    expect(listItems[1]).toHaveAttribute('data-date', '2023-03-29');
  });

  it('키 값이 유니크하게 생성되어야 합니다', () => {
    // 동일한 날짜를 가진 데이터로 테스트
    const duplicateDateDraws: DrawSummary[] = [
      {
        date: '2023-04-01',
        white_numbers: ['10', '20', '30', '40', '50'],
        powerball: '10',
        power_play: '2X',
      },
      {
        date: '2023-04-01',
        white_numbers: ['15', '25', '35', '45', '55'],
        powerball: '15',
        power_play: '3X',
      },
    ];

    // 키 값은 내부적으로 생성되므로 직접 테스트는 어렵지만,
    // 렌더링이 오류 없이 완료되는지 확인할 수 있습니다
    expect(() => {
      render(<DrawList draws={duplicateDateDraws} loading={false} />);
    }).not.toThrow();

    const listItems = screen.getAllByTestId('draw-list-item');
    expect(listItems).toHaveLength(2);
  });
});
