'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui/Tabs';
import GenerateNumbers from '@/components/features/GenerateNumbers/GenerateNumbers';
import SearchNumbers from '@/components/features/SearchNumbers';
import { MainLayout } from '@/components/features/MainLayout/MainLayout';
import { AdLayout } from '@/components/features/AdLayout/AdLayout';
import { Coins } from 'lucide-react';

export default function Home() {
  return (
    <MainLayout>
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 pt-8 pb-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="relative mb-16">
            {/* 배경 효과는 유지 */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-violet-400/10 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl" />
            </div>

            {/* 제목 섹션 */}
            <div className="relative py-8">
              <div className="flex flex-col items-center space-y-6">
                {/* 로고 아이콘 */}
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-violet-500 rounded-3xl flex items-center justify-center shadow-lg transform rotate-12">
                    <Coins className="w-12 h-12 text-white transform -rotate-12" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-blue-500 to-violet-500 rounded-3xl opacity-30 blur-xl" />
                </div>

                {/* 메인 제목 */}
                <div className="text-center space-y-2">
                  <h1 className="text-4xl md:text-5xl font-black leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 dark:from-blue-400 dark:via-purple-400 dark:to-violet-400">
                      로또번호 예상 조합기
                    </span>
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    AI 기반 분석으로 더 스마트한 번호 조합
                  </p>
                </div>

                {/* 구분선 */}
                <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" />
              </div>

              {/* 설명 문구 */}
              <div className="max-w-3xl mx-auto px-6 mt-8">
                <div className="text-center space-y-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                  <p className="text-base text-gray-700 dark:text-gray-300 font-medium">
                    유니크한 번호 조합, 가장 많이 당첨된 번호 기반 조합,
                    <br />
                    그리고 사용자 지정 번호 조합 등 다양한 방식으로 번호를 생성해보세요.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    추후 게시판을 도입할 예정이니 원하는 번호 뽑기 방식을 말씀하시면
                    <br />
                    지속적으로 업데이트 하겠습니다.
                  </p>
                </div>
              </div>
            </div>
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
            <AdLayout>
              <TabsContent value="generate" className="mt-2">
                <GenerateNumbers />
              </TabsContent>
              <TabsContent value="search" className="mt-2">
                <SearchNumbers />
              </TabsContent>
            </AdLayout>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
