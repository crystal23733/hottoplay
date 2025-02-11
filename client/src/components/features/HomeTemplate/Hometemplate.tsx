'use client';

import SectionTitle from '@/components/atoms/SectionTitle/SectionTitle';
import FeatureGrid from '@/components/organisms/FeatureGrid/FeatureGrid';
import GameGrid from '@/components/organisms/GameGrid/GameGrid';
import { features, games } from '@/constants/home';

/**
 * 홈 템플릿
 * @returns {JSX.Element} - 홈 템플릿
 */
const HomeTemplate = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-8 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 dark:from-blue-400 dark:via-purple-400 dark:to-violet-400 text-transparent bg-clip-text">
            Lottery Number Generator
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Choose your lottery game and get your numbers
          </p>
        </div>

        <GameGrid games={games} />

        <div className="mt-16 sm:mt-24 text-center">
          <SectionTitle className="mb-8 sm:mb-12">Features</SectionTitle>
          <FeatureGrid features={features} />
        </div>
      </div>
    </div>
  );
};

export default HomeTemplate;
