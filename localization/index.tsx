import { I18n } from "i18n-js";
import ArabicTranslatation from "./languages/arabic.json";
import EnglishTranslations from "./languages/english.json";
import * as Localization from "expo-localization";

// Setting up i18n configs
export const i18n = new I18n({
  en: EnglishTranslations,
  ar: ArabicTranslatation,
});

// i18n.locale = 'en'
i18n.defaultLocale = "en";
i18n.enableFallback = true;

// Set the locale from the device, fallback to default if not available
const deviceLocale =
  Localization.getLocales()[0]?.languageCode || i18n.defaultLocale;
i18n.locale = deviceLocale;

// Translation hook for components
import { useCallback } from "react";

// Helper type to generate all possible dot-separated keys from a nested object
function join<T extends string, U extends string>(a: T, b: U): `${T}.${U}` {
  return `${a}.${b}` as const;
}

type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & string]: ObjectType[Key] extends object
    ? // @ts-ignore
      `${Key}${DotPrefix<NestedKeyOf<ObjectType[Key]>>}`
    : Key;
}[keyof ObjectType & string];

type TranslationKey = NestedKeyOf<typeof EnglishTranslations>;

export function useTranslation() {
  // Memoize the t function for performance
  const t = useCallback(
    (key: TranslationKey, options?: any) => i18n.t(key, options),
    []
  );
  return { t, locale: i18n.locale };
}
