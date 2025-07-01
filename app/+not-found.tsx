import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/button";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text className="text-primary md:text-3xl">
          This screen does not exist.
        </Text>
        <Link href="/" style={styles.link}>
          <Link href={"/"}>
            <Button>
              <Text>Go to home screen!</Text>
            </Button>
          </Link>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
