import { render, screen, fireEvent } from '@testing-library/react';
import PowerBallGenerator from '../PowerBallGenerator';

// 아이콘 모킹
jest.mock('lucide-react', () => ({
  Loader2: () => <div data-testid="loader-icon" />,
  Info: () => <div data-testid="info-icon" />,
}));

describe('PowerBallGenerator', () => {
  const mockOnCountChange = jest.fn();
  const mockOnGenerate = jest.fn();

  beforeEach(() => {
    mockOnCountChange.mockClear();
    mockOnGenerate.mockClear();
  });

  it('renders with initial count', () => {
    render(
      <PowerBallGenerator
        count={5}
        onCountChange={mockOnCountChange}
        onGenerate={mockOnGenerate}
        isLoading={false}
      />
    );

    expect(screen.getByLabelText('Number of Sets')).toHaveValue(5);
  });

  it('calls onCountChange with valid values', () => {
    render(
      <PowerBallGenerator
        count={5}
        onCountChange={mockOnCountChange}
        onGenerate={mockOnGenerate}
        isLoading={false}
      />
    );

    const input = screen.getByLabelText('Number of Sets');
    fireEvent.change(input, { target: { value: '7' } });
    expect(mockOnCountChange).toHaveBeenCalledWith(7);
  });

  it('clamps values between 1 and 10', () => {
    render(
      <PowerBallGenerator
        count={5}
        onCountChange={mockOnCountChange}
        onGenerate={mockOnGenerate}
        isLoading={false}
      />
    );

    const input = screen.getByLabelText('Number of Sets');

    fireEvent.change(input, { target: { value: '15' } });
    expect(mockOnCountChange).toHaveBeenCalledWith(10);

    fireEvent.change(input, { target: { value: '0' } });
    expect(mockOnCountChange).toHaveBeenCalledWith(1);
  });

  it('shows loading state', () => {
    render(
      <PowerBallGenerator
        count={5}
        onCountChange={mockOnCountChange}
        onGenerate={mockOnGenerate}
        isLoading
      />
    );

    expect(screen.getByText('Generating...')).toBeInTheDocument();
    expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows info message', () => {
    render(
      <PowerBallGenerator
        count={5}
        onCountChange={mockOnCountChange}
        onGenerate={mockOnGenerate}
        isLoading={false}
      />
    );

    expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    expect(screen.getByText(/This is a free number generator/)).toBeInTheDocument();
  });
});
