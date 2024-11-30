import { Coins } from 'lucide-react';
import Divider from '@/components/atoms/Divider/Divider';

const HeroSection: React.FC = () => (
  <div className="relative py-8">
    <div className="flex flex-col items-center space-y-6">
      {/* 로고 아이콘 */}
      <div className="relative">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-violet-500 rounded-3xl flex items-center justify-center shadow-lg transform rotate-12">
          <Coins className="w-12 h-12 text-white transform -rotate-12" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-blue-500 to-violet-500 rounded-3xl opacity-30 blur-xl" />
      </div>

      {/* 메인 제목 */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-black leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 dark:from-blue-400 dark:via-purple-400 dark:to-violet-400">
            로또번호 예상 조합기
          </span>
        </h1>
        <p className="text-lg text-muted-foreground">다양한 방식의 랜덤 번호 생성</p>
      </div>

      <Divider />
    </div>
  </div>
);

export default HeroSection;
