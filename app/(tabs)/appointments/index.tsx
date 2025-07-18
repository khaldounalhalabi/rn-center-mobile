import Datepicker from "@/components/inputs/datepicker";
import Select from "@/components/inputs/Select";
import LabelValue from "@/components/label-value";
import useListPage from "@/components/ListPage";
import TranslatableEnum from "@/components/TranslatableEnum";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { AppointmentStatusEnum } from "@/enums/AppointmentStatusEnum";
import { getEnumValues } from "@/helpers/helpers";
import useUser from "@/hooks/UserHook";
import { useTranslation } from "@/localization";
import { AppointmentService } from "@/services/AppointmentService";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

const Appointments = () => {
  const { role } = useUser();
  const service = AppointmentService.make(role);
  const { t } = useTranslation();
  const router = useRouter();
  const { Render } = useListPage({
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
      <Pressable
        onPress={() => {
          router.push({
            pathname: `/appointments/[id]`,
            params: { id: item.id },
          });
        }}
      >
        <Card key={item.id} className="mb-4">
          <CardHeader>
            <CardTitle className="w-full flex flex-row items-center justify-between">
              <Badge>
                <Text>{item.customer?.user?.full_name}</Text>
              </Badge>
              <Badge variant={"secondary"}>
                <Text>{item.date_time}</Text>
              </Badge>
              <Badge variant={"outline"}>
                <Text>
                  <TranslatableEnum value={item.status} />
                </Text>
              </Badge>
            </CardTitle>
            <CardDescription>
              <LabelValue
                label={t("common.dashboard.sequence")}
                value={item.appointment_sequence}
              />
              <LabelValue
                label={t("common.dashboard.serviceName")}
                value={item.service?.name}
              />
            </CardDescription>
          </CardHeader>
        </Card>
      </Pressable>
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
  return <Render />;
};

export default Appointments;
