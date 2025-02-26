import { render, screen } from '@testing-library/react';
import DreamList from '../DreamList';

// DreamCard 컴포넌트 모킹
jest.mock('@/components/molecules/Dream/DreamCard/DreamCard', () => {
  return {
    __esModule: true,
    default: ({ keyword, interpretation }: { keyword: string; interpretation: string }) => (
      <div data-testid="dream-card">
        <h3>{keyword}</h3>
        <p>{interpretation}</p>
      </div>
    ),
  };
});

describe('DreamList', () => {
  const mockDreams = [
    {
      keyword: '돼지',
      interpretation: '재물운을 상징합니다',
      type: 'good' as const,
      image: '/images/dreams/pig.jpg',
    },
    {
      keyword: '뱀',
      interpretation: '변화의 징조입니다',
      type: 'bad' as const,
      image: '/images/dreams/snake.jpg',
    },
  ];

  it('검색어가 없을 때 모든 꿈이 표시되어야 합니다', () => {
    render(<DreamList dreams={mockDreams} searchTerm="" />);

    const dreamCards = screen.getAllByTestId('dream-card');
    expect(dreamCards).toHaveLength(2);
    expect(screen.getByText('돼지')).toBeInTheDocument();
    expect(screen.getByText('뱀')).toBeInTheDocument();
  });

  it('검색어에 맞는 꿈만 필터링되어야 합니다', () => {
    render(<DreamList dreams={mockDreams} searchTerm="돼지" />);

    const dreamCards = screen.getAllByTestId('dream-card');
    expect(dreamCards).toHaveLength(1);
    expect(screen.getByText('돼지')).toBeInTheDocument();
    expect(screen.queryByText('뱀')).not.toBeInTheDocument();
  });

  it('검색어가 대소문자를 구분하지 않아야 합니다', () => {
    render(<DreamList dreams={mockDreams} searchTerm="돼지" />);

    expect(screen.getByText('돼지')).toBeInTheDocument();
    expect(screen.queryByText('뱀')).not.toBeInTheDocument();
  });

  it('검색 결과가 없을 때 빈 리스트가 렌더링되어야 합니다', () => {
    render(<DreamList dreams={mockDreams} searchTerm="없는꿈" />);

    const dreamCards = screen.queryAllByTestId('dream-card');
    expect(dreamCards).toHaveLength(0);
  });

  it('grid 레이아웃이 적용되어야 합니다', () => {
    const { container } = render(<DreamList dreams={mockDreams} searchTerm="" />);
    expect(container.firstChild).toHaveClass('grid');
    expect(container.firstChild).toHaveClass('gap-4');
  });
});
