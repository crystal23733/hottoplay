'use client';

import { Button } from '@/ui/Button';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TranslateToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className="flex items-center gap-2 text-sm font-medium"
    >
      <Languages className="w-4 h-4" />
      {i18n.language === 'ko' ? 'English' : '한국어'}
    </Button>
  );
};

export default TranslateToggle;
