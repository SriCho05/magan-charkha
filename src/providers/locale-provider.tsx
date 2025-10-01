
'use client';

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import en from '@/lib/locales/en';
import hi from '@/lib/locales/hi';
import es from '@/lib/locales/es';

const translations: Record<string, Record<string, string>> = {
  en,
  hi,
  es,
};

interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
}

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState('en');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedLocale = localStorage.getItem('magancharkha_locale');
    if (savedLocale && translations[savedLocale]) {
      setLocale(savedLocale);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('magancharkha_locale', locale);
    }
  }, [locale, isMounted]);

  const t = useCallback((key: string): string => {
      const lang = translations[locale] || translations.en;
      return lang[key] || key;
    },
    [locale]
  );
  
  if (!isMounted) {
    return null; // or a loading component
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};
