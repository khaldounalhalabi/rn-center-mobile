import LabelValue from "@/components/label-value";
import LoadingScreen from "@/components/LoadingScreen";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import WeekDayEnum from "@/enums/WeekDayEnum";
import { getEnumValues } from "@/helpers/helpers";
import useUser from "@/hooks/UserHook";
import { useTranslation } from "@/localization";
import { Schedule, SchedulesCollection } from "@/models/Schedule";
import { ScheduleService } from "@/services/ScheduleService";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList, RefreshControl, SafeAreaView, View } from "react-native";

const Index = () => {
  const { t } = useTranslation();
  const { role } = useUser();
  const service = ScheduleService.make(role);
  const {
    data: schedules,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["my_schedule"],
    queryFn: async () => {
      const res = await service.mine();
      return res.data as SchedulesCollection;
    },
  });

  const isAllEmpty =
    !schedules ||
    getEnumValues(WeekDayEnum).every(
      (day) => !schedules[day] || schedules[day].length === 0,
    );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center p-8">
        <Text className="text-center mb-2">{t("components.errored")}</Text>
        <Text onPress={() => refetch()} className="text-primary underline">
          {t("components.retry")}
        </Text>
      </View>
    );
  }

  if (isAllEmpty) {
    return (
      <View className="flex-1 justify-center items-center p-8">
        <Text className="text-lg text-muted-foreground">
          {t("doctor.schedules.show.no_schedule")}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        data={getEnumValues(WeekDayEnum)}
        keyExtractor={(item) => item}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        renderItem={({ item: dayName }) => (
          <Card className="my-2">
            <CardHeader>
              <CardTitle>{t(("week_days." + dayName) as any)}</CardTitle>
            </CardHeader>
            <CardContent>
              {schedules &&
              schedules[dayName] &&
              schedules[dayName].length > 0 ? (
                schedules[dayName].map((slot: Schedule, idx: number) => (
                  <View
                    key={idx}
                    className="flex flex-row justify-between items-center mb-1"
                  >
                    <LabelValue
                      label={t("admin.schedules.table.startTime")}
                      value={slot.start_time}
                      separated={false}
                      className="flex-1"
                    />
                    <LabelValue
                      label={t("admin.schedules.table.endTime")}
                      value={slot.end_time}
                      separated={false}
                      className="flex-1"
                    />
                  </View>
                ))
              ) : (
                <Text className="text-muted-foreground text-sm">
                  {t("doctor.schedules.show.no_schedule")}
                </Text>
              )}
            </CardContent>
          </Card>
        )}
      />
    </SafeAreaView>
  );
};

export default Index;
