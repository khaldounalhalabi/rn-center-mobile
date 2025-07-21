import LoadingScreen from "@/components/LoadingScreen";
import { Badge } from "@/components/ui/badge";
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
          <Card className="my-3 mx-4">
            <CardHeader className="flex-row items-center bg-primary/10 rounded-t-2xl px-4 py-3">
              <CardTitle className="text-lg font-bold text-primary">
                {t(("week_days." + dayName) as any)}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-3">
              {schedules &&
              schedules[dayName] &&
              schedules[dayName].length > 0 ? (
                schedules[dayName].map((slot: Schedule, idx: number) => (
                  <View
                    key={idx}
                    className="flex flex-row items-center justify-between mb-2"
                  >
                    <View className="flex-1 items-start">
                      <Text className="text-xs text-muted-foreground">
                        {t("admin.schedules.table.startTime")}
                      </Text>
                      <Badge className="mt-1">
                        <Text>{slot.start_time}</Text>
                      </Badge>
                    </View>
                    <View className="bg-primary w-1/2 mx-5 h-1 rounded-md"></View>
                    <View className="flex-1 items-end">
                      <Text className="text-xs text-muted-foreground">
                        {t("admin.schedules.table.endTime")}
                      </Text>
                      <Badge className="mt-1">
                        <Text>{slot.end_time}</Text>
                      </Badge>
                    </View>
                  </View>
                ))
              ) : (
                <View className="flex flex-row items-center space-x-2 py-4 justify-center">
                  {/* Optionally add an icon here for empty state */}
                  <Text className="text-muted-foreground text-sm italic">
                    {t("doctor.schedules.show.no_schedule")}
                  </Text>
                </View>
              )}
            </CardContent>
          </Card>
        )}
      />
    </SafeAreaView>
  );
};

export default Index;
