import AttendanceDayCard from "@/components/attendance/AttendanceDayCard";
import Select from "@/components/inputs/Select";
import useListPageNoPagination from "@/components/ListPageNoPagination";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import useUser from "@/hooks/UserHook";
import { useTranslation } from "@/localization";
import AttendanceLogService from "@/services/AttendanceLogService";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

const Index = () => {
  const { role } = useUser();
  const service = AttendanceLogService.make(role);
  const { t } = useTranslation();
  const router = useRouter();
  const [year, setYear] = useState<string>(dayjs().format("YYYY"));
  const [month, setMonth] = useState<number>(dayjs().month() + 1);

  const months = Array.from({ length: 12 }, (_, i) => ({
    label: dayjs().month(i).format("MMMM"),
    value: (i + 1).toString(),
  }));

  const { Render } = useListPageNoPagination({
    api(search, params) {
      return service.mine(params?.year ?? year, params?.month ?? month);
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
              defaultValue={params?.year ?? year}
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
              selected={params?.month ?? month?.toString()}
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

  return (
    <View className="flex-1 bg-background">
      <Render />
    </View>
  );
};

export default Index;
