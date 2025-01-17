import CoupangSidebar from '@/components/molecules/CoupangSidebar/CoupangSidebar';
import CoupangLayoutProps from './CoupangLayout.types';
import CoupangAd from '@/components/atoms/CoupangAd/CoupangAd';

/**
 * 쿠팡 레이아웃 컴포넌트
 * @param props 쿠팡 레이아웃 컴포넌트 Props
 * @returns 쿠팡 레이아웃 컴포넌트
 */
const CoupangLayout: React.FC<CoupangLayoutProps> = ({ children, showMobileAd = true, showSidebar = true }) => {
  return (
    <>
      {/* 상단 배너 광고 */}
      <div className="mb-6">
        <CoupangAd size="banner" className="hidden md:block mx-auto" />
        <CoupangAd size="medium-banner" className="md:hidden mx-auto" />
      </div>

      {/* 메인 레이아웃 */}
      <div className={`
        grid grid-cols-1 md:grid-cols-12 gap-6
        ${!showSidebar ? 'max-w-4xl mx-auto' : ''}
      `}>
        {showSidebar && <CoupangSidebar position="left" />}
        <div className={`
          ${showSidebar ? 'md:col-span-6' : 'md:col-span-12'}
        `}>
          {children}
        </div>
        {showSidebar && <CoupangSidebar position="right" />}

        {showMobileAd && (
          <div className="md:hidden mt-6">
            <CoupangAd size="rectangle" className="mx-auto" />
          </div>
        )}
      </div>

      {/* 하단 배너 광고 */}
      <div className="mt-6">
        <CoupangAd size="banner" className="hidden md:block mx-auto" />
        <CoupangAd size="medium-banner" className="md:hidden mx-auto" />
      </div>
    </>
  );
};

export default CoupangLayout;
