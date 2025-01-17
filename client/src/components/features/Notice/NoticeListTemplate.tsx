'use client';

import { Button } from '@/ui/Button';
import { MainLayout } from '../MainLayout/MainLayout';
import { ArrowLeft } from 'lucide-react';
import NoticeList from '@/components/molecules/Notice/NoticeList/NoticeList';
import { useRouter } from 'next/navigation';
import CoupangLayout from '@/components/organisms/CoupangLayout/CoupangLayout';

const NoticeListTemplate = () => {
  const router = useRouter();

  return (
    <MainLayout showAd={false}>
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 min-h-screen pt-8 pb-12">
        <CoupangLayout showSidebar={false}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* 뒤로가기 버튼 */}
              <Button variant="ghost" className="mb-6" onClick={() => router.push('/')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                돌아가기
              </Button>
              {/* 공지사항 제목 */}
              <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 dark:from-blue-400 dark:via-purple-400 dark:to-violet-400">
                공지사항
              </h1>

              {/* 공지사항 목록 */}
              <NoticeList />
            </div>
          </div>
        </CoupangLayout>
      </div>
    </MainLayout>
  );
};

export default NoticeListTemplate;
