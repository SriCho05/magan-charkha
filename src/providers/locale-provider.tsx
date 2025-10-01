
'use client';

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import en from '@/lib/locales/en';
import hi from '@/lib/locales/hi';
import es from '@/lib/locales/es';
import ar from '@/lib/locales/ar';
import bn from '@/lib/locales/bn';
import de from '@/lib/locales/de';
import fr from '@/lib/locales/fr';
import id from '@/lib/locales/id';
import ja from '@/lib/locales/ja';
import ko from '@/lib/locales/ko';
import mr from '@/lib/locales/mr';
import pt from '@/lib/locales/pt';
import ru from '@/lib/locales/ru';
import ta from '@/lib/locales/ta';
import te from '@/lib/locales/te';
import tr from '@/lib/locales/tr';
import ur from '@/lib/locales/ur';
import vi from '@/lib/locales/vi';
import yue from '@/lib/locales/yue';
import zh from '@/lib/locales/zh';


const translations: Record<string, Record<string, string>> = {
  en,
  hi,
  es,
  ar,
  bn,
  de,
  fr,
  id,
  ja,
  ko,
  mr,
  pt,
  ru,
  ta,
  te,
  tr,
  ur,
  vi,
  yue,
  zh,
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
