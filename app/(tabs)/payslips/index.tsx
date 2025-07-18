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
import useUser from "@/hooks/UserHook";
import { useTranslation } from "@/localization";
import Payslip from "@/models/Payslip";
import PayslipService from "@/services/PayslipService";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

const Payslips = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { role } = useUser();
  const service = PayslipService.make(role);
  const { Render } = useListPage<Payslip>({
    api(page, search, params) {
      return service.mine(
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
            pathname: `/payslips/[id]`,
            params: { id: item.id },
          });
        }}
      >
        <Card key={item.id} className="mb-4">
          <CardHeader>
            <CardTitle className="w-full flex flex-row items-center justify-between">
              <Badge>
                <Text>{item.payrun?.period}</Text>
              </Badge>
              <Badge variant={"outline"}>
                <Text>
                  <TranslatableEnum value={item.status} />
                </Text>
              </Badge>
            </CardTitle>
            <CardDescription>
              <LabelValue
                label={t("payslips.paid_days")}
                value={item.paid_days}
              />
              <LabelValue
                label={t("payslips.gross_pay")}
                value={item.gross_pay}
              />
              <LabelValue label={t("payslips.net_pay")} value={item.net_pay} />
            </CardDescription>
          </CardHeader>
        </Card>
      </Pressable>
    ),
    queryKey: "payslips",
    enableSearch: true,
  });

  return <Render />;
};

export default Payslips;
