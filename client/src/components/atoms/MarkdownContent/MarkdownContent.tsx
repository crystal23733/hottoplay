import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MarkdownContentProps from './MarkdownContent.types';

const MarkdownContent = ({ content }: MarkdownContentProps) => {
  return (
    <div className="prose prose-blue max-w-none dark:prose-invert">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
