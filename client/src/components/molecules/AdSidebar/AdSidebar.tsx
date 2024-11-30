import { AdSpace } from '@/components/atoms/AdSpace/AdSpace';
import AdSidebarProps from './AdSidebar.types';

/**
 * 사이드바 광고 영역을 표시하는 컴포넌트
 */
export const AdSidebar = ({ position, startAdNumber }: AdSidebarProps) => {
  return (
    <aside
      className={`
      hidden md:block md:col-span-3
      ${position === 'left' ? 'order-first' : 'order-last'}
    `}
    >
      <div className="space-y-6">
        <AdSpace label={`광고 영역 ${startAdNumber}`} height="lg" />
        <AdSpace label={`광고 영역 ${startAdNumber + 1}`} height="lg" />
      </div>
    </aside>
  );
};
