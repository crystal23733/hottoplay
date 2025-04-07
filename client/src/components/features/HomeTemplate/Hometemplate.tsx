'use client';

import FeatureGrid from '@/components/organisms/FeatureGrid/FeatureGrid';
import GameGrid from '@/components/organisms/GameGrid/GameGrid';
import { games } from '@/constants/home';
import { koreanFeatures, englishFeatures } from '@/constants/features';
import LanguageButton from '@/components/atoms/Button/LanguageButton/LanguageButton';
import PageHeader from '@/components/molecules/PageHeader/PageHeader';
import SectionTitle from '@/components/atoms/SectionTitle/SectionTitle';
import { useState } from 'react';
import { Language } from '@/types/language';

/**
 * 홈 템플릿
 * @returns {JSX.Element} - 홈 템플릿
 */
const HomeTemplate = () => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'ko' ? 'en' : 'ko'));
  };

  return (
    <div className="py-8 md:py-12 px-4 mx-auto w-full max-w-screen-md md:max-w-screen-lg">
      <div className="mx-auto">
        <div className="flex justify-end mb-4">
          <LanguageButton currentLanguage={language} onClick={toggleLanguage} />
        </div>

        <PageHeader language={language} />

        <div className="space-y-12 md:space-y-16">
          <section>
            <SectionTitle className="mb-6 text-center">
              {language === 'ko' ? '선택하세요' : 'Choose your game'}
            </SectionTitle>
            <GameGrid games={games} />
          </section>

          <section>
            <SectionTitle className="mb-6 text-center">
              {language === 'ko' ? '주요 기능' : 'Key Features'}
            </SectionTitle>
            <FeatureGrid features={language === 'ko' ? koreanFeatures : englishFeatures} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomeTemplate;
