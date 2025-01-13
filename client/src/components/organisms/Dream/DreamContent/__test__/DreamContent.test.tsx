import { render, screen, fireEvent } from '@testing-library/react';
import DreamContent from '../DreamContent';

// dreamData 모킹
jest.mock('@/data/dreams', () => ({
  dreamData: [
    {
      keyword: '돼지',
      interpretation: '재물운을 상징합니다',
      type: 'good',
      image: '/images/dreams/pig.jpg',
    },
    {
      keyword: '뱀',
      interpretation: '변화의 징조입니다',
      type: 'bad',
      image: '/images/dreams/snake.jpg',
    },
  ],
}));

describe('DreamContent', () => {
  it('검색 기능이 올바르게 동작해야 합니다', () => {
    render(<DreamContent />);
    const input = screen.getByPlaceholderText(/꿈 키워드를 입력하세요/);

    fireEvent.change(input, { target: { value: '돼지' } });

    expect(screen.getByText('돼지')).toBeInTheDocument();
    expect(screen.queryByText('뱀')).not.toBeInTheDocument();
  });

  it('초기에 모든 꿈이 표시되어야 합니다', () => {
    render(<DreamContent />);

    expect(screen.getByText('돼지')).toBeInTheDocument();
    expect(screen.getByText('뱀')).toBeInTheDocument();
  });
});
