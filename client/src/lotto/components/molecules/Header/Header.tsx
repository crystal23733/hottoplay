import Logo from '@/lotto/components/atoms/Logo/Logo';
import NoticeLink from '@/lotto/components/atoms/Button/NoticeButton/NoticeButton';
import DreamButton from '@/lotto/components/atoms/Button/DreamButton/DreamButton';
import TranslateToggle from '../TranslateToggle/TranslateToggle';

const Header: React.FC = () => (
  <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <nav className="container mx-auto px-4 h-16">
      <div className="flex h-full items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
          <DreamButton />
          <NoticeLink />
          <TranslateToggle />
        </div>
      </div>
    </nav>
  </header>
);

export default Header;
