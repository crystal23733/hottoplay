import MainLayoutProps from './MainLayout.types';
import Header from '@/components/molecules/Header/Header';
import Footer from '@/components/molecules/Footer/Footer';

/**
 * 전체 페이지 레이아웃을 구성하는 컴포넌트
 */
export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6"></div>
        {children}
      </main>
      <Footer />
    </div>
  );
};
