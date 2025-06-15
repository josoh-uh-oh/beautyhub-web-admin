
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { translations, TranslationKeys } from '@/lib/translations';

export type Language = 'jp' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKeys, ...args: any[]) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('jp');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as Language;
    if (storedLanguage && ['jp', 'en'].includes(storedLanguage)) {
      setLanguageState(storedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    localStorage.setItem('language', lang);
    setLanguageState(lang);
  };

  const t = (key: TranslationKeys, ...args: any[]): string => {
    let translation = translations[language][key] || key;
    if (args.length > 0) {
      args.forEach((arg, index) => {
        translation = translation.replace(`{${index}}`, arg);
      });
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
