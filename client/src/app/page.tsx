'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui/Tabs';
import GenerateNumbers from '@/components/features/GenerateNumbers/GenerateNumbers';
import SearchNumbers from '@/components/features/SearchNumbers';
import { MainLayout } from '@/components/features/MainLayout/MainLayout';
import { AdLayout } from '@/components/features/AdLayout/AdLayout';
import HeroSection from '@/components/organisms/HeroSection/HeroSection';
import Description from '@/components/organisms/Description/Description';

export default function Home() {
  return (
    <MainLayout>
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 pt-8 pb-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="relative mb-16">
            {/* 배경 효과 */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-violet-400/10 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl" />
            </div>

            <HeroSection />
            <Description />
          </div>

          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm shadow-lg">
              <TabsTrigger
                value="generate"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-violet-500/20 transition-all duration-300"
              >
                번호 생성
              </TabsTrigger>
              <TabsTrigger
                value="search"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-violet-500/20 transition-all duration-300"
              >
                번호 조회
              </TabsTrigger>
            </TabsList>
            <TabsContent value="generate" className="mt-2">
              <GenerateNumbers />
            </TabsContent>
            <TabsContent value="search" className="mt-2">
              <SearchNumbers />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
