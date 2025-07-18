import AuthProvider from "@/components/providers/AuthProvider";
import { Tabs } from "expo-router";
import {
  Calendar,
  CalendarClock,
  DoorOpen,
  HomeIcon,
  Settings,
  TentTree,
  WalletCards,
} from "lucide-react-native";
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
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          }}
        />

        <Tabs.Screen
          name="holidays"
          options={{
            title: "Holidays",
            tabBarIcon: ({ color }) => <TentTree color={color} />,
          }}
        />

        <Tabs.Screen
          name="appointments"
          options={{
            title: "Appointments",
            tabBarIcon: ({ color }) => <Calendar color={color} />,
          }}
        />

        <Tabs.Screen
          name="attendance"
          options={{
            title: "Attendance",
            tabBarIcon: ({ color }) => <DoorOpen color={color} />,
          }}
        />

        <Tabs.Screen
          name="schedule"
          options={{
            title: "My Schedule",
            tabBarIcon: ({ color }) => <CalendarClock color={color} />,
          }}
        />

        <Tabs.Screen
          name="payslips"
          options={{
            title: "Payslips",
            tabBarIcon: ({ color }) => <WalletCards color={color} />,
          }}
        />

        <Tabs.Screen
          name="account"
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
