import { AdSpace } from '@/components/atoms/AdSpace/AdSpace';
import AdSidebarProps from './AdSidebar.types';

/**
 * 사이드바 광고 영역을 표시하는 컴포넌트
 * 구글 애드센스 권장 크기인 스카이스크래퍼(160x600) 사용
 */
export const AdSidebar = ({ position, adNumber }: AdSidebarProps) => {
  return (
    <aside
      className={`
      hidden md:block md:col-span-3
      ${position === 'left' ? 'order-first' : 'order-last'}
    `}
    >
      <div className={`sticky top-6 ${position === 'right' ? 'flex justify-end' : ''}`}>
        <AdSpace label={`광고 영역 ${adNumber}`} size="skyscraper" />
      </div>
    </aside>
  );
};
