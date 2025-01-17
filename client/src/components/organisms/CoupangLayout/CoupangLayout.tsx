import CoupangSidebar from '@/components/molecules/CoupangSidebar/CoupangSidebar';
import CoupangLayoutProps from './CoupangLayout.types';
import CoupangAd from '@/components/atoms/CoupangAd/CoupangAd';

/**
 * 쿠팡 레이아웃 컴포넌트
 * @param props 쿠팡 레이아웃 컴포넌트 Props
 * @returns 쿠팡 레이아웃 컴포넌트
 */
const CoupangLayout: React.FC<CoupangLayoutProps> = ({ children, showMobileAd = true }) => {
  return (
    <>
      {/* 상단 배너 광고 */}
      <div className="mb-6">
        <CoupangAd size="banner" className="hidden md:block mx-auto" />
        <CoupangAd size="mobile-banner" className="md:hidden mx-auto" />
      </div>

      {/* 메인 레이아웃 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <CoupangSidebar position="left" />
        <div className="md:col-span-6">{children}</div>
        <CoupangSidebar position="right" />

        {showMobileAd && (
          <div className="md:hidden mt-6">
            <CoupangAd size="rectangle" className="mx-auto" />
          </div>
        )}
      </div>
    </>
  );
};

export default CoupangLayout;
