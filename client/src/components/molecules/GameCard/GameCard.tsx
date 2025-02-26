'use client';

import { ArrowRight } from 'lucide-react';
import GameCardProps from './GameCard.types';
import GameBadge from '@/components/atoms/GameBadge/GameBadge';
import { useRouter } from 'next/navigation';

/**
 * 게임 카드
 * @param {string} title - 타이틀
 * @param {string} description - 설명
 * @param {string} bgColor - 배경 색상
 * @param {string} href - 링크
 * @param {string} country - 국가
 * @param {string} language - 언어
 */
const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  bgColor,
  href,
  country,
  language,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 cursor-pointer"
    >
      <div
        className={`h-48 relative bg-gradient-to-r ${bgColor} p-6 flex items-center justify-center`}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center">{title}</h2>
        <GameBadge language={language} />
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{country}</span>
        </div>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="inline-flex items-center text-blue-500 dark:text-blue-400 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-300">
          {language === '한국어' ? '시작하기' : 'Start'}
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default GameCard;
