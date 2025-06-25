import { useState, useCallback, useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

import { useColorScheme } from '@/hooks/useColorScheme';
import CustomSplashScreen from '@/components/CustomSplashScreen';

import { I18nManager, View } from 'react-native';
import { i18n } from '@/localization';
import { LanguageProvider } from '@/context/LanguageProvider';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider as CustomThemeProvider, useTheme } from '@/context/ThemeProvider';

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

function AppWithTheme() {
  const { theme } = useTheme();
  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{
        headerTitleAlign: I18nManager.isRTL ? 'center' : 'left',
        contentStyle: { direction: I18nManager.isRTL ? 'rtl' : 'ltr' },
        headerShown: false
      }}>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='read/[id]' options={{ headerShown: false }} />
        <Stack.Screen name='+not-found' />
      </Stack>
      <StatusBar style={ theme === 'dark' ? 'dark' : 'light' } />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [languageLoaded, setLanguageLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Load language from AsyncStorage
  const loadLanguage = useCallback(async () => {
    try {
      const languageCode = await AsyncStorage.getItem('selected_language');
      i18n.locale = languageCode ?? 'en';
      
      if (languageCode === 'ar') {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
      }
      setLanguageLoaded(true);
    } catch (error) {
      console.error('Error loading language:', error);
      setLanguageLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadLanguage();
  }, [loadLanguage]);

  // if (!fontsLoaded || !languageLoaded) {
  //   return <CustomSplashScreen />;
  // }

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <CustomThemeProvider>
          <AppWithTheme />
        </CustomThemeProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
