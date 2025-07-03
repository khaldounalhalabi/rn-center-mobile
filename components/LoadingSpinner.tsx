import { Loader2 } from "@/lib/icons/Loader2";
import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

const LoadingSpinner = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <Loader2 className="text-background" />
    </Animated.View>
  );
};

export default LoadingSpinner;
