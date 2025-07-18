import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";

export type ThemedSelectProps = {
  endpoint?: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
  selectedValue?: string;
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedSelect({
  endpoint,
  options = [],
  onSelect,
  selectedValue,
  lightColor,
  darkColor,
  type = "default",
}: ThemedSelectProps) {
  const [remoteOptions, setRemoteOptions] = useState<
    { label: string; value: string }[]
  >([...options]);
  const [loading, setLoading] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  const fetchOptions = async () => {
    if (!endpoint) return;
    setLoading(true);
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setRemoteOptions(
        data.map((item: any) => ({ label: item.label, value: item.value })),
      );
    } catch (error) {
      console.error("Failed to fetch options:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, [endpoint]);

  return (
    <ThemedView style={styles.container}>
      {loading ? (
        <ActivityIndicator color={color} />
      ) : (
        <Dropdown
          data={endpoint ? remoteOptions : options}
          labelField="label"
          valueField="value"
          value={selectedValue}
          placeholder={!isFocus ? "Select an option" : "..."}
          searchPlaceholder="Search..."
          onChange={(item) => {
            onSelect(item.value);
            setIsFocus(false);
          }}
          style={[styles.dropdown, { borderColor: color }, { backgroundColor }]}
          placeholderStyle={[{ color }, styles[type]]}
          selectedTextStyle={[{ color }, styles[type]]}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          activeColor={color}
          itemTextStyle={[{ color }, styles[type], { backgroundColor }]}
          itemContainerStyle={{ backgroundColor: backgroundColor }}
          renderItem={(item) => (
            <View
              style={[
                { backgroundColor },
                styles.item,
                item.value === selectedValue ? styles.selectedItem : {},
              ]}
            >
              <Text style={[{ color }, styles[type]]}>{item.label}</Text>
            </View>
          )}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  dropdown: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
  item: {
    padding: 10,
  },
  selectedItem: {
    backgroundColor: "#0a7ea4",
    padding: 10,
  },
});
