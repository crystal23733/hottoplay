import { render, screen } from '@testing-library/react';
import CombinationStatCard from '../CombinationStatCard';
import MESSAGES from '../constants/messages';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  History: () => <div data-testid="history-icon" />,
  Info: () => <div data-testid="info-icon" />,
}));

describe('CombinationStatCard', () => {
  const mockStats = {
    numbers: [1, 2, 3, 4, 5],
    appearance_count: 2,
    last_appearance: 'Wed, Jan 8, 2025',
  };

  it('shows title correctly', () => {
    render(<CombinationStatCard selectedNumbers={[]} />);
    expect(screen.getByText(MESSAGES.TITLE)).toBeInTheDocument();
  });

  it('shows empty state message when no numbers selected', () => {
    render(<CombinationStatCard selectedNumbers={[]} />);
    expect(screen.getByText(MESSAGES.NO_NUMBERS)).toBeInTheDocument();
  });

  it('renders selected numbers list when numbers are provided', () => {
    render(<CombinationStatCard selectedNumbers={[1, 2, 3]} stats={mockStats} />);
    [1, 2, 3].forEach(num => {
      expect(screen.getByText(num.toString())).toBeInTheDocument();
    });
  });

  it('renders combination history when stats are provided', () => {
    render(<CombinationStatCard selectedNumbers={[1, 2, 3]} stats={mockStats} />);
    expect(screen.getByText(/This combination has appeared/)).toBeInTheDocument();
    expect(screen.getByText(/Wed, Jan 8, 2025/)).toBeInTheDocument();
  });

  it('does not render combination history when stats are not provided', () => {
    render(<CombinationStatCard selectedNumbers={[1, 2, 3]} />);
    expect(screen.queryByText(/This combination has appeared/)).not.toBeInTheDocument();
  });
});
