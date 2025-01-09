import { render, screen } from '@testing-library/react';
import DreamList from '../DreamList';

describe('DreamList', () => {
  const mockDreams = [
    {
      keyword: '돼지',
      interpretation: '재물운을 상징합니다',
      type: 'good' as const,
    },
    {
      keyword: '이빨 빠짐',
      interpretation: '불길한 소식',
      type: 'bad' as const,
    },
  ];

  it('검색어가 없을 때 모든 꿈이 표시되어야 합니다', () => {
    render(<DreamList dreams={mockDreams} searchTerm="" />);

    expect(screen.getByText('돼지')).toBeInTheDocument();
    expect(screen.getByText('이빨 빠짐')).toBeInTheDocument();
  });

  it('검색어에 맞는 꿈만 필터링되어야 합니다', () => {
    render(<DreamList dreams={mockDreams} searchTerm="돼지" />);

    expect(screen.getByText('돼지')).toBeInTheDocument();
    expect(screen.queryByText('이빨 빠짐')).not.toBeInTheDocument();
  });
});
