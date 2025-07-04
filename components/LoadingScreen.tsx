import { View } from "react-native";
import LoadingSpinner from "./LoadingSpinner";

const LoadingScreen = () => {
  return (
    <View className={"flex-1 h-screen w-screen items-center justify-center"}>
      <LoadingSpinner />
    </View>
  );
};

export default LoadingScreen;
