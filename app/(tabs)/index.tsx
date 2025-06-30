import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View className="flex items-center justify-center" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingVertical: 0,
  },
});

export default HomeScreen;
