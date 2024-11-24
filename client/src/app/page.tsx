'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui/Tabs';
import GenerateNumbers from '@/components/features/GenerateNumbers';
import SearchNumbers from '@/components/features/SearchNumbers';
import { MainLayout } from '@/components/features/MainLayout/MainLayout';
import { AdLayout } from '@/components/features/AdLayout/AdLayout';

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
      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="generate">번호 생성</TabsTrigger>
          <TabsTrigger value="search">번호 조회</TabsTrigger>
        </TabsList>

        <AdLayout>
          <TabsContent value="generate">
            <GenerateNumbers />
          </TabsContent>
          <TabsContent value="search">
            <SearchNumbers />
          </TabsContent>
        </AdLayout>
      </Tabs>
    </MainLayout>
  );
}
