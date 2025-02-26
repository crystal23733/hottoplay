import { render, screen } from '@testing-library/react';
import PowerBallNumber from '../PowerBallNumber';

describe('PowerBallNumber', () => {
  it('renders number correctly', () => {
    render(<PowerBallNumber number={23} />);
    expect(screen.getByText('23')).toBeInTheDocument();
  });

  it('applies powerball styling when isPowerball is true', () => {
    render(<PowerBallNumber number={7} isPowerball />);
    const ball = screen.getByText('7');
    expect(ball).toHaveClass('bg-red-600');
  });

  it('has correct aria-label', () => {
    render(<PowerBallNumber number={15} />);
    expect(screen.getByLabelText('Number 15')).toBeInTheDocument();
  });
});
