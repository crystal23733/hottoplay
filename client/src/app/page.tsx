'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui/Tabs';
import GenerateNumbers from '@/components/features/GenerateNumbers';
import SearchNumbers from '@/components/features/SearchNumbers';

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
    <div className="flex flex-col">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 h-16 border-b bg-background">
        <nav className="container mx-auto px-4 h-full flex items-center justify-between">
          <h1 className="text-xl font-bold">hottoplay</h1>
        </nav>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="container mx-auto px-4 py-6">
        {/* 상단 광고 (모든 디바이스) */}
        <div className="mb-6 h-[100px] md:h-[120px] bg-muted rounded-lg">
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            광고 영역 1
          </div>
        </div>

        {/* 탭 메뉴 및 컨텐츠 */}
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="generate">번호 생성</TabsTrigger>
            <TabsTrigger value="search">번호 조회</TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* 왼쪽 사이드바 광고 (데스크탑) */}
            <aside className="hidden md:block md:col-span-3">
              <div className="space-y-6">
                <div className="h-[300px] bg-muted rounded-lg">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    광고 영역 2
                  </div>
                </div>
                <div className="h-[300px] bg-muted rounded-lg">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    광고 영역 3
                  </div>
                </div>
              </div>
            </aside>

            {/* 메인 컨텐츠 */}
            <div className="md:col-span-6">
              <TabsContent value="generate">
                <GenerateNumbers />
              </TabsContent>
              <TabsContent value="search">
                <SearchNumbers />
              </TabsContent>
            </div>

            {/* 오른쪽 사이드바 광고 (데스크탑) */}
            <aside className="hidden md:block md:col-span-3">
              <div className="space-y-6">
                <div className="h-[300px] bg-muted rounded-lg">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    광고 영역 4
                  </div>
                </div>
                <div className="h-[300px] bg-muted rounded-lg">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    광고 영역 5
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Tabs>

        {/* 모바일 전용 하단 광고 */}
        <div className="md:hidden mt-6 h-[100px] bg-muted rounded-lg">
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            광고 영역 (모바일)
          </div>
        </div>
      </main>

      <footer className="border-t py-6 bg-background mt-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2024 hottoplay. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
