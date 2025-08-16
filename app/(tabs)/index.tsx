import AttendanceCards from "@/components/attendance/AttendanceCards";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <AttendanceCards />
    </SafeAreaView>
  );
};

export default HomeScreen;
