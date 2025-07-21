import Datepicker from "@/components/inputs/datepicker";
import LabelValue from "@/components/label-value";
import useListPage from "@/components/ListPage";
import TranslatableEnum from "@/components/TranslatableEnum";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import VacationStatusEnum from "@/enums/VacationStatusEnum";
import useUser from "@/hooks/UserHook";
import { useTranslation } from "@/localization";
import Vacation from "@/models/Vacation";
import VacationService from "@/services/VacationService";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

const Vacations = () => {
  const { t } = useTranslation();
  const { role } = useUser();
  const service = VacationService.make(role);
  const router = useRouter();
  const { Render } = useListPage<Vacation>({
    createUrl: "/vacations/request-vacation",
    queryKey: "vacations",
    api(page, search, params) {
      return service.mine(page, search, params);
    },
    renderItem: ({ item }) => (
      <Card key={item.id} className="mb-4">
        <CardHeader>
          <CardTitle>
            <View className="flex-1 flex-row items-center justify-between">
              <View className="flex-1 flex-row items-center gap-2">
                <Badge>
                  <Text>{item.from}</Text>
                </Badge>
                <Badge>
                  <Text>{item.to}</Text>
                </Badge>
              </View>
              <View>
                <Badge
                  variant={
                    item.status == VacationStatusEnum.DRAFT
                      ? "secondary"
                      : item.status == VacationStatusEnum.APPROVED
                        ? "success"
                        : "destructive"
                  }
                >
                  <Text>
                    <TranslatableEnum value={item.status} />
                  </Text>
                </Badge>
              </View>
            </View>
          </CardTitle>
          <CardDescription>
            <Text>{item.reason}</Text>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {item?.cancellation_reason && (
            <LabelValue
              label={t("landing.cancellation_reason")}
              value={item.cancellation_reason}
              col
              className="border border-destructive p-3 rounded-md"
            />
          )}
        </CardContent>
      </Card>
    ),
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

export default Vacations;
