import { render, screen } from '@testing-library/react';
import CombinationHistory from '../CombinationHistory';
import MESSAGES from '../constants/messages';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  History: () => <div data-testid="history-icon" />,
}));

describe('CombinationHistory', () => {
  const baseStats = {
    numbers: [1, 2, 3, 4, 5],
    appearance_count: 0,
    last_appearance: '',
  };

  it('shows never appeared message when count is 0', () => {
    render(<CombinationHistory stats={baseStats} />);
    expect(screen.getByText(MESSAGES.APPEARANCES.NEVER)).toBeInTheDocument();
  });

  it('shows appeared once message when count is 1', () => {
    render(<CombinationHistory stats={{ ...baseStats, appearance_count: 1 }} />);
    expect(screen.getByText(MESSAGES.APPEARANCES.ONCE)).toBeInTheDocument();
  });

  it('shows multiple appearances message with count', () => {
    const count = 3;
    render(<CombinationHistory stats={{ ...baseStats, appearance_count: count }} />);
    // 정규식을 사용하여 전체 텍스트를 한 번에 확인
    expect(
      screen.getByText(
        new RegExp(`${MESSAGES.APPEARANCES.MULTIPLE}.*${count}.*${MESSAGES.APPEARANCES.TIMES}`)
      )
    ).toBeInTheDocument();
  });

  it('shows last appearance date when available', () => {
    const date = 'Wed, Jan 8, 2025';
    render(<CombinationHistory stats={{ ...baseStats, last_appearance: date }} />);
    expect(screen.getByText(`${MESSAGES.LAST_SEEN}: ${date}`)).toBeInTheDocument();
  });

  it('does not show last appearance date when not available', () => {
    render(<CombinationHistory stats={baseStats} />);
    expect(screen.queryByText(MESSAGES.LAST_SEEN)).not.toBeInTheDocument();
  });

  it('renders history icon', () => {
    render(<CombinationHistory stats={baseStats} />);
    expect(screen.getByTestId('history-icon')).toBeInTheDocument();
  });
});
