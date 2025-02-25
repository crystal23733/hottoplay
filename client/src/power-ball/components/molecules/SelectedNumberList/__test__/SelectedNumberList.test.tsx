import { render, screen } from '@testing-library/react';
import SelectedNumbersList from '../SelectedNumbersList';
import MESSAGES from '../constants/messages';

describe('SelectedNumbersList', () => {
  const numbers = [1, 2, 3, 4, 5];

  it('renders title correctly', () => {
    render(<SelectedNumbersList numbers={numbers} />);
    expect(screen.getByText(MESSAGES.SELECTED_NUMBERS)).toBeInTheDocument();
  });

  it('renders all numbers', () => {
    render(<SelectedNumbersList numbers={numbers} />);
    numbers.forEach(num => {
      expect(screen.getByText(num.toString())).toBeInTheDocument();
    });
  });

  it('renders empty list when no numbers provided', () => {
    const { container } = render(<SelectedNumbersList numbers={[]} />);
    expect(screen.getByText(MESSAGES.SELECTED_NUMBERS)).toBeInTheDocument();
    const numbersContainer = container.querySelector('.flex.flex-wrap');
    expect(numbersContainer?.children.length).toBe(0);
  });
});
