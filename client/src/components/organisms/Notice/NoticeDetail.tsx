import BackButton from '@/components/molecules/Button/BackButton/BackButton';
import NoticeDetailProps from './NoticeDetail.types';
import { Card } from '@/ui/Card';
import NoticeHeader from '@/components/molecules/Notice/NoticeHeader/NoticeHeader';
import MarkdownContent from '@/components/atoms/MarkdownContent/MarkdownContent';

const NoticeDetail = ({ notice }: NoticeDetailProps) => {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <BackButton />
        <Card className="p-8">
          <NoticeHeader title={notice.title} author={notice.author} createdAt={notice.created_at} />
          <MarkdownContent content={notice.content} />
        </Card>
      </div>
    </div>
  );
};

export default NoticeDetail;
