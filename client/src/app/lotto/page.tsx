'use client';

import { MainLayout } from '@/lotto/components/features/MainLayout/MainLayout';
import HomeIntro from '@/lotto/components/features/HomeIntro/HomeIntro';
import TabContent from '@/lotto/components/features/TabContent/TabContent';


export default function Home() {
  return (
    <MainLayout>
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 pt-8 pb-12 min-h-screen">
        <div className="container mx-auto px-4">
          <HomeIntro />
          <TabContent />
        </div>
      </div>
    </MainLayout>
  );
}
