
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'jp' ? 'en' : 'jp');
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage} className="font-mono">
      {language.toUpperCase()}
    </Button>
  );
};
