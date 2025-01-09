'use client';

import { cn } from '@/lib/utils';
import DreamTagProps from './DreamTag.types';

const DreamTag: React.FC<DreamTagProps> = ({ type, className }) => {
  return (
    <span
      className={cn(
        'px-3 py-1 rounded-full text-sm font-medium',
        type === 'good'
          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
        className
      )}
    >
      {type === 'good' ? '길몽' : '흉몽'}
    </span>
  );
};

export default DreamTag;
