'use client';

import { MainLayout } from '../MainLayout/MainLayout';
import DreamContent from '@/lotto/components/organisms/Dream/DreamContent/DreamContent';
import { Button } from '@/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DreamTemplate = () => {
  const router = useRouter();

  return (
    <MainLayout>
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 min-h-screen pt-8 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <Button variant="ghost" className="mb-6" onClick={() => router.push('/lotto')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            돌아가기
          </Button>

          <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600">
            행운의 꿈 해몽
          </h1>

          <DreamContent />
        </div>
      </div>
    </MainLayout>
  );
};

export default DreamTemplate;
