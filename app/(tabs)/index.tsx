import AttendanceCards from "@/components/attendance/AttendanceCards";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <AttendanceCards />
    </SafeAreaView>
  );
};


export default HomeScreen;
