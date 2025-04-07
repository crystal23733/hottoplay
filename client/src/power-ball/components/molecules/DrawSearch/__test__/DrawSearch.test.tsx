import { render, screen, fireEvent } from '@testing-library/react';
import DrawSearch from '../DrawSearch';

// 의존성 모킹
jest.mock('lucide-react', () => ({
  Filter: () => <div data-testid="filter-icon" />,
  Search: () => <div data-testid="search-icon" />,
  X: () => <div data-testid="x-icon" />,
}));

jest.mock('@/ui/input', () => ({
  Input: ({
    placeholder,
    value,
    onChange,
    className,
    type,
  }: {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className: string;
    type: string;
  }) => (
    <input
      data-testid="search-input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      type={type as 'submit' | 'reset' | 'button'}
    />
  ),
}));

jest.mock('@/ui/Button', () => ({
  Button: ({
    children,
    onClick,
    type,
    className,
    disabled,
    'aria-label': ariaLabel,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    type: string;
    className: string;
    disabled: boolean;
    'aria-label': string;
  }) => (
    <button
      data-testid={
        ariaLabel
          ? `button-${ariaLabel.toLowerCase().replace(/\s+/g, '-')}`
          : typeof children === 'string'
            ? `button-${children.toLowerCase().replace(/\s+/g, '-')}`
            : 'button-default'
      }
      onClick={onClick}
      type={type as 'submit' | 'reset' | 'button'}
      className={className}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  ),
}));

jest.mock('@/ui/date-picker', () => ({
  DatePicker: ({
    date,
    setDate,
    placeholder,
  }: {
    date: Date;
    setDate: (date: Date) => void;
    placeholder: string;
  }) => (
    <div data-testid={`date-picker-${placeholder?.replace(/\s+/g, '-').toLowerCase()}`}>
      <input
        type="date"
        value={date ? date.toISOString().split('T')[0] : ''}
        onChange={e => setDate(new Date(e.target.value))}
        placeholder={placeholder}
      />
    </div>
  ),
}));

jest.mock('@/ui/Card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div data-testid="card">{children}</div>,
  CardContent: ({ children, className }: { children: React.ReactNode; className: string }) => (
    <div data-testid="card-content" className={className}>
      {children}
    </div>
  ),
}));

// dayjs 모킹
jest.mock('dayjs', () => {
  const actual = jest.requireActual('dayjs');
  return jest.fn(date => ({
    format: (format: string) => {
      if (format === 'ddd, MMM D, YYYY') {
        // 날짜를 일관된 형식으로 반환
        return date instanceof Date ? `${date.toDateString()}` : 'Mock Date';
      }
      return actual(date).format(format);
    },
  }));
});

