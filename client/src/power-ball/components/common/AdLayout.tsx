import DesktopAdLayout from './DesktopLayout/DesktopLayout';
import MobileAdLayout from './MobileAdLayout/MobileAdLayout';
import TabletAdLayout from './TabletAdLayout/TabletAdLayout';

/**
 * 통합 광고 레이아웃 컴포넌트
 * 반응형으로 모바일/태블릿/데스크톱 환경에 맞게 광고 표시
 * @param {AdLayoutProps} props - 광고 레이아웃 속성
 * @returns {React.ReactNode} 광고 레이아웃
 */
export default function AdLayout({ children }: { children: React.ReactNode }) {
  return (
    <DesktopAdLayout>
      <TabletAdLayout>
        <MobileAdLayout>{children}</MobileAdLayout>
      </TabletAdLayout>
    </DesktopAdLayout>
  );
}
