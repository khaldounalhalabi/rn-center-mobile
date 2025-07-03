import { useTranslation } from "@/localization";

const TranslatableEnum = ({ value }: { value?: string }) => {
  const { t } = useTranslation();
  if (!value) {
    return "";
  }
  return t(`types_statuses.${value}` as any);
};

export default TranslatableEnum;