describe('DrawSearch 컴포넌트', () => {
  const mockOnSearch = jest.fn();
  const mockOnDateSearch = jest.fn();
  const mockOnReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('검색어 입력 및 검색 버튼 클릭 시 onSearch가 호출되어야 합니다', async () => {
    render(
      <DrawSearch onSearch={mockOnSearch} onDateSearch={mockOnDateSearch} onReset={mockOnReset} />
    );

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('button-search');

    // 검색어 입력
    fireEvent.change(searchInput, { target: { value: '파워볼 당첨번호' } });
    // 검색 버튼 클릭
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('파워볼 당첨번호');
  });

  it('Enter 키 입력 시에도 검색이 실행되어야 합니다', () => {
    render(
      <DrawSearch onSearch={mockOnSearch} onDateSearch={mockOnDateSearch} onReset={mockOnReset} />
    );

    const searchInput = screen.getByTestId('search-input');

    // 검색어 입력
    fireEvent.change(searchInput, { target: { value: '최근 당첨번호' } });
    // Enter 키 입력
    fireEvent.submit(searchInput.closest('form') as HTMLFormElement);

    expect(mockOnSearch).toHaveBeenCalledWith('최근 당첨번호');
  });

  it('필터 토글 버튼 클릭 시 필터가 표시되고 숨겨져야 합니다', () => {
    render(
      <DrawSearch onSearch={mockOnSearch} onDateSearch={mockOnDateSearch} onReset={mockOnReset} />
    );

    const filterButton = screen.getByTestId('button-toggle-filters');

    // 초기에는 필터가 숨겨져 있어야 함
    expect(screen.queryByTestId('card')).not.toBeInTheDocument();

    // 필터 버튼 클릭
    fireEvent.click(filterButton);

    // 필터가 표시되어야 함
    expect(screen.getByTestId('card')).toBeInTheDocument();

    // 필터 버튼 다시 클릭
    fireEvent.click(filterButton);

    // 필터가 다시 숨겨져야 함
    expect(screen.queryByTestId('card')).not.toBeInTheDocument();
  });

  it('특정 날짜 선택 시 onDateSearch가 호출되어야 합니다', () => {
    render(
      <DrawSearch onSearch={mockOnSearch} onDateSearch={mockOnDateSearch} onReset={mockOnReset} />
    );

    const filterButton = screen.getByTestId('button-toggle-filters');
    fireEvent.click(filterButton);

    const datePicker = screen.getByTestId('date-picker-select-a-date');
    const dateInput = datePicker.querySelector('input');

    if (dateInput) {
      // 날짜 선택
      const testDate = new Date('2023-04-01');
      fireEvent.change(dateInput, { target: { value: '2023-04-01' } });

      expect(mockOnDateSearch).toHaveBeenCalledWith(
        testDate.toDateString(),
        testDate.toDateString()
      );
    }
  });

  it('날짜 범위 검색 시 onDateSearch가 호출되어야 합니다', () => {
    render(
      <DrawSearch onSearch={mockOnSearch} onDateSearch={mockOnDateSearch} onReset={mockOnReset} />
    );

    const filterButton = screen.getByTestId('button-toggle-filters');
    fireEvent.click(filterButton);

    const startDatePicker = screen.getByTestId('date-picker-from-date');
    const endDatePicker = screen.getByTestId('date-picker-to-date');

    const startDateInput = startDatePicker.querySelector('input');
    const endDateInput = endDatePicker.querySelector('input');

    if (startDateInput && endDateInput) {
      fireEvent.change(startDateInput, { target: { value: '2023-03-01' } });
      fireEvent.change(endDateInput, { target: { value: '2023-03-31' } });

      // 적용 버튼 클릭
      const applyButton = screen.getByTestId('button-apply-date-range');
      fireEvent.click(applyButton);

      expect(mockOnDateSearch).toHaveBeenCalled();
    }
  });

  it('초기화 버튼 클릭 시 onReset이 호출되고 입력값이 초기화되어야 합니다', () => {
    render(
      <DrawSearch onSearch={mockOnSearch} onDateSearch={mockOnDateSearch} onReset={mockOnReset} />
    );

    // 검색어 입력
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: '테스트 검색어' } });

    // 초기화 버튼 클릭
    const resetButton = screen.getByTestId('button-reset-filters');
    fireEvent.click(resetButton);

    // onReset 호출 확인
    expect(mockOnReset).toHaveBeenCalled();

    // 검색어가 초기화되었는지 확인
    expect(searchInput).toHaveValue('');
  });

  it('시작일 또는 종료일이 없는 경우 날짜 범위 적용 버튼이 비활성화되어야 합니다', () => {
    render(
      <DrawSearch onSearch={mockOnSearch} onDateSearch={mockOnDateSearch} onReset={mockOnReset} />
    );

    const filterButton = screen.getByTestId('button-toggle-filters');
    fireEvent.click(filterButton);

    // 초기에는 버튼이 비활성화되어 있어야 함
    const applyButton = screen.getByTestId('button-apply-date-range');
    expect(applyButton).toBeDisabled();

    // 시작일만 선택
    const startDatePicker = screen.getByTestId('date-picker-from-date');
    const startDateInput = startDatePicker.querySelector('input');

    if (startDateInput) {
      fireEvent.change(startDateInput, { target: { value: '2023-03-01' } });
      expect(applyButton).toBeDisabled();
    }
  });
});
