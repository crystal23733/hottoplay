import { render, screen, fireEvent } from '@testing-library/react';
import DreamSearchInput from '../DreamSearchInput';

describe('DreamSearchInput', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('입력값이 올바르게 렌더링되어야 합니다', () => {
    render(<DreamSearchInput value="돼지" onChange={mockOnChange} />);
    const input = screen.getByLabelText('꿈 키워드 검색');
    expect(input).toHaveValue('돼지');
  });

  it('onChange 이벤트가 올바르게 동작해야 합니다', () => {
    render(<DreamSearchInput value="" onChange={mockOnChange} />);
    const input = screen.getByLabelText('꿈 키워드 검색');

    fireEvent.change(input, { target: { value: '돼지' } });
    expect(mockOnChange).toHaveBeenCalledWith('돼지');
  });

  it('검색 입력창이 placeholder를 가져야 합니다', () => {
    render(<DreamSearchInput value="" onChange={mockOnChange} />);
    const input = screen.getByPlaceholderText(/꿈 키워드를 입력하세요/);
    expect(input).toBeInTheDocument();
  });
});
