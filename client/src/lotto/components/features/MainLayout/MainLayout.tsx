import MainLayoutProps from './MainLayout.types';
import Header from '@/lotto/components/molecules/Header/Header';
import Footer from '@/lotto/components/molecules/Footer/Footer';

/**
 * 전체 페이지 레이아웃을 구성하는 컴포넌트
 */
export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="mx-auto w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl px-4 py-4 md:py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
};
