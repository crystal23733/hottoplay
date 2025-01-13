import { render, screen } from '@testing-library/react';
import DreamCard from '../DreamCard';
import { ImageProps } from 'next/image';

// next/image 모킹
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt, src }: Pick<ImageProps, 'alt' | 'src' | 'fill' | 'className' | 'sizes'>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} src={src as string} data-testid="dream-image" />;
  },
}));

describe('DreamCard', () => {
  const mockDream = {
    keyword: '돼지',
    interpretation: '재물운을 상징합니다',
    type: 'good' as const,
    image: '/images/dreams/pig.jpg',
  };

  it('꿈 정보가 올바르게 표시되어야 합니다', () => {
    render(<DreamCard {...mockDream} />);

    expect(screen.getByText(mockDream.keyword)).toBeInTheDocument();
    expect(screen.getByText(mockDream.interpretation)).toBeInTheDocument();
    expect(screen.getByText('길몽')).toBeInTheDocument();
  });

  it('이미지가 올바르게 렌더링되어야 합니다', () => {
    render(<DreamCard {...mockDream} />);

    const image = screen.getByTestId('dream-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockDream.image);
    expect(image).toHaveAttribute('alt', mockDream.keyword);
  });

  it('흉몽 태그가 올바르게 표시되어야 합니다', () => {
    const badDream = { ...mockDream, type: 'bad' as const };
    render(<DreamCard {...badDream} />);

    expect(screen.getByText('흉몽')).toBeInTheDocument();
  });

  it('카드가 hover 스타일 클래스를 가져야 합니다', () => {
    const { container } = render(<DreamCard {...mockDream} />);
    expect(container.firstChild).toHaveClass('hover:shadow-md');
  });
});
