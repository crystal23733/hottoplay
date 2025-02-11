import { AdSpace } from '@/lotto/components/atoms/AdSpace/AdSpace';
import AdSidebarProps from './AdSidebar.types';

/**
 * 사이드바 광고 영역을 표시하는 컴포넌트
 * 구글 애드센스 권장 크기인 스카이스크래퍼(160x600) 사용
 */
export const AdSidebar = ({ position, startAdNumber }: AdSidebarProps) => {
  return (
    <aside
      className={`
      hidden md:block md:col-span-3
      ${position === 'left' ? 'order-first' : 'order-last'}
    `}
    >
      <div
        className={`
        space-y-6
        ${position === 'right' ? 'flex flex-col items-end' : ''}
      `}
      >
        <AdSpace label={`광고 영역 ${startAdNumber}`} size="skyscraper" />
        <AdSpace label={`광고 영역 ${startAdNumber + 1}`} size="skyscraper" />
      </div>
    </aside>
  );
};
