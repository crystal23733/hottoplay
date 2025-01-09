import { render, screen } from '@testing-library/react';
import DreamCard from '../DreamCard';

describe('DreamCard', () => {
  const mockDream = {
    keyword: '돼지',
    interpretation: '재물운을 상징합니다',
    type: 'good' as const,
  };

  it('꿈 정보가 올바르게 표시되어야 합니다', () => {
    render(<DreamCard {...mockDream} />);

    expect(screen.getByText(mockDream.keyword)).toBeInTheDocument();
    expect(screen.getByText(mockDream.interpretation)).toBeInTheDocument();
    expect(screen.getByText('길몽')).toBeInTheDocument();
  });
});
