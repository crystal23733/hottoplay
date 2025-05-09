import { render, screen, fireEvent } from '@testing-library/react';
import MegaMillionsDraws from '../MegaMillionsDraws';
import useMegaMillionsDrawList from '@/megamillions/hooks/useMegaMillionsDrawList';
import { useToast } from '@/common/hooks/use-toast';

// 훅 모킹
jest.mock('@/megamillions/hooks/useMegaMillionsDrawList');
jest.mock('@/common/hooks/use-toast');

// 컴포넌트 모킹
jest.mock('../../../molecules/DrawSearch/DrawSearch', () => {
  return jest.fn(({ onSearch, onDateSearch, onReset }) => (
    <div data-testid="draw-search">
      <button data-testid="search-button" onClick={() => onSearch('test-term')}>
        검색
      </button>
      <button
        data-testid="date-search-button"
        onClick={() => onDateSearch('2023-01-01', '2023-01-31')}
      >
        날짜 검색
      </button>
      <button data-testid="reset-button" onClick={onReset}>
        초기화
      </button>
    </div>
  ));
});

jest.mock('../../../molecules/DrawList/DrawList', () => {
  return jest.fn(({ draws, loading }) => (
    <div data-testid="draw-list" data-loading={loading}>
      {draws.length > 0 ? (
        <div data-testid="draw-items">아이템 {draws.length}개</div>
      ) : (
        <div data-testid="no-draws">결과 없음</div>
      )}
    </div>
  ));
});

jest.mock('../../../molecules/DrawPaigination/DrawPagination', () => {
  return jest.fn(({ currentPage, totalPages, onPageChange, onPageSizeChange, totalResults }) => (
    <div data-testid="draw-pagination" data-page={currentPage} data-total-pages={totalPages}>
      <button data-testid="prev-page" onClick={() => onPageChange(currentPage - 1)}>
        이전
      </button>
      <button data-testid="next-page" onClick={() => onPageChange(currentPage + 1)}>
        다음
      </button>
      <button data-testid="change-page-size" onClick={() => onPageSizeChange(20)}>
        크기 변경
      </button>
      <span data-testid="total-results">{totalResults}</span>
    </div>
  ));
});

describe('MegaMillionsDraws 컴포넌트', () => {
  // 기본 모킹 데이터 설정
  const mockData = {
    draws: [
      {
        date: '2023-04-01',
        white_numbers: ['10', '20', '30', '40', '50'],
        powerball: '10',
        power_play: '2X',
      },
      {
        date: '2023-03-29',
        white_numbers: ['5', '15', '25', '35', '45'],
        powerball: '5',
        power_play: '3X',
      },
    ],
    total_count: 100,
    page: 1,
    page_size: 10,
  };

  const mockHookFunctions = {
    handlePageChange: jest.fn(),
    handlePageSizeChange: jest.fn(),
    resetFilters: jest.fn(),
    searchDraws: jest.fn(),
    setDateRange: jest.fn(),
  };

  const mockToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // useMegaMillionsDrawList 훅 모킹
    (useMegaMillionsDrawList as jest.Mock).mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
      page: 1,
      pageSize: 10,
      ...mockHookFunctions,
    });

    // useToast 훅 모킹
    (useToast as jest.Mock).mockReturnValue({
      toast: mockToast,
    });
  });

  it('컴포넌트가 올바르게 렌더링되어야 합니다', () => {
    render(<MegaMillionsDraws />);

    // 헤더가 있는지 확인
    expect(screen.getByText('MegaMillions Drawing Results')).toBeInTheDocument();

    // 서브 컴포넌트들이 렌더링되었는지 확인
    expect(screen.getByTestId('draw-search')).toBeInTheDocument();
    expect(screen.getByTestId('draw-list')).toBeInTheDocument();
    expect(screen.getByTestId('draw-pagination')).toBeInTheDocument();
  });

  it('에러 발생 시 토스트가 표시되어야 합니다', () => {
    // 에러가 있는 상태로 훅 모킹
    (useMegaMillionsDrawList as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: '데이터를 불러오는 중 오류가 발생했습니다',
      page: 1,
      pageSize: 10,
      ...mockHookFunctions,
    });

    render(<MegaMillionsDraws />);

    // 토스트가 호출되었는지 확인
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Error',
      description: '데이터를 불러오는 중 오류가 발생했습니다',
      variant: 'destructive',
    });
  });

  it('검색 버튼 클릭 시 searchDraws 함수가 호출되어야 합니다', () => {
    render(<MegaMillionsDraws />);

    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);

    expect(mockHookFunctions.searchDraws).toHaveBeenCalledWith({ search_term: 'test-term' });
  });

  it('날짜 검색 버튼 클릭 시 setDateRange 함수가 호출되어야 합니다', () => {
    render(<MegaMillionsDraws />);

    const dateSearchButton = screen.getByTestId('date-search-button');
    fireEvent.click(dateSearchButton);

    expect(mockHookFunctions.setDateRange).toHaveBeenCalledWith('2023-01-01', '2023-01-31');
  });

  it('초기화 버튼 클릭 시 resetFilters 함수가 호출되어야 합니다', () => {
    render(<MegaMillionsDraws />);

    const resetButton = screen.getByTestId('reset-button');
    fireEvent.click(resetButton);

    expect(mockHookFunctions.resetFilters).toHaveBeenCalled();
  });

  it('페이지 변경 시 handlePageChange 함수가 호출되어야 합니다', () => {
    render(<MegaMillionsDraws />);

    const nextPageButton = screen.getByTestId('next-page');
    fireEvent.click(nextPageButton);

    expect(mockHookFunctions.handlePageChange).toHaveBeenCalledWith(2);
  });

  it('페이지 크기 변경 시 handlePageSizeChange 함수가 호출되어야 합니다', () => {
    render(<MegaMillionsDraws />);

    const changePageSizeButton = screen.getByTestId('change-page-size');
    fireEvent.click(changePageSizeButton);

    expect(mockHookFunctions.handlePageSizeChange).toHaveBeenCalledWith(20);
  });

  it('로딩 중일 때 DrawList에 loading 속성이 전달되어야 합니다', () => {
    // 로딩 중인 상태로 훅 모킹
    (useMegaMillionsDrawList as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
      page: 1,
      pageSize: 10,
      ...mockHookFunctions,
    });

    render(<MegaMillionsDraws />);

    const drawList = screen.getByTestId('draw-list');
    expect(drawList).toHaveAttribute('data-loading', 'true');
  });

  it('데이터가 없을 때 페이지네이션이 표시되지 않아야 합니다', () => {
    // 데이터가 없는 상태로 훅 모킹
    (useMegaMillionsDrawList as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: null,
      page: 1,
      pageSize: 10,
      ...mockHookFunctions,
    });

    render(<MegaMillionsDraws />);

    expect(screen.queryByTestId('draw-pagination')).not.toBeInTheDocument();
  });

  it('총 페이지 수가 올바르게 계산되어야 합니다', () => {
    render(<MegaMillionsDraws />);

    const pagination = screen.getByTestId('draw-pagination');
    // 총 결과 100개, 페이지 크기 10 => 총 페이지 수 10
    expect(pagination).toHaveAttribute('data-total-pages', '10');
  });
});
