import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { Languages } from "@/lib/icons/icons";
import { useTranslation } from "@/localization";
import React from "react";

export function LanguageToggleButton() {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant={"outline"}
      onPress={() => {
        setLanguage(language == "en" ? "ar" : "en");
      }}
      size={"icon"}
    >
      <Languages className="text-primary" />
    </Button>
  );
}
