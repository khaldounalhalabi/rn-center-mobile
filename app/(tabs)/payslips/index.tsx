import useListPage from "@/components/ListPage";
import LoadingSpinner from "@/components/LoadingSpinner";
import TranslatableEnum from "@/components/TranslatableEnum";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useNotificationHandler } from "@/hooks/NotificationHandlerHook";
import useFileDownload from "@/hooks/useFileDownload";
import useUser from "@/hooks/UserHook";
import { DownloadIcon } from "@/lib/icons/icons";
import { useTranslation } from "@/localization";
import {
  NotificationPayload,
  NotificationsTypeEnum,
  RealTimeEventsTypeEnum,
} from "@/models/NotificationPayload";
import Payslip from "@/models/Payslip";
import PayslipService from "@/services/PayslipService";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Pressable, View } from "react-native";

interface PayslipCardProps {
  item: Payslip;
  role: string | undefined;
}

const PayslipCard = ({ item, role }: PayslipCardProps) => {
  const { downloadFile, isDownloading } = useFileDownload();
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/payslips/[id]",
          params: {
            id: item?.id,
          },
        });
      }}
    >
      <Card
        style={{
          marginBottom: 16,
          flexDirection: "row",
          alignItems: "stretch",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: 6,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          }}
          className="bg-primary"
        />
        <CardContent style={{ flex: 1, padding: 16 }}>
          <CardHeader>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {item?.payrun?.period}
              </Text>
              <Badge variant="outline">
                <Text className={"text-[#4F46E5]"}>
                  <TranslatableEnum value={item?.status} />
                </Text>
              </Badge>
            </View>
          </CardHeader>
          <View style={{ marginTop: 12, marginBottom: 8 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 4,
              }}
            >
              <Text>{t("payslips.paid_days")}</Text>
              <Text>{item?.paid_days}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 4,
              }}
            >
              <Text>{t("payslips.gross_pay")}</Text>
              <Text>{item?.gross_pay}</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>{t("payslips.net_pay")}</Text>
              <Text>{item?.net_pay}</Text>
            </View>
          </View>
          {item?.can_download && (
            <CardFooter
              style={{ paddingHorizontal: 0, paddingBottom: 0, paddingTop: 8 }}
            >
              <Button
                className="mt-2 w-full"
                size="sm"
                onPress={async (e) => {
                  e.stopPropagation && e.stopPropagation();
                  const url = `${role}/payslips/${item?.id}/pdf`;
                  await downloadFile(url, `Payslip-${item?.id}.pdf`);
                }}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                {isDownloading ? (
                  <LoadingSpinner
                    className="text-primary-foreground"
                    size={16}
                  />
                ) : (
                  <DownloadIcon className="text-primary-foreground" />
                )}
                <Text className={"ml-2 font-bold"}>
                  {t("components.download")}
                </Text>
              </Button>
            </CardFooter>
          )}
        </CardContent>
      </Card>
    </Pressable>
  );
};

const Payslips = () => {
  const { role } = useUser();
  const service = PayslipService.make(role);
  const { Render, refetch } = useListPage<Payslip>({
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
    renderItem: ({ item }) => <PayslipCard item={item} role={role} />,
    queryKey: "payslips",
    enableSearch: true,
  });

  const handleNotification = useCallback(
    (payload: NotificationPayload) => {
      if (
        payload.type == NotificationsTypeEnum.PayslipUpdated ||
        payload.type == NotificationsTypeEnum.NewPayrunAdded ||
        payload.type == RealTimeEventsTypeEnum.PayrunStatusChanged
      ) {
        refetch();
      }
    },
    [refetch],
  );

  useNotificationHandler({
    handle: handleNotification,
  });

  return <Render />;
};

export default Payslips;
