import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { View } from "react-native";
import { Text } from "./ui/text";

const LabelValue = ({
  label,
  value,
  className,
  separated = true,
  col = false,
}: {
  label?: string;
  value?: string | number | ReactNode;
  className?: string;
  separated?: boolean;
  col?: boolean;
}) => {
  return (
    <View
      className={cn(
        `flex ${col ? "flex-col items-start" : "flex-row items-center"}  ${separated ? "justify-between" : ""} w-full`,
        className,
      )}
    >
      <Text className="font-bold">
        {label} {!separated ? ": " : ""}
      </Text>
      <View>
        <Text className="font-thin">{value}</Text>
      </View>
    </View>
  );
};

export default LabelValue;
