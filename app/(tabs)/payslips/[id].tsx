import LabelValue from "@/components/label-value";
import LoadingScreen from "@/components/LoadingScreen";
import Page from "@/components/page";
import TranslatableEnum, {
  useTranslateEnum,
} from "@/components/TranslatableEnum";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import PayslipAdjustmentTypeEnum from "@/enums/PayslipAdjustmentTypeEnum";
import PayslipStatusEnum from "@/enums/PayslipStatusEnum";
import useUser from "@/hooks/UserHook";
import { useTranslation } from "@/localization";
import PayslipService from "@/services/PayslipService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";

const PayslipDetails = () => {
  const { id } = useLocalSearchParams();
  const payslipId = id ? parseInt(id as string) : 0;
  const { role } = useUser();
  const service = PayslipService.make(role);
  const { t } = useTranslation();
  const tEnum = useTranslateEnum();
  const {
    data: payslip,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`payslip_${id}_details`],
    queryFn: async () => await service.show(payslipId),
    select(data) {
      return data.data;
    },
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] =
    useState<PayslipStatusEnum | null>(null);

  const toggleStatusMutation = useMutation({
    mutationFn: async (status: PayslipStatusEnum) => {
      return await service.toggleStatus(payslipId, status);
    },
    onSuccess: () => {
      setModalVisible(false);
      setSelectedStatus(null);
      refetch();
    },
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Page title={t("payslips.show_title")}>
      {payslip?.can_toggle_status && (
        <View className="mb-4 w-full flex flex-row justify-end">
          <Button
            variant="outline"
            className="px-4 py-2"
            onPress={() => setModalVisible(true)}
            disabled={toggleStatusMutation.isPending}
          >
            <Text className="font-bold">{t("payslips.toggle_status")}</Text>
          </Button>
        </View>
      )}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <Card className="flex-1 justify-center items-center">
          <CardHeader>
            <CardTitle className="text-lg font-bold mb-4 text-center">
              {t("payslips.select_status")}
            </CardTitle>
          </CardHeader>
          <CardContent className="rounded-lg p-6 w-5/6 max-w-md">
            {[
              PayslipStatusEnum.ACCEPTED,
              PayslipStatusEnum.REJECTED,
              PayslipStatusEnum.DRAFT,
            ].map((status) => (
              <TouchableOpacity
                key={status}
                className="mb-3"
                onPress={() => toggleStatusMutation.mutate(status)}
                disabled={toggleStatusMutation.isPending}
                style={{ opacity: toggleStatusMutation.isPending ? 0.6 : 1 }}
              >
                <View
                  className={`${status == PayslipStatusEnum.ACCEPTED ? "bg-primary" : status == PayslipStatusEnum.REJECTED ? "bg-destructive" : "bg-secondary"} rounded py-3 px-4 flex-row items-center justify-center`}
                >
                  <Text
                    className={`${status == PayslipStatusEnum.ACCEPTED ? "text-primary-foreground" : status == PayslipStatusEnum.REJECTED ? "text-destructive-foreground" : "text-secondary-foreground"} font-bold text-base`}
                  >
                    <TranslatableEnum value={status} />
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            <Button
              variant="outline"
              onPress={() => setModalVisible(false)}
              disabled={toggleStatusMutation.isPending}
            >
              <Text>{t("components.cancel")}</Text>
            </Button>
          </CardContent>
        </Card>
      </Modal>
      <Card className="mb-4">
        <CardHeader></CardHeader>
        <CardContent>
          <LabelValue
            label={t("payslips.paid_days")}
            value={payslip?.paid_days}
          />
          <LabelValue
            label={t("payslips.gross_pay")}
            value={payslip?.gross_pay}
          />
          <LabelValue label={t("payslips.net_pay")} value={payslip?.net_pay} />
          <LabelValue
            label={t("payslips.status")}
            value={tEnum(payslip?.status)}
          />
          <LabelValue
            label={t("payslips.total_benefits")}
            value={payslip?.total_benefits}
          />
          <LabelValue
            label={t("payslips.total_deductions")}
            value={payslip?.total_deductions}
          />
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{t("payslips.benefits")}</CardTitle>
        </CardHeader>
        <CardContent>
          {payslip?.payslip_adjustments?.filter(
            (i) => i.type == PayslipAdjustmentTypeEnum.BENEFIT,
          ).length === 0 && (
            <Text className="text-muted-foreground text-sm mb-2">
              {t("payslips.no_benefits")}
            </Text>
          )}
          {payslip?.payslip_adjustments
            ?.filter((i) => i.type == PayslipAdjustmentTypeEnum.BENEFIT)
            .map((adjustment, index) => (
              <View
                key={index}
                className="flex flex-row justify-between items-center py-1"
              >
                <Text className="font-medium text-base" numberOfLines={1}>
                  {adjustment.reason}
                </Text>
                <Badge variant="default" className="ml-2">
                  <Text className="text-primary-foreground font-bold">
                    +{adjustment.amount}
                  </Text>
                </Badge>
              </View>
            ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("payslips.deductions")}</CardTitle>
        </CardHeader>
        <CardContent>
          {payslip?.payslip_adjustments?.filter(
            (i) => i.type == PayslipAdjustmentTypeEnum.DEDUCTION,
          ).length === 0 && (
            <Text className="text-muted-foreground text-sm mb-2">
              {t("payslips.no_deductions")}
            </Text>
          )}
          {payslip?.payslip_adjustments
            ?.filter((i) => i.type == PayslipAdjustmentTypeEnum.DEDUCTION)
            .map((adjustment, index) => (
              <View
                key={index}
                className="flex flex-row justify-between items-center py-1"
              >
                <Text className="font-medium text-base" numberOfLines={1}>
                  {adjustment.reason}
                </Text>
                <Badge variant="destructive" className="ml-2">
                  <Text className="text-destructive-foreground font-bold">
                    -{adjustment.amount}
                  </Text>
                </Badge>
              </View>
            ))}
        </CardContent>
      </Card>
    </Page>
  );
};

export default PayslipDetails;
