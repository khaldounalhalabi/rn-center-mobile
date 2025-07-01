import { Button } from "@/components/ui/button";
import { getUser } from "@/helpers/helpers";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View className="flex items-center justify-center">
          <Button
            onPress={() => {
              router.replace("/+not-found");
            }}
          >
            <Text>Press</Text>
          </Button>
        </View>
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
