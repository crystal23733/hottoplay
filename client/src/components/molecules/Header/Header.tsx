import Logo from '@/components/atoms/Logo/Logo';
import NoticeLink from '@/components/atoms/Button/NoticeButton/NoticeButton';

const Header: React.FC = () => (
  <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <nav className="container mx-auto px-4 h-16">
      <div className="flex h-full items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
          <NoticeLink />
        </div>
      </div>
    </nav>
  </header>
);

export default Header;
