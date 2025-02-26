import { Language } from '@/types/language';
import { useCallback, useState } from 'react';

/**
 * 언어 토글 훅
 * @param {Language} initialLanguage - 초기 언어
 * @returns {Object} - 언어 토글 훅
 */
export default (initialLanguage: Language = 'en') => {
  const [language, setLanguage] = useState(initialLanguage);

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => (prev === 'en' ? 'ko' : 'en'));
  }, []);

  return {
    language,
    toggleLanguage,
  };
};
