import HeroSection from '@/lotto/components/organisms/HeroSection/HeroSection';
import Description from '@/lotto/components/organisms/Description/Description';

const HomeIntro: React.FC = () => {
  return (
    <div className="relative mb-16">
      {/* 배경 효과 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-violet-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl" />
      </div>

      <HeroSection />
      <Description />
    </div>
  );
};

export default HomeIntro;
