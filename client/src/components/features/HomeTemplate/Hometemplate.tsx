'use client';

import FeatureGrid from '@/components/organisms/FeatureGrid/FeatureGrid';
import GameGrid from '@/components/organisms/GameGrid/GameGrid';
import { games } from '@/constants/home';
import { koreanFeatures, englishFeatures } from '@/constants/features';
import useLanguageToggle from '@/hooks/LanguageToggle/useLanguageToggle';
import LanguageButton from '@/components/atoms/Button/LanguageButton/LanguageButton';
import PageHeader from '@/components/molecules/PageHeader/PageHeader';
import SectionTitle from '@/components/atoms/SectionTitle/SectionTitle';
import AdBanner from '@/components/atoms/AdBanner/AdBanner';
/**
 * 홈 템플릿
 * @returns {JSX.Element} - 홈 템플릿
 */
const HomeTemplate = () => {
  const { language, toggleLanguage } = useLanguageToggle();
  const currentFeatures = language === 'en' ? englishFeatures : koreanFeatures;
  const featureTitle = language === 'en' ? 'Features' : '서비스 특징';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      {/* 모바일 상단 광고 */}
      <div className="md:hidden w-full flex justify-center py-4">
        <AdBanner size="mobile-banner" />
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="flex justify-end mb-8">
          <LanguageButton currentLanguage={language} onClick={toggleLanguage} />
        </div>

        {/* 메인 컨텐츠 레이아웃 */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* 왼쪽 사이드 광고 */}
          <div className="hidden md:block">
            <AdBanner size="skyscraper" className="sticky top-8" />
          </div>

          {/* 메인 컨텐츠 */}
          <div className="flex-1">
            <PageHeader language={language} />
            <GameGrid games={games} />

            <div className="mt-16 sm:mt-24 text-center">
              <SectionTitle className="mb-8">{featureTitle}</SectionTitle>
              <FeatureGrid features={currentFeatures} />
            </div>
          </div>

          {/* 오른쪽 사이드 광고 */}
          <div className="hidden md:block">
            <AdBanner size="skyscraper" className="sticky top-8" />
          </div>
        </div>

        {/* 하단 광고 */}
        <div className="w-full flex justify-center mt-16">
          <AdBanner
            size={window.innerWidth < 768 ? 'mobile-banner' : 'leaderboard'}
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeTemplate;
