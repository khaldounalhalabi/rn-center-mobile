import AttendanceCards from "@/components/attendance/AttendanceCards";
import useBackgroundLocation from "@/hooks/useBackgroundLocation";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <AttendanceCards />
    </SafeAreaView>
  );
};

export default HomeScreen;
