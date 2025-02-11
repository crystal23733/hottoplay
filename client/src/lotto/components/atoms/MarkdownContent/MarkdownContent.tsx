'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MarkdownContentProps from './MarkdownContent.types';

const MarkdownContent = ({ content }: MarkdownContentProps) => {
  return (
    <div
      className="prose prose-blue prose-sm md:prose-base lg:prose-lg max-w-none 
      dark:prose-invert
      prose-headings:text-gradient
      prose-a:text-blue-600 dark:prose-a:text-blue-400
      prose-blockquote:border-l-blue-500
      prose-strong:text-blue-700 dark:prose-strong:text-blue-300
      prose-img:rounded-lg prose-img:shadow-md"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
