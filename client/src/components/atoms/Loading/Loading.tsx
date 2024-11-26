import React from 'react';
import { LodingSpinnerProps } from './LodingSpinner.types';
import sizeClasses from './LoadingSpinner.styles';

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
