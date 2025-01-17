'use client';

import { MainLayout } from '../MainLayout/MainLayout';
import BackButton from '@/components/molecules/Button/BackButton/BackButton';
import CoupangLayout from '@/components/organisms/CoupangLayout/CoupangLayout';
import DreamContent from '@/components/organisms/Dream/DreamContent/DreamContent';

const DreamTemplate = () => {
  return (
    <MainLayout showAd={false}>
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 min-h-screen pt-8 pb-12">
        <CoupangLayout>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <BackButton>홈으로</BackButton>

              <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600">
                행운의 꿈 해몽
              </h1>

              <DreamContent />
            </div>
          </div>
        </CoupangLayout>
      </div>
    </MainLayout>
  );
};

export default DreamTemplate;
