import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Page = ({ children }: { children?: React.ReactNode }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="w-full p-5 flex flex-col gap-3">{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page;
