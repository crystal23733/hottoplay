import { render, screen } from '@testing-library/react';
import MegaMillionsResults from '../MegaMillionsResults';

// lucide-react 아이콘 모킹
jest.mock('lucide-react', () => ({
  CalendarClock: () => <span data-testid="calendar-clock-icon" />,
  Copy: () => <span data-testid="copy-icon" />,
}));

describe('MegaMillionsResults', () => {
  const mockNumbers = [
    { white_numbers: [1, 2, 3, 4, 5], mega_ball: 10 },
    { white_numbers: [6, 7, 8, 9, 10], mega_ball: 20 },
  ];

  it('renders nothing when numbers array is empty', () => {
    const { container } = render(<MegaMillionsResults numbers={[]} method="Quick Pick" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders all number sets', () => {
    render(<MegaMillionsResults numbers={mockNumbers} method="Quick Pick" />);

    expect(screen.getByText('Set #1')).toBeInTheDocument();
    expect(screen.getByText('Set #2')).toBeInTheDocument();
  });

  it('shows generation method and time', () => {
    render(<MegaMillionsResults numbers={mockNumbers} method="Quick Pick" />);

    expect(screen.getByTestId('calendar-clock-icon')).toBeInTheDocument();
    expect(screen.getByText(/using Quick Pick/)).toBeInTheDocument();
  });
});
