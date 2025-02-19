import { render, screen } from '@testing-library/react';
import PowerBallResults from '../PowerBallResults';

// lucide-react 아이콘 모킹
jest.mock('lucide-react', () => ({
  CalendarClock: () => <span data-testid="calendar-clock-icon" />,
  Copy: () => <span data-testid="copy-icon" />,
}));

describe('PowerBallResults', () => {
  const mockNumbers = [
    { white_numbers: [1, 2, 3, 4, 5], powerball: 10 },
    { white_numbers: [6, 7, 8, 9, 10], powerball: 20 },
  ];

  it('renders nothing when numbers array is empty', () => {
    const { container } = render(<PowerBallResults numbers={[]} method="Quick Pick" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders all number sets', () => {
    render(<PowerBallResults numbers={mockNumbers} method="Quick Pick" />);

    expect(screen.getByText('Set #1')).toBeInTheDocument();
    expect(screen.getByText('Set #2')).toBeInTheDocument();
  });

  it('shows generation method and time', () => {
    render(<PowerBallResults numbers={mockNumbers} method="Quick Pick" />);

    expect(screen.getByTestId('calendar-clock-icon')).toBeInTheDocument();
    expect(screen.getByText(/using Quick Pick/)).toBeInTheDocument();
  });
});
