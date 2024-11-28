import { AdSpace } from '@/components/atoms/AdSpace/AdSpace';
import MainLayoutProps from './MainLayout.types';
import { Coins, History, Settings, TrendingUp } from 'lucide-react';

/**
 * 전체 페이지 레이아웃을 구성하는 컴포넌트
 */
export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto px-4 h-16">
          <div className="flex h-full items-center justify-between">
            <div className="flex items-center space-x-3">
              <Coins className="h-6 w-6 text-blue-500" />
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                hottoplay
              </h1>
            </div>
          </div>
        </nav>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="container mx-auto px-4 py-6">
        {/* 상단 광고 */}
        <div className="mb-6">
          <AdSpace label="광고 영역 1" height="md" className="h-[100px] md:h-[120px]" />
        </div>
        {children}
      </main>

      {/* 푸터 */}
      <footer className="border-t py-6 bg-background mt-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2024 hottoplay. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
