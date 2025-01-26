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

// useRouter 모킹
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Button 컴포넌트 모킹
jest.mock('@/ui/Button', () => ({
  Button: ({ children, ...props }: { children: React.ReactNode }) => (
    <button {...props}>{children}</button>
  ),
}));

describe('DreamTemplate', () => {
  it('제목이 올바르게 렌더링되어야 합니다', () => {
    render(<DreamTemplate />);
    expect(screen.getByText('행운의 꿈 해몽')).toBeInTheDocument();
  });

  it('돌아가기 버튼이 표시되어야 합니다', () => {
    render(<DreamTemplate />);
    const backButton = screen.getByRole('button', { name: /돌아가기/i });
    expect(backButton).toBeInTheDocument();
  });

  it('DreamContent가 렌더링되어야 합니다', () => {
    render(<DreamTemplate />);
    expect(screen.getByPlaceholderText(/꿈 키워드를 입력하세요/)).toBeInTheDocument();
  });
});
