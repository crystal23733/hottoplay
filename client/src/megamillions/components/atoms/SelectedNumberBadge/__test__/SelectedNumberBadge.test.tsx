import { render, screen } from '@testing-library/react';
import SelectedNumberBadge from '../SelectedNumberBadge';

describe('SelectedNumberBadge', () => {
  it('renders number correctly', () => {
    render(<SelectedNumberBadge number={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('has correct styles', () => {
    const { container } = render(<SelectedNumberBadge number={42} />);
    const badge = container.firstChild;
    expect(badge).toHaveClass('bg-primary');
    expect(badge).toHaveClass('text-primary-foreground');
    expect(badge).toHaveClass('rounded-full');
  });
});
