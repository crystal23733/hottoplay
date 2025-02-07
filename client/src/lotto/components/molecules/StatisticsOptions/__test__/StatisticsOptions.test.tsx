import { render, screen, fireEvent } from '@testing-library/react';
import StatisticsOptions from '../StatisticsOptions';

describe('StatisticsOptions', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders all statistics options', () => {
    render(<StatisticsOptions value="hot" onChange={mockOnChange} />);

    expect(screen.getByLabelText('상위 빈도 조합')).toBeInTheDocument();
    expect(screen.getByLabelText('최근 미출현 번호')).toBeInTheDocument();
    expect(screen.getByLabelText('구간별 빈도 조합')).toBeInTheDocument();
    expect(screen.getByLabelText('확률 가중치 기반')).toBeInTheDocument();
  });

  it('shows correct selected value', () => {
    render(<StatisticsOptions value="hot" onChange={mockOnChange} />);

    expect(screen.getByLabelText('상위 빈도 조합')).toBeChecked();
    expect(screen.getByLabelText('최근 미출현 번호')).not.toBeChecked();
  });

  it('calls onChange when selection changes', () => {
    render(<StatisticsOptions value="hot" onChange={mockOnChange} />);

    fireEvent.click(screen.getByLabelText('최근 미출현 번호'));
    expect(mockOnChange).toHaveBeenCalledWith('cold');
  });
});
