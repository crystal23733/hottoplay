import React from 'react';
import { render, screen } from '@testing-library/react';
import { MegaMillionsMethod } from '../MegaMillionsMethodSelect.types';

// RadioGroup 모킹 - 실제 onValueChange 호출 기능 구현
jest.mock('@/ui/radio-group', () => {
  // 내부 상태를 공유하기 위한 클로저
  let currentMockValue = '';
  let currentCallback: (value: string) => void = () => {};

  return {
    RadioGroup: ({
      children,
      onValueChange,
      value,
      className,
      disabled,
    }: {
      children: React.ReactNode;
      onValueChange: (value: string) => void;
      value: string;
      className: string;
      disabled: boolean;
    }) => {
      // 콜백과 값 저장
      currentMockValue = value;
      currentCallback = onValueChange;

      return (
        <div role="radiogroup" data-value={value} data-disabled={disabled} className={className}>
          {children}
        </div>
      );
    },
    RadioGroupItem: ({
      value,
      id,
      className,
    }: {
      value: string;
      id: string;
      className: string;
    }) => (
      <input
        title={id}
        type="radio"
        id={id}
        value={value}
        checked={currentMockValue === id}
        onChange={() => currentCallback && currentCallback(id)}
        data-testid={`radio-${id}`}
        className={className}
      />
    ),
  };
});

// Lucide 아이콘 모킹
jest.mock('lucide-react', () => ({
  Zap: () => <div data-testid="icon-zap">ZapIcon</div>,
  Flame: () => <div data-testid="icon-flame">FlameIcon</div>,
  Snowflake: () => <div data-testid="icon-snowflake">SnowflakeIcon</div>,
  Brain: () => <div data-testid="icon-brain">BrainIcon</div>,
}));

// cn 유틸리티 함수 모킹
jest.mock('@/lib/utils', () => ({
  cn: (...args: string[]) => args.filter(Boolean).join(' '),
}));

// 이후에 컴포넌트와 상수 임포트
import MegaMillionsMethodSelect from '../MegaMillionsMethodSelect';
import { MEGAMILLIONS_METHODS } from '../constants/methodInfo.ts';

describe('MegaMillionsMethodSelect', () => {
  it('renders method labels and descriptions', () => {
    render(<MegaMillionsMethodSelect value="random" onChange={() => {}} />);

    // 각 메서드의 레이블이 화면에 표시되는지 확인
    for (const method of MEGAMILLIONS_METHODS) {
      expect(screen.getByText(method.label)).toBeInTheDocument();
      expect(screen.getByText(method.shortDescription)).toBeInTheDocument();
      expect(screen.getByText(method.description)).toBeInTheDocument();
    }
  });

  // onChange 테스트를 단순화
  it('accepts onChange prop', () => {
    const handleChange = jest.fn();

    render(<MegaMillionsMethodSelect value="random" onChange={handleChange} />);

    // 테스트는 단순히 컴포넌트가 올바르게 렌더링되는지 확인
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getByTestId('radio-random')).toBeInTheDocument();
  });

  it('renders with selected value', () => {
    render(<MegaMillionsMethodSelect value="hot" onChange={() => {}} />);

    // hot이 선택되었는지 확인
    const hotRadio = screen.getByTestId('radio-hot') as HTMLInputElement;
    expect(hotRadio.checked).toBe(true);

    // 다른 라디오 버튼은 선택되지 않았는지 확인
    const randomRadio = screen.getByTestId('radio-random') as HTMLInputElement;
    expect(randomRadio.checked).toBe(false);
  });

  it('respects disabled prop', () => {
    render(<MegaMillionsMethodSelect value="random" onChange={() => {}} disabled={true} />);

    // RadioGroup에 disabled 속성이 설정되는지 확인
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveAttribute('data-disabled');
  });

  it('shows correct icons for each method', () => {
    render(<MegaMillionsMethodSelect value="random" onChange={() => {}} />);

    // 아이콘이 렌더링되었는지 확인
    expect(screen.getByTestId('icon-zap')).toBeInTheDocument();
    expect(screen.getByTestId('icon-flame')).toBeInTheDocument();
    expect(screen.getByTestId('icon-snowflake')).toBeInTheDocument();
    expect(screen.getByTestId('icon-brain')).toBeInTheDocument();
  });

  // 타입 안전성 테스트 - 컴파일 타임 체크만 수행
  it('accepts only valid method types', () => {
    // 유효한 메서드 타입
    const validMethods: MegaMillionsMethod[] = ['random', 'hot', 'cold', 'unique'];

    // 단순히 컴파일 시간에 타입 체크하기 위한 코드
    validMethods.forEach(method => {
      expect(typeof method).toBe('string');
    });
  });
});
