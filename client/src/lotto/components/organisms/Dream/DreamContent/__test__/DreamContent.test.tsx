import { render, screen, fireEvent } from '@testing-library/react';
import DreamContent from '../DreamContent';

// Pagination 컴포넌트 모킹
jest.mock('@/components/molecules/Pagination/Pagination', () => {
  return function MockPagination({ currentPage }: { currentPage: number }) {
    return (
      <div data-testid="pagination" data-current-page={currentPage}>
        <button>이전</button>
        <span>{currentPage}</span>
        <button>다음</button>
      </div>
    );
  };
});

// dreamData 모킹
jest.mock('@/data/dreams', () => ({
  dreamData: Array.from({ length: 15 }, (_, i) => ({
    keyword: `꿈${i + 1}`,
    interpretation: `해몽${i + 1}`,
    type: i % 2 === 0 ? 'good' : 'bad',
    image: `/images/dreams/dream${i + 1}.jpg`,
  })),
}));

describe('DreamContent', () => {
  it('검색 시 페이지가 1페이지로 리셋되어야 합니다', () => {
    render(<DreamContent />);

    // 검색 수행
    const searchInput = screen.getByPlaceholderText(/꿈 키워드를 입력하세요/);
    fireEvent.change(searchInput, { target: { value: '꿈1' } });

    // 페이지네이션이 1페이지를 가리키는지 확인
    expect(screen.getByTestId('pagination')).toHaveAttribute('data-current-page', '1');
  });

  it('검색어를 지우면 모든 컨텐츠가 다시 표시되어야 합니다', () => {
    render(<DreamContent />);
    const searchInput = screen.getByPlaceholderText(/꿈 키워드를 입력하세요/);

    // 검색어 입력
    fireEvent.change(searchInput, { target: { value: '꿈1' } });
    expect(screen.getByText('꿈1')).toBeInTheDocument();
    expect(screen.queryByText('꿈2')).not.toBeInTheDocument();

    // 검색어 지우기
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.getByText('꿈1')).toBeInTheDocument();
    expect(screen.getByText('꿈2')).toBeInTheDocument();
  });
});
