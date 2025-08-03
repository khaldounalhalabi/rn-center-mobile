import Datepicker from "@/components/inputs/datepicker";
import Select from "@/components/inputs/Select";
import useListPage from "@/components/ListPage";
import TranslatableEnum from "@/components/TranslatableEnum";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { AppointmentStatusEnum } from "@/enums/AppointmentStatusEnum";
import { getEnumValues } from "@/helpers/helpers";
import { useNotificationHandler } from "@/hooks/NotificationHandlerHook";
import useUser from "@/hooks/UserHook";
import type { TranslationKey } from "@/localization";
import { useTranslation } from "@/localization";
import {
  NotificationPayload,
  NotificationsTypeEnum,
} from "@/models/NotificationPayload";
import { AppointmentService } from "@/services/AppointmentService";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Pressable, View } from "react-native";

interface AppointmentCardProps {
  item: any;
  t: (key: TranslationKey, options?: any) => string;
  router: ReturnType<typeof useRouter>;
}

const AppointmentCard = ({ item, t, router }: AppointmentCardProps) => (
  <Pressable
    onPress={() => {
      router.push({
        pathname: `/appointments/[id]`,
        params: { id: item.id },
      });
    }}
    className="mb-4 flex-row items-stretch overflow-hidden"
  >
    {/* Accent bar */}
    <View className="w-1.5 bg-primary rounded-l-lg" />
    <Card className="flex-1 p-0 bg-card shadow-sm">
      <CardHeader>
        <View className="flex-row justify-between items-center mb-1">
          <Text className="font-bold text-lg text-card-foreground">
            {item.customer?.user?.full_name}
          </Text>
          <Badge variant="secondary">
            <Text className="text-card-foreground">{item.date_time}</Text>
          </Badge>
        </View>
        <Badge variant="outline" className="self-start mt-1">
          <Text className="font-bold text-primary">
            <TranslatableEnum value={item.status} />
          </Text>
        </Badge>
      </CardHeader>
      <CardContent>
        <View className="mt-2">
          <View className="flex-row justify-between mb-1">
            <Text className="text-muted-foreground">
              {t("common.dashboard.sequence")}
            </Text>
            <Text className="font-semibold text-card-foreground">
              {item.appointment_sequence}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-muted-foreground">
              {t("common.dashboard.serviceName")}
            </Text>
            <Text className="font-semibold text-card-foreground">
              {item.service?.name}
            </Text>
          </View>
        </View>
      </CardContent>
    </Card>
  </Pressable>
);

const Appointments = () => {
  const { role } = useUser();
  const service = AppointmentService.make(role);
  const { t } = useTranslation();
  const router = useRouter();
  const { Render, refetch } = useListPage({
    queryKey: "appointments",
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
    renderItem: ({ item }) => (
      <AppointmentCard item={item} t={t} router={router} />
    ),
    filter(params, setParam) {
      return (
        <>
          <Select
            label={t("common.appointment.table.status")}
            onChange={(v) => setParam("status", v)}
            data={getEnumValues(AppointmentStatusEnum)}
            selected={params?.status}
            translated
          />
          <Datepicker
            label={t("common.appointment.show.date")}
            onChange={(date) => {
              setParam("date", date.format("YYYY-MM-DD"));
            }}
            defaultValue={params?.date}
          />
        </>
      );
    },
  });

  const handleNotification = useCallback((payload: NotificationPayload) => {
    if (payload.type === NotificationsTypeEnum.AppointmentEvent) {
      refetch();
    }
  }, []);

  useNotificationHandler({
    handle: handleNotification,
  });

  return <Render />;
};

export default Appointments;
