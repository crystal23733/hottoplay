/**
 * Jest 테스트 환경 설정 파일
 * @description 
 * - @testing-library/jest-dom의 커스텀 매처들을 추가
 * - 예: toBeInTheDocument(), toHaveStyle() 등
 */
import '@testing-library/jest-dom';

/**
 * 테스트 환경에서 필요한 전역 설정
 * @example
 * // 윈도우 사이즈 설정
 * window.resizeTo(1024, 768);
 * 
 * // fetch 모킹
 * global.fetch = jest.fn();
 */