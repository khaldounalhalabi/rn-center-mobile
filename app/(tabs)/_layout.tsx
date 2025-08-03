import AuthProvider from "@/components/providers/AuthProvider";
import { RoleEnum } from "@/enums/RoleEnum";
import useUser from "@/hooks/UserHook";
import { useTranslation } from "@/localization";
import { Tabs } from "expo-router";
import {
  Calendar,
  CalendarClock,
  CalendarIcon,
  CheckCheck,
  DoorOpen,
  HomeIcon,
  TentTree,
  WalletCards,
} from "lucide-react-native";
import React from "react";

const TabLayout = () => {
  const { role } = useUser();
  const { t } = useTranslation();
  return (
    <AuthProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          animation: "shift",
        }}
      >
        <Tabs.Screen
          name="holidays"
          options={{
            title: t("holidays.holidays"),
            tabBarIcon: ({ color }) => <TentTree color={color} />,
          }}
        />

        <Tabs.Screen
          name="appointments"
          options={{
            title: t("landing.appointments"),
            tabBarIcon: ({ color }) => <Calendar color={color} />,
            href:
              role == RoleEnum.DOCTOR ? { pathname: "/appointments" } : null,
          }}
        />

        <Tabs.Screen
          name="index"
          options={{
            title: t("landing.home"),
            tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          }}
        />

        <Tabs.Screen
          name="attendance"
          options={{
            title: t("sideBar.my_attendance"),
            tabBarIcon: ({ color }) => <DoorOpen color={color} />,
          }}
        />

        <Tabs.Screen
          name="schedule"
          options={{
            title: t("sideBar.my_schedule"),
            tabBarIcon: ({ color }) => <CalendarClock color={color} />,
            href: null,
          }}
        />

        <Tabs.Screen
          name="vacations"
          options={{
            title: t("sideBar.vacations"),
            tabBarIcon: ({ color }) => <CalendarIcon color={color} />,
            href: null,
          }}
        />

        <Tabs.Screen
          name="payslips"
          options={{
            title: t("payslips.payslips"),
            tabBarIcon: ({ color }) => <WalletCards color={color} />,
          }}
        />

        <Tabs.Screen
          name="tasks"
          options={{
            title: t("tasks.tasks"),
            tabBarIcon: ({ color }) => <CheckCheck color={color} />,
            href: role == RoleEnum.SECRETARY ? { pathname: "/tasks" } : null,
          }}
        />

        <Tabs.Screen
          name="account"
          options={{
            title: "Settings",
            href: null,
          }}
        />
      </Tabs>
    </AuthProvider>
  );
};

export default TabLayout;
