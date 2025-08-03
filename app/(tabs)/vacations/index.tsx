import Datepicker from "@/components/inputs/datepicker";
import useListPage from "@/components/ListPage";
import TranslatableEnum from "@/components/TranslatableEnum";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import VacationStatusEnum from "@/enums/VacationStatusEnum";
import { useNotificationHandler } from "@/hooks/NotificationHandlerHook";
import useUser from "@/hooks/UserHook";
import { useTranslation } from "@/localization";
import {
  NotificationPayload,
  NotificationsTypeEnum,
} from "@/models/NotificationPayload";
import Vacation from "@/models/Vacation";
import VacationService from "@/services/VacationService";
import React, { useCallback } from "react";
import { View } from "react-native";

interface VacationCardProps {
  item: Vacation;
}

const VacationCard = ({ item }: VacationCardProps) => {
  const { t } = useTranslation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case VacationStatusEnum.DRAFT:
        return "bg-primary";
      case VacationStatusEnum.APPROVED:
        return "bg-green-500";
      case VacationStatusEnum.REJECTED:
        return "bg-destructive";
      default:
        return "bg-primary";
    }
  };

  return (
    <Card className="mb-4 flex-row items-stretch overflow-hidden">
      <View className={`w-1.5 rounded-l-lg ${getStatusColor(item.status)}`} />
      <CardContent className="flex-1 p-4">
        <CardHeader>
          <View className="flex-row justify-between items-center">
            <Text className="font-bold text-lg">
              <TranslatableEnum value={item.status} />
            </Text>
          </View>
        </CardHeader>
        <View className="mt-3 mb-2">
          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-500">{t("vacations.from")}</Text>
            <Text className="font-semibold">{item.from}</Text>
          </View>
          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-500">{t("vacations.to")}</Text>
            <Text className="font-semibold">{item.to}</Text>
          </View>
          <View className="mt-2 pt-2 border-t border-gray-200">
            <Text className="text-gray-500 mb-1">{t("vacations.reason")}</Text>
            <Text className="font-medium leading-5">{item.reason}</Text>
          </View>
          {item?.cancellation_reason && (
            <View className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
              <Text className="text-destructive font-semibold mb-1">
                {t("landing.cancellation_reason")}
              </Text>
              <Text className="text-destructive">
                {item.cancellation_reason}
              </Text>
            </View>
          )}
        </View>
      </CardContent>
    </Card>
  );
};

const Vacations = () => {
  const { t } = useTranslation();
  const { role } = useUser();
  const service = VacationService.make(role);
  const { Render, refetch } = useListPage<Vacation>({
    createUrl: "/vacations/request-vacation",
    queryKey: "vacations",
    api(page, search, params) {
      return service.mine(page, search, params);
    },
    renderItem: ({ item }) => <VacationCard item={item} />,
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

  const handleNotification = useCallback((payload: NotificationPayload) => {
    if (
      payload.type === NotificationsTypeEnum.VacationStatusChanged ||
      payload.type == NotificationsTypeEnum.NewVacationAdded ||
      payload.type == NotificationsTypeEnum.VacationUpdated
    ) {
      refetch();
    }
  }, []);

  useNotificationHandler({
    handle: handleNotification,
  });

  return <Render />;
};

export default Vacations;
