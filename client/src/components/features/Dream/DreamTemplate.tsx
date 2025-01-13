'use client';

import { MainLayout } from '../MainLayout/MainLayout';
import BackButton from '@/components/molecules/Button/BackButton/BackButton';
import DreamContent from '@/components/organisms/Dream/DreamContent/DreamContent';
import { AdLayout } from '../AdLayout/AdLayout';

const DreamTemplate = () => {
  return (
    <MainLayout>
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 min-h-screen pt-8 pb-12">
        <AdLayout>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <BackButton>홈으로</BackButton>

              <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600">
                꿈 해몽
              </h1>

              <DreamContent />
            </div>
          </div>
        </AdLayout>
      </div>
    </MainLayout>
  );
};

export default DreamTemplate;
