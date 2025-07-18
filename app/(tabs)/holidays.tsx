import Datepicker from "@/components/inputs/datepicker";
import useListPage from "@/components/ListPage";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import useUser from "@/hooks/UserHook";
import { useTranslation } from "@/localization";
import { Holiday } from "@/models/Holiday";
import { HolidayService } from "@/services/HolidayService";
import React from "react";

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
    renderItem: ({ item }) => (
      <Card key={item.id} className="mb-4">
        <CardHeader>
          <CardTitle>
            <Badge>
              <Text>{item.from}</Text>
            </Badge>
            <Badge>
              <Text>{item.to}</Text>
            </Badge>
          </CardTitle>
          <CardDescription>
            <Text>{item.reason}</Text>
          </CardDescription>
        </CardHeader>
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

export default Holidays;
