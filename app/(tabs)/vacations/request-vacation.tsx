import Form from "@/components/form/Form";
import FormDatepicker from "@/components/inputs/FormDatepicker";
import FormTextarea from "@/components/inputs/FormTextarea";
import { toast } from "@/components/toast/toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import useUser from "@/hooks/UserHook";
import { useTranslation } from "@/localization";
import VacationService from "@/services/VacationService";
import { useRouter } from "expo-router";

const RequestVacation = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { role } = useUser();
  const service = VacationService.make(role);

  const onSubmit = async (data: any) => {
    // from, to: Dayjs or string, reason: string
    const payload = {
      from:
        typeof data.from === "object" && data.from.format
          ? data.from.format("YYYY-MM-DD")
          : data.from,
      to:
        typeof data.to === "object" && data.to.format
          ? data.to.format("YYYY-MM-DD")
          : data.to,
      reason: data.reason,
    };
    const response = await service.store(payload);

    if (response.code == 406) {
      toast.error(response?.message as string);
    }

    return response;
  };

  const onSuccess = () => {
    router.push("/vacations");
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>
          <Text>{t("vacations.request_vacation")}</Text>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form
          handleSubmit={onSubmit}
          onSuccess={onSuccess}
          buttonText={t("components.submit")}
        >
          <FormDatepicker name="from" label={t("vacations.from")} required />
          <FormDatepicker name="to" label={t("vacations.to")} required />
          <FormTextarea
            name="reason"
            label={t("vacations.reason")}
            placeholder={"Enter reason"}
            required
          />
        </Form>
      </CardContent>
    </Card>
  );
};

export default RequestVacation;
