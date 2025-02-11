import { renderHook, act } from '@testing-library/react';
import useLanguageToggle from '../useLanguageToggle';

describe('useLanguageToggle', () => {
  it('초기 언어가 주어지지 않으면 영어로 시작해야 함', () => {
    const { result } = renderHook(() => useLanguageToggle());

    expect(result.current.language).toBe('en');
  });

  it('초기 언어가 주어지면 해당 언어로 시작해야 함', () => {
    const { result } = renderHook(() => useLanguageToggle('ko'));

    expect(result.current.language).toBe('ko');
  });

  it('toggleLanguage를 호출하면 언어가 전환되어야 함', () => {
    const { result } = renderHook(() => useLanguageToggle());

    act(() => {
      result.current.toggleLanguage();
    });
    expect(result.current.language).toBe('ko');

    act(() => {
      result.current.toggleLanguage();
    });
    expect(result.current.language).toBe('en');
  });

  it('연속적인 토글이 정상적으로 작동해야 함', () => {
    const { result } = renderHook(() => useLanguageToggle('ko'));

    // 한국어 -> 영어 -> 한국어 -> 영어
    for (let i = 0; i < 4; i++) {
      act(() => {
        result.current.toggleLanguage();
      });
      expect(result.current.language).toBe(i % 2 === 0 ? 'en' : 'ko');
    }
  });

  it('리렌더링 후에도 상태가 유지되어야 함', () => {
    const { result, rerender } = renderHook(() => useLanguageToggle());

    act(() => {
      result.current.toggleLanguage();
    });
    expect(result.current.language).toBe('ko');

    rerender();
    expect(result.current.language).toBe('ko');
  });
});
