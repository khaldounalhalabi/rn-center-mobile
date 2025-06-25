import { I18n } from 'i18n-js';
import ArabicTranslatation from './languages/arabic.json'
import EnglishTranslations from './languages/english.json'

// Setting up i18n configs
export const i18n = new I18n({
  en: EnglishTranslations,
  ar: ArabicTranslatation,
});

// i18n.locale = 'en'
i18n.defaultLocale = 'en'
i18n.enableFallback = true




