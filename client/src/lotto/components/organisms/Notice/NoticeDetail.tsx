'use client';

import BackButton from '@/lotto/components/molecules/Button/BackButton/BackButton';
import NoticeDetailProps from './NoticeDetail.types';
import { Card } from '@/ui/Card';
import NoticeHeader from '@/lotto/components/molecules/Notice/NoticeHeader/NoticeHeader';
import MarkdownContent from '@/lotto/components/atoms/MarkdownContent/MarkdownContent';

const NoticeDetail = ({ notice }: NoticeDetailProps) => {
  return (
    <div className="container mx-auto px-4 relative">
      <div className="max-w-4xl mx-auto">
        <BackButton>목록으로</BackButton>
        <Card className="p-4 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <NoticeHeader title={notice.title} author={notice.author} createdAt={notice.created_at} />
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20" />
            <MarkdownContent content={notice.content} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NoticeDetail;
