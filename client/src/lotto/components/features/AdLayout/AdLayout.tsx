import { AdSidebar } from '@/lotto/components/molecules/AdSidebar/AdSidebar';
import { AdSpace } from '@/lotto/components/atoms/AdSpace/AdSpace';
import AdLayoutProps from './AdLayout.types';

/**
 * 광고를 포함한 전체 레이아웃 컴포넌트
 */
export const AdLayout = ({ children, showMobileAd = true }: AdLayoutProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <AdSidebar position="left" startAdNumber={2} />
      <div className="md:col-span-6">{children}</div>
      <AdSidebar position="right" startAdNumber={4} />

      {showMobileAd && (
        <div className="md:hidden mt-6">
          <AdSpace label="광고 영역 (모바일)" size="mobile-banner" className="mx-auto" />
        </div>
      )}
    </div>
  );
};
