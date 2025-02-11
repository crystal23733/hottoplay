'use client';

import FeatureGrid from '@/components/organisms/FeatureGrid/FeatureGrid';
import GameGrid from '@/components/organisms/GameGrid/GameGrid';
import { games } from '@/constants/home';
import { koreanFeatures, englishFeatures } from '@/constants/features';
import useLanguageToggle from '@/hooks/LanguageToggle/useLanguageToggle';
import LanguageButton from '@/components/atoms/Button/LanguageButton/LanguageButton';
import PageHeader from '@/components/molecules/PageHeader/PageHeader';
import SectionTitle from '@/components/atoms/SectionTitle/SectionTitle';
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
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="flex justify-end mb-8">
          <LanguageButton currentLanguage={language} onClick={toggleLanguage} />
        </div>

        <PageHeader language={language} />
        <GameGrid games={games} />

        <div className="mt-16 sm:mt-24 text-center">
          <SectionTitle className="mb-8">{featureTitle}</SectionTitle>
          <FeatureGrid features={currentFeatures} />
        </div>
      </div>
    </div>
  );
};

export default HomeTemplate;
