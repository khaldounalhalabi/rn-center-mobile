import AuthProvider from "@/components/providers/AuthProvider";
import { Tabs } from "expo-router";
import { HomeIcon, User2 } from "lucide-react-native";
import React from "react";

const TabLayout = () => {
  return (
    <AuthProvider>
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
        <Tabs.Screen
          name="account" // Corresponds to app/(drawer)/(tabs)/index.tsx -> Home Screen
          options={{
            title: "Account",
            tabBarIcon: ({ color }) => <User2 color={color} />,
          }}
        />
        {/* Add other tab screens here */}
      </Tabs>
    </AuthProvider>
  );
};

export default TabLayout;
