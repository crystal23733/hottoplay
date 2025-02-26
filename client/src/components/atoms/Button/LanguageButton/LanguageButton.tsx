'use client';

import LanguageButtonProps from './LanguageButton.types';

const LanguageButton: React.FC<LanguageButtonProps> = ({ currentLanguage, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative inline-flex h-12 items-center justify-center rounded-xl px-6 py-3 text-base font-medium transition-all
    bg-white dark:bg-gray-800 text-gray-900 dark:text-white
    shadow-lg hover:shadow-xl
    border-2 border-blue-500/20 dark:border-blue-500/30
    hover:border-blue-500 dark:hover:border-blue-400
    hover:scale-105 active:scale-100
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <span className="mr-2 text-lg">{currentLanguage === 'en' ? '🇰🇷' : '🇺🇸'}</span>
      {currentLanguage === 'en' ? '한국어로 보기' : 'View in English'}
    </button>
  );
};

export default LanguageButton;
