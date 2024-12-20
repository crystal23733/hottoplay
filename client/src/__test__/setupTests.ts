import '@testing-library/jest-dom';

/**
 * matchMedia 모킹
 * 브라우저의 matchMedia API를 모킹하여 테스트 환경에서 일관된 동작을 보장
 * @param {Window} window - 브라우저 창 객체
 * @param {jest.Mock} jest.fn - jest의 모킹 함수
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
