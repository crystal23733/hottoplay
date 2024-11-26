import React from 'react';
import { LodingSpinnerProps } from './LoadingSpinner.types';
import sizeClasses from './LoadingSpinner.styles';

/**
 * @function Loading - 로딩 컴포넌트
 * @param {LodingSpinnerProps} props - 로딩 컴포넌트 프로퍼티
 * @returns {React.FC<LodingSpinnerProps>} - 로딩 컴포넌트
 */
const Loading: React.FC<LodingSpinnerProps> = ({ size = 'md' }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} border-4 border-primary/30 border-t-primary rounded-full animate-spin`}
        role="status"
        aria-label="loading"
      ></div>
    </div>
  );
};

export default Loading;
