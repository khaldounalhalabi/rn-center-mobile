import Datepicker from "@/components/inputs/datepicker";
import useListPage from "@/components/ListPage";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import useUser from "@/hooks/UserHook";
import { useTranslation } from "@/localization";
import { Holiday } from "@/models/Holiday";
import { HolidayService } from "@/services/HolidayService";
import React from "react";
import { View } from "react-native";

interface HolidayCardProps {
  item: Holiday;
}

const HolidayCard = ({ item }: HolidayCardProps) => {
  const { t } = useTranslation();

  return (
    <Card className="mb-4 flex-row items-stretch overflow-hidden">
      <View className="w-1.5 rounded-l-lg bg-primary" />
      <CardContent className="flex-1 p-4">
        <View className="mb-2">
          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-500">{t("holidays.from")}</Text>
            <Text className="font-semibold">{item.from}</Text>
          </View>
          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-500">{t("holidays.to")}</Text>
            <Text className="font-semibold">{item.to}</Text>
          </View>
          <View className="mt-2 pt-2 border-t border-gray-200">
            <Text className="text-gray-500 mb-1">{t("holidays.reason")}</Text>
            <Text className="font-medium leading-5">{item.reason}</Text>
          </View>
        </View>
      </CardContent>
    </Card>
  );
};

const Holidays = () => {
  const { role } = useUser();
  const service = HolidayService.make(role);
  const { t } = useTranslation();
  const { Render } = useListPage<Holiday>({
    queryKey: "holidays",
    api(page, search, params) {
      return service.indexWithPagination(
        page,
        search,
        undefined,
        undefined,
        undefined,
        params,
      );
    },
    renderItem: ({ item }) => <HolidayCard item={item} />,
    filter(params, setParam) {
      return (
        <Datepicker
          label={t("holidays.date")}
          onChange={(date) => {
            setParam("date", date.format("YYYY-MM-DD"));
          }}
          defaultValue={params?.date}
        />
      );
    },
  });

  return <Render />;
};

export default Holidays;
