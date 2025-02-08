import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../page';

// next/navigation 모킹
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

describe('Home 페이지', () => {
  it('메인 레이아웃이 렌더링되어야 합니다', () => {
    render(<Home />);

    const mainTitle = screen.getByText('로또번호 예상 조합기');
    const subTitle = screen.getByText('다양한 방식의 랜덤 번호 생성');

    expect(mainTitle).toBeInTheDocument();
    expect(subTitle).toBeInTheDocument();
  });

  it('탭 컨텐츠가 올바르게 렌더링되어야 합니다', () => {
    render(<Home />);

    // role과 name을 사용하여 탭 버튼 찾기
    const generateTab = screen.getByRole('tab', { name: '번호 생성' });
    const searchTab = screen.getByRole('tab', { name: '번호 조회' });

    expect(generateTab).toBeInTheDocument();
    expect(searchTab).toBeInTheDocument();
  });

  it('기본적으로 번호 생성 탭이 선택되어 있어야 합니다', () => {
    render(<Home />);

    const generateTab = screen.getByRole('tab', { name: '번호 생성' });

    expect(generateTab).toHaveAttribute('data-state', 'active');
  });
});
