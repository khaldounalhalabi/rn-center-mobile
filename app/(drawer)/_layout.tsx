import { i18n } from '@/localization';
import { Drawer } from 'expo-router/drawer';
import { I18nManager } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, StyleSheet } from 'react-native';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ThemedView } from '@/components/ThemedView';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.themeToggleContainer}>
        <ThemeToggle />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  themeToggleContainer: {
    alignItems: 'flex-end',
    padding: 16,
  },
});

export default function DrawerLayout() {
  return (
    <Drawer screenOptions={{ headerShown: true }} drawerContent={CustomDrawerContent} initialRouteName='(tabs)'>
      <Drawer.Screen 
        name='(tabs)'
        options={{
          headerShown: true,
          drawerItemStyle: { display: 'none' },
        }}
      />
      {/* Removed old placeholder screens */}
      {/* <Drawer.Screen name="about-us" options={{ drawerLabel: i18n.t('about-us'), headerTitle: i18n.t('about-us') }} /> */}
      {/* <Drawer.Screen name="contact-us" options={{ drawerLabel: i18n.t('contact-us'), headerTitle: i18n.t('contact-us') }} /> */}
      {/* <Drawer.Screen name="settings" options={{ drawerLabel: i18n.t('settings'), headerTitle: i18n.t('settings') }} /> */}
      {/* <Drawer.Screen name="+not-found" options={{drawerItemStyle: {display: 'none'}}}  /> */}
    </Drawer>
  );
}