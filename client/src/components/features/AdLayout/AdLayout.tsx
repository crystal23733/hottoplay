import { AdSidebar } from '@/components/molecules/AdSidebar/AdSidebar';
import { AdSpace } from '@/components/atoms/AdSpace/AdSpace';
import AdLayoutProps from './AdLayout.types';

/**
 * 광고를 포함한 전체 레이아웃 컴포넌트
 */
export const AdLayout = ({ children, showMobileAd = true }: AdLayoutProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* 왼쪽 사이드바 광고 */}
      <AdSidebar position="left" startAdNumber={2} />

      {/* 메인 컨텐츠 */}
      <div className="md:col-span-6">{children}</div>

      {/* 오른쪽 사이드바 광고 */}
      <AdSidebar position="right" startAdNumber={4} />

      {/* 모바일 전용 하단 광고 */}
      {showMobileAd && (
        <div className="md:hidden mt-6">
          <AdSpace label="광고 영역 (모바일)" height="sm" />
        </div>
      )}
    </div>
  );
};
