import { AdSidebar } from '@/components/molecules/AdSidebar/AdSidebar';
import { AdSpace } from '@/components/atoms/AdSpace/AdSpace';
import AdLayoutProps from './AdLayout.types';

/**
 * 광고를 포함한 전체 레이아웃 컴포넌트
 */
export const AdLayout = ({ children, showMobileAd = true }: AdLayoutProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <AdSidebar position="left" />
      <div className="md:col-span-6">{children}</div>
      <AdSidebar position="right" />

      {showMobileAd && (
        <div className="md:hidden mt-6">
          <AdSpace size="mobile-banner" className="mx-auto" />
        </div>
      )}
    </div>
  );
};
