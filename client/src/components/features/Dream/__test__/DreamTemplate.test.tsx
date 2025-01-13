import { render, screen } from '@testing-library/react';
import DreamTemplate from '../DreamTemplate';

// MainLayout 모킹
jest.mock('@/components/features/MainLayout/MainLayout', () => ({
  MainLayout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// AdLayout 모킹
jest.mock('@/components/features/AdLayout/AdLayout', () => ({
  AdLayout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// BackButton 모킹
jest.mock('@/components/molecules/Button/BackButton/BackButton', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <button>{children}</button>,
  };
});

describe('DreamTemplate', () => {
  it('제목이 올바르게 렌더링되어야 합니다', () => {
    render(<DreamTemplate />);
    expect(screen.getByText('행운의 꿈 해몽')).toBeInTheDocument();
  });

  it('뒤로가기 버튼이 표시되어야 합니다', () => {
    render(<DreamTemplate />);
    expect(screen.getByText('홈으로')).toBeInTheDocument();
  });

  it('DreamContent가 렌더링되어야 합니다', () => {
    render(<DreamTemplate />);
    expect(screen.getByPlaceholderText(/꿈 키워드를 입력하세요/)).toBeInTheDocument();
  });
});
