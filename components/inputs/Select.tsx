import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Select as ShadcnSelect,
} from "@/components/ui/select";
import { useTranslation } from "@/localization";
import { Platform, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TranslatableEnum, { useTranslateEnum } from "../TranslatableEnum";
import { Label } from "../ui/label";

const Select = ({
  data,
  selected = undefined,
  label = undefined,
  onChange,
  translated = false,
}: {
  data: any[];
  selected?: string;
  label?: string;
  onChange?: ((value: string) => void) | undefined;
  translated?: boolean;
}) => {
  const { t } = useTranslation();
  const tEnum = useTranslateEnum();

  function isOption(v: any): v is { label?: string; value?: string } {
    return v && typeof v === "object" && "label" in v && "value" in v;
  }

  let defaultValue: string | undefined | { label?: string; value?: string } =
    data.filter((i) =>
      isOption(i) ? i.value == selected : i == selected,
    )?.[0] ?? undefined;

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({
      android: insets.bottom + 24,
      default: insets.bottom,
    }),
    left: 12,
    right: 12,
  };

  return (
    <View className="w-full flex flex-col items-start">
      <Label>{label}</Label>
      <ShadcnSelect
        defaultValue={{
          value:
            (isOption(defaultValue) ? defaultValue?.value : defaultValue) ?? "",
          label:
            (isOption(defaultValue) ? defaultValue?.label : defaultValue) ?? "",
        }}
        onValueChange={(option) => {
          if (onChange && option?.value) {
            onChange(option?.value);
          }
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={t("components.select_item")}
            className="text-foreground text-sm native:text-lg"
          />
        </SelectTrigger>
        <SelectContent insets={contentInsets} side="top">
          <ScrollView className="max-h-[250px]">
            <SelectGroup>
              <SelectLabel>{label ?? ""}</SelectLabel>
              {data.map((item, index) => (
                <SelectItem
                  value={
                    item == "all" ? "" : isOption(item) ? item.value : item
                  }
                  key={index}
                  label={
                    isOption(item)
                      ? item.label
                      : translated
                        ? tEnum(item)
                        : item
                  }
                >
                  {isOption(item) ? (
                    item.label
                  ) : translated ? (
                    <TranslatableEnum value={item} />
                  ) : (
                    item
                  )}
                </SelectItem>
              ))}
            </SelectGroup>
          </ScrollView>
        </SelectContent>
      </ShadcnSelect>
    </View>
  );
};

export default Select;
