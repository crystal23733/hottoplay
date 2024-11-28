'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui/Tabs';
import GenerateNumbers from '@/components/features/GenerateNumbers/GenerateNumbers';
import SearchNumbers from '@/components/features/SearchNumbers';
import { MainLayout } from '@/components/features/MainLayout/MainLayout';

/**
 * hottoplay 웹 애플리케이션의 메인 페이지
 * 번호 생성과 조회 기능을 탭으로 구분하여 제공하며, 광고 영역을 포함
 *
 * @component
 * @example
 * ```tsx
 * <Home />
 * ```
 */
export default function Home() {
  return (
    <MainLayout>
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 pt-8 pb-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="relative">
            <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
              로또번호 예상 조합기
            </h1>
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-violet-400/10 rounded-full blur-3xl -z-10" />
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
