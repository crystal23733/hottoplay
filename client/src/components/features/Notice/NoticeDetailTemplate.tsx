'use client';

import Loading from '@/components/atoms/Loading/Loading';
import NoticeDetail from '@/components/organisms/Notice/NoticeDetail';
import useNoticeDetail from '@/hooks/Notice/Detail/useNoticeDetail';
import { MainLayout } from '../MainLayout/MainLayout';
import ErrorMessage from '@/components/atoms/Errors/ErrorMessage';
import NoticeDetailTemplateProps from './NoticeDetailTemplate.types';
// import { AdLayout } from '../AdLayout/AdLayout';

const NoticeDetailTemplate = ({ timestamp }: NoticeDetailTemplateProps) => {
  const { data, loading, error } = useNoticeDetail(timestamp);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loading size="lg" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center min-h-[50vh]">
          <ErrorMessage message={error} />
        </div>
      );
    }

    if (!data) {
      return (
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-muted-foreground">
            공지사항을 찾을 수 없습니다.
          </p>
        </div>
      );
    }

    return <NoticeDetail notice={data} />;
  };

  return (
    <MainLayout>
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 min-h-screen pt-8 pb-12">
        {/* <AdLayout> */}
        {renderContent()}
        {/* </AdLayout> */}
      </div>
    </MainLayout>
  );
};

export default NoticeDetailTemplate;
