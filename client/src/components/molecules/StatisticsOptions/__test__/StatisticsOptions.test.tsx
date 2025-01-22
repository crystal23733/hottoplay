import { render, screen, fireEvent } from '@testing-library/react';
import StatisticsOptions from '../StatisticsOptions';

describe('StatisticsOptions', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders all statistics options', () => {
    render(<StatisticsOptions value="hot" onChange={mockOnChange} />);

    expect(screen.getByLabelText(/핫 넘버/)).toBeInTheDocument();
    expect(screen.getByLabelText(/콜드 넘버/)).toBeInTheDocument();
    expect(screen.getByLabelText(/밸런스/)).toBeInTheDocument();
    expect(screen.getByLabelText(/가중치 기반/)).toBeInTheDocument();
  });

  it('shows correct selected value', () => {
    render(<StatisticsOptions value="hot" onChange={mockOnChange} />);

    expect(screen.getByLabelText(/핫 넘버/)).toBeChecked();
    expect(screen.getByLabelText(/콜드 넘버/)).not.toBeChecked();
  });

  it('calls onChange when selection changes', () => {
    render(<StatisticsOptions value="hot" onChange={mockOnChange} />);

    fireEvent.click(screen.getByLabelText(/콜드 넘버/));
    expect(mockOnChange).toHaveBeenCalledWith('cold');
  });
});
