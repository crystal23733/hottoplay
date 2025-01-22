import { render, screen, fireEvent } from '@testing-library/react';
import PatternOptions from '../PatternOptions';

describe('PatternOptions', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders all pattern options', () => {
    render(<PatternOptions value="sequential" onChange={mockOnChange} />);

    expect(screen.getByLabelText('연속된 숫자 포함')).toBeInTheDocument();
    expect(screen.getByLabelText('홀짝 비율 조정')).toBeInTheDocument();
    expect(screen.getByLabelText('구간별 분배')).toBeInTheDocument();
  });

  it('shows correct selected value', () => {
    render(<PatternOptions value="sequential" onChange={mockOnChange} />);

    expect(screen.getByLabelText('연속된 숫자 포함')).toBeChecked();
    expect(screen.getByLabelText('홀짝 비율 조정')).not.toBeChecked();
    expect(screen.getByLabelText('구간별 분배')).not.toBeChecked();
  });

  it('calls onChange when selection changes', () => {
    render(<PatternOptions value="sequential" onChange={mockOnChange} />);

    fireEvent.click(screen.getByLabelText('홀짝 비율 조정'));
    expect(mockOnChange).toHaveBeenCalledWith('oddEven');
  });
});
