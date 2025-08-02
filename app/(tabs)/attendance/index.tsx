import AttendanceDayCard from "@/components/attendance/AttendanceDayCard";
import Select from "@/components/inputs/Select";
import useListPageNoPagination from "@/components/ListPageNoPagination";
import NotificationHandler from "@/components/NotificationHandler";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import useUser from "@/hooks/UserHook";
import {
  NotificationPayload,
  RealTimeEventsTypeEnum,
} from "@/models/NotificationPayload";
import AttendanceLogService from "@/services/AttendanceLogService";
import dayjs from "dayjs";
import { useCallback } from "react";
import { View } from "react-native";

const Index = () => {
  const { role } = useUser();
  const service = AttendanceLogService.make(role);

  const months = Array.from({ length: 12 }, (_, i) => ({
    label: dayjs().month(i).format("MMMM"),
    value: (i + 1).toString(),
  }));

  const { Render, refetch } = useListPageNoPagination({
    queryKey: "attendance_logs",
    api(_search, params) {
      return service.mine(
        params?.year ?? dayjs().format("YYYY"),
        params?.month ?? dayjs().month() + 1,
      );
    },
    renderItem: ({ item }) => {
      const date = (item as any).key;
      const logs = (item as any).value as any[];
      return <AttendanceDayCard date={date} logs={logs} />;
    },
    filter(params, setParam) {
      return (
        <View className="flex-row gap-3 w-full">
          <View className="flex-1">
            <Text className="text-sm font-medium mb-2">Year</Text>
            <Input
              defaultValue={params?.year ?? dayjs().format("YYYY")}
              onChangeText={(v) => {
                setParam("year", v);
              }}
              placeholder="YYYY"
              keyboardType="numeric"
              maxLength={4}
            />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-medium mb-2">Month</Text>
            <Select
              data={months}
              selected={params?.month ?? `${dayjs().month() + 1}`}
              onChange={(value) => {
                setParam("month", value);
              }}
            />
          </View>
        </View>
      );
    },
    enableSearch: false,
  });

  const handleNotification = useCallback(
    (payload: NotificationPayload) => {
      console.log("Refetching");
      if (payload.type == RealTimeEventsTypeEnum.AttendanceEdited) {
        refetch();
      }
    },
    [refetch],
  );

  return (
    <>
      <NotificationHandler handle={handleNotification} isPermanent/>
      <View className="flex-1 bg-background">
        <Render />
      </View>
    </>
  );
};

export default Index;
