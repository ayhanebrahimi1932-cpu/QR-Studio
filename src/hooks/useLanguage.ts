import { createContext, useContext } from 'react';
import en from '../i18n/en.json';

type Translations = typeof en;

interface LanguageContextType {
  language: 'en';
  t: Translations;
  isRTL: false;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  t: en,
  isRTL: false,
});

export function useLanguageProvider() {
  return { language: 'en' as const, t: en, isRTL: false as const };
}

export function useLanguage() {
  return useContext(LanguageContext);
}