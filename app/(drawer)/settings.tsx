import {  StyleSheet  } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { getLocales } from 'expo-localization';

import { useState } from 'react';
import { I18nManager , View , Text , Switch } from 'react-native';
import { ThemedSelect } from '@/components/ThemedSelect';
import {  i18n } from '@/localization';
import { useLanguage } from '@/hooks/useLanguage';



export default function SettingsScreen() {

  const { language } = useLanguage();
  const [updatedLanugage, setUpdatedLanguage] = useState(language || '');
  const { setLanguage } = useLanguage()

  const handleChangeLanguage = (lang) => {
    setUpdatedLanguage(lang);
    setLanguage(lang)
    }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>

    
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">{ i18n.t('chooseLang')}</ThemedText>
      </ThemedView>
      
      <ThemedSelect
        selectedValue={updatedLanugage}
        options={[{ label: i18n.t('english'), value: 'en' }, { label: i18n.t('arabic'), value: 'ar' }]}
        onSelect={handleChangeLanguage}
      />

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
