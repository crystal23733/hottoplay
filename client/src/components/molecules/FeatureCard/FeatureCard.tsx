'use client';

import FeatureCardProps from './FeatureCard.types';

/**
 * 기능 카드
 * @param {string} title - 타이틀
 * @param {string} description - 설명
 */
const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h3 className="font-bold mb-3 text-lg">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default FeatureCard;
