import AuthProvider from "@/components/providers/AuthProvider";
import { Tabs } from "expo-router";
import { Calendar, HomeIcon, Settings, TentTree } from "lucide-react-native";
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
          name="holidays" // Corresponds to app/(drawer)/(tabs)/index.tsx -> Home Screen
          options={{
            title: "Holidays",
            tabBarIcon: ({ color }) => <TentTree color={color} />,
          }}
        />

        <Tabs.Screen
          name="appointments" // Corresponds to app/(drawer)/(tabs)/index.tsx -> Home Screen
          options={{
            title: "Appointments",
            tabBarIcon: ({ color }) => <Calendar color={color} />,
          }}
        />

        <Tabs.Screen
          name="account" // Corresponds to app/(drawer)/(tabs)/index.tsx -> Home Screen
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => <Settings color={color} />,
          }}
        />
      </Tabs>
    </AuthProvider>
  );
};

export default TabLayout;
