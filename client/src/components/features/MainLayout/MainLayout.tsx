import MainLayoutProps from './MainLayout.types';
import Header from '@/components/molecules/Header/Header';
import Footer from '@/components/molecules/Footer/Footer';
import { AdSpace } from '@/components/atoms/AdSpace/AdSpace';

/**
 * 전체 페이지 레이아웃을 구성하는 컴포넌트
 */
export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <AdSpace 
            label="광고 영역 1" 
            size="leaderboard"
            className="hidden md:block mx-auto" 
          />
          <AdSpace 
            label="광고 영역 (모바일)" 
            size="mobile-banner"
            className="md:hidden mx-auto" 
          />
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
};