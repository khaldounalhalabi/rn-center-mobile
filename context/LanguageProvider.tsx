import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import { i18n } from '@/localization';
import { I18nManager } from 'react-native';
import * as Updates from 'expo-updates';
import { ThemedView } from '@/components/ThemedView';

const LANGUAGE_KEY = 'selected_language';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('en'); // Default to English

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (savedLanguage) {
          setLanguage(savedLanguage);
      }
    };

    loadLanguage();
  }, []);

  const updateLanguage = async (newLanguage: string) => {
    await AsyncStorage.setItem(LANGUAGE_KEY, newLanguage);
    setLanguage(newLanguage);

    if (newLanguage && newLanguage != language ) {
        i18n.locale = newLanguage;
        if (newLanguage == 'ar') {
            I18nManager.allowRTL(true);
            I18nManager.forceRTL(true);
        }
        Updates.reloadAsync();
    
      } else if (Array.isArray(getLocales())) {
        i18n.locale = getLocales()[0].languageCode ?? 'en';
      }
  };

  return (
      <LanguageContext.Provider value={{ language, setLanguage: updateLanguage }}>

            {children}

    </LanguageContext.Provider>
  );
}

