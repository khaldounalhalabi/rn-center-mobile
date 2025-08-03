import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/localization";
import React from "react";
import { Text } from "./ui/text";

export function LanguageToggleButton() {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant={"ghost"}
      onPress={() => {
        setLanguage(language == "en" ? "ar" : "en");
      }}
    >
      <Text>{language == "en" ? "AR" : "EN"}</Text>
    </Button>
  );
}
