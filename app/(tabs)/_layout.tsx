import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { HomeIcon } from "lucide-react-native";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index" // Corresponds to app/(drawer)/(tabs)/index.tsx -> Home Screen
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      {/* Add other tab screens here */}
    </Tabs>
  );
};

export default TabLayout;
