import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get('window');

export default function CustomSplashScreen() {
  useEffect(() => {
    // Hide splash screen after 3 seconds
    const timer = setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/animations/splash-screen-loader.gif')}
        style={styles.loader}
        contentFit="contain"
        transition={0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    width: width , // 50% of screen width
    height: height , // 30% of screen height
  },
}); 