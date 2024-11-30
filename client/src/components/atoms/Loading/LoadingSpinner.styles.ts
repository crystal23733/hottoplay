import { SpinnerSize } from './LoadingSpinner.types';

/**
 * @constant sizeClasses - 로딩 스피너 크기 클래스
 * @type {Record<SpinnerSize, string>}
 */
const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export default sizeClasses;
