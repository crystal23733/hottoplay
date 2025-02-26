import { render, screen, fireEvent } from '@testing-library/react';
import DreamSearch from '../DreamSearch';

describe('DreamSearch', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('검색 입력창이 올바르게 렌더링되어야 합니다', () => {
    render(<DreamSearch searchTerm="" onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText(/꿈 키워드를 입력하세요/)).toBeInTheDocument();
  });

  it('검색어 변경 시 onSearch가 호출되어야 합니다', () => {
    render(<DreamSearch searchTerm="" onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/꿈 키워드를 입력하세요/);

    fireEvent.change(input, { target: { value: '돼지' } });
    expect(mockOnSearch).toHaveBeenCalledWith('돼지');
  });
});
