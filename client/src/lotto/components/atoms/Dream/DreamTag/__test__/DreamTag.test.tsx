import { render, screen } from '@testing-library/react';
import DreamTag from '../DreamTag';

describe('DreamTag', () => {
  it('길몽 태그가 올바르게 렌더링되어야 합니다', () => {
    render(<DreamTag type="good" />);
    const tag = screen.getByText('길몽');
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveClass('bg-green-100');
  });

  it('흉몽 태그가 올바르게 렌더링되어야 합니다', () => {
    render(<DreamTag type="bad" />);
    const tag = screen.getByText('흉몽');
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveClass('bg-red-100');
  });
});
