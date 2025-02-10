import { ArrowRight, Link } from 'lucide-react';
import GameCardProps from './GameCard.types';
import Image from 'next/image';
import GameBadge from '@/components/atoms/GameBadge/GameBadge';

/**
 * 게임 카드
 * @param {string} title - 타이틀
 * @param {string} description - 설명
 * @param {string} image - 이미지
 * @param {string} href - 링크
 * @param {string} country - 국가
 * @param {string} language - 언어
 */
const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  image,
  href,
  country,
  language,
}) => {
  return (
    <Link
      href={href}
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      <div className="aspect-video relative">
        <Image src={image} alt={title} fill className="object-cover" />
        <GameBadge language={language} />
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{country}</span>
        </div>
        <h2 className="text-sm sm:text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors">
          {title}
        </h2>
        <p className="flex-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center text-blue-500 font-medium">
          {language === '한국어' ? '시작하기' : 'Start'}
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
