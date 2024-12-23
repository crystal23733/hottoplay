import formatDate from '@/utils/formatDate';
import NoticeHeaderProps from './NoticeHeader.types';

const NoticeHeader = ({ title, author, createdAt }: NoticeHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <div className="flex items-center text-muted-foreground mb-8">
        <span>{author}</span>
        <span>·</span>
        <span>{formatDate(createdAt)}</span>
      </div>
    </div>
  );
};

export default NoticeHeader;
