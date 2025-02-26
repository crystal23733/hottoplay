import { fireEvent, render, screen } from '@testing-library/react';
import NumberGrid from '../NumberGrid';

describe('NumberGrid', () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it('renders all numbers from 1 to 69', () => {
    render(<NumberGrid selectedNumbers={[]} onNumberSelect={mockOnSelect} />);

    for (let i = 1; i <= 69; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it('highlights selected numbers', () => {
    render(<NumberGrid selectedNumbers={[1, 2, 3]} onNumberSelect={mockOnSelect} />);

    const button1 = screen.getByText('1');
    const button4 = screen.getByText('4');

    expect(button1).toHaveClass('bg-primary');
    expect(button4).not.toHaveClass('bg-primary');
  });

  it('calls onNumberSelect when a number is clicked', () => {
    render(<NumberGrid selectedNumbers={[]} onNumberSelect={mockOnSelect} />);

    fireEvent.click(screen.getByText('5'));
    expect(mockOnSelect).toHaveBeenCalledWith(5);
  });

  it('disables all buttons when disabled prop is true', () => {
    render(<NumberGrid selectedNumbers={[]} onNumberSelect={mockOnSelect} disabled />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });
});
