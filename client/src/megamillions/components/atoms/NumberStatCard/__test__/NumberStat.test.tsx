import { render, screen } from '@testing-library/react';
import NumberStatCard from '../NumberStatCard';
import MESSAGES from '../constants/messages';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Target: () => <div data-testid="target-icon" />,
  Trophy: () => <div data-testid="trophy-icon" />,
}));

describe('NumberStatCard', () => {
  const mockStat = {
    number: 23,
    white_ball_count: 85,
    mega_ball_count: 42,
    last_white_ball_date: 'Wed, Jan 8, 2025',
    last_mega_ball_date: 'Mon, Dec 30, 2024',
  };

  it('displays the number correctly', () => {
    render(<NumberStatCard stat={mockStat} />);
    expect(screen.getByText('23')).toBeInTheDocument();
  });

  it('shows total appearances', () => {
    render(<NumberStatCard stat={mockStat} />);
    const totalAppearances = mockStat.white_ball_count + mockStat.mega_ball_count;
    expect(
      screen.getByText(`${MESSAGES.TOTAL_APPEARANCES}: ${totalAppearances}`)
    ).toBeInTheDocument();
  });

  it('displays white ball statistics', () => {
    render(<NumberStatCard stat={mockStat} />);
    expect(
      screen.getByText(
        `${MESSAGES.WHITE_BALL.APPEARED} ${mockStat.white_ball_count} ${MESSAGES.WHITE_BALL.TIMES}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${MESSAGES.WHITE_BALL.LAST_DRAWN}: ${mockStat.last_white_ball_date}`)
    ).toBeInTheDocument();
  });

  it('displays powerball statistics', () => {
    render(<NumberStatCard stat={mockStat} />);
    expect(
      screen.getByText(
        `${MESSAGES.MEGA_BALL.APPEARED} ${mockStat.mega_ball_count} ${MESSAGES.MEGA_BALL.TIMES}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${MESSAGES.MEGA_BALL.LAST_DRAWN}: ${mockStat.last_mega_ball_date}`)
    ).toBeInTheDocument();
  });

  it('handles missing dates gracefully', () => {
    const statWithoutDates = {
      ...mockStat,
      last_white_ball_date: '',
      last_mega_ball_date: '',
    };
    render(<NumberStatCard stat={statWithoutDates} />);
    expect(
      screen.queryByText(new RegExp(`${MESSAGES.WHITE_BALL.LAST_DRAWN}:`))
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(new RegExp(`${MESSAGES.MEGA_BALL.LAST_DRAWN}:`))
    ).not.toBeInTheDocument();
  });

  it('renders all required icons', () => {
    render(<NumberStatCard stat={mockStat} />);
    const targetIcons = screen.getAllByTestId('target-icon');
    const trophyIcon = screen.getByTestId('trophy-icon');

    expect(targetIcons).toHaveLength(2); // One for white ball, one for powerball
    expect(trophyIcon).toBeInTheDocument();
  });
});
