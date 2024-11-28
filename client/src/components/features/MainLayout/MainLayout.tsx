import MainLayoutProps from './MainLayout.types';

/**
 * 전체 페이지 레이아웃을 구성하는 컴포넌트
 */
export const MainLayout = ({ children }: MainLayoutProps) => {
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
        {/* 상단 광고 */}
        <div className="mb-6"></div>

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
