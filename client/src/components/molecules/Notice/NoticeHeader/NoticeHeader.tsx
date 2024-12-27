'use client';

import formatDate from '@/utils/formatDate';
import NoticeHeaderProps from './NoticeHeader.types';

const NoticeHeader = ({ title, author, createdAt }: NoticeHeaderProps) => {
  return (
    <div className="space-y-4 mb-8">
      <h1
        className="text-2xl md:text-3xl font-bold leading-tight 
        bg-clip-text text-transparent bg-gradient-to-r 
        from-blue-600 via-purple-600 to-violet-600 
        dark:from-blue-400 dark:via-purple-400 dark:to-violet-400"
      >
        {title}
      </h1>
      <div className="flex flex-wrap items-center gap-2 text-sm md:text-base text-muted-foreground">
        <span className="font-medium">{author}</span>
        <span className="w-1 h-1 rounded-full bg-muted-foreground" />
        <span>{formatDate(createdAt)}</span>
      </div>
    </div>
  );
};

export default NoticeHeader;
