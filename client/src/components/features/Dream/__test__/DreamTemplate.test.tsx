import { render, screen, fireEvent } from '@testing-library/react';
import DreamTemplate from '../DreamTemplate';

// MainLayout 모킹
jest.mock('@/components/features/MainLayout/MainLayout', () => ({
  MainLayout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// BackButton 모킹
jest.mock('@/components/molecules/Button/BackButton/BackButton', () => {
  return {
    __esModule: true,
    default: () => <button>돌아가기</button>,
  };
});

// next/navigation 모킹
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      back: jest.fn(),
    };
  },
  usePathname() {
    return '';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

describe('DreamTemplate', () => {
  it('제목이 올바르게 렌더링되어야 합니다', () => {
    render(<DreamTemplate />);
    expect(screen.getByText('꿈 해몽')).toBeInTheDocument();
  });

  it('검색 입력이 작동해야 합니다', () => {
    render(<DreamTemplate />);
    const searchInput = screen.getByPlaceholderText(/꿈 키워드를 입력하세요/);

    fireEvent.change(searchInput, { target: { value: '돼지' } });
    expect(searchInput).toHaveValue('돼지');
  });
});
