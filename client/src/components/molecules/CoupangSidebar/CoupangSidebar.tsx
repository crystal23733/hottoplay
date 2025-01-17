import CoupangAd from '@/components/atoms/CoupangAd/CoupangAd';
import CoupangSidebarProps from './CoupangSidebar.types';

/**
 * 쿠팡 사이드바 컴포넌트
 * @param props 쿠팡 사이드바 컴포넌트 Props
 * @returns 쿠팡 사이드바 컴포넌트
 */
const CoupangSidebar: React.FC<CoupangSidebarProps> = ({ position }) => {
  return (
    <aside
      className={`hidden md:block md:col-span-3 ${position === 'left' ? 'order-first pl-4' : 'order-last pr-4'}`}
    >
      <div className={`sticky top-6 ${position === 'right' ? 'flex justify-end' : ''}`}>
        <CoupangAd size="skyscraper" />
      </div>
    </aside>
  );
};

export default CoupangSidebar;
