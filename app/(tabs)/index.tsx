import AttendanceCards from "@/components/attendance/AttendanceCards";
import { useNotification } from "@/components/providers/NotificationContext";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const router = useRouter();
  const { expoPushToken, notification, error } = useNotification();

  console.log(expoPushToken);

  return (
    <SafeAreaView>
      <AttendanceCards />
    </SafeAreaView>
  );
};

export default HomeScreen;
