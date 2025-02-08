import { render } from '@testing-library/react';
import DreamPage from '../page';

// DreamTemplate 모킹
jest.mock('@/components/features/Dream/DreamTemplate', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="dream-template">Dream Template</div>,
  };
});

describe('DreamPage', () => {
  it('DreamTemplate이 렌더링되어야 합니다', () => {
    const { getByTestId } = render(<DreamPage />);
    expect(getByTestId('dream-template')).toBeInTheDocument();
  });
});
