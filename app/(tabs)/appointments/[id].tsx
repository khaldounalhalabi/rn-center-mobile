import LabelValue from "@/components/label-value";
import LoadingScreen from "@/components/LoadingScreen";
import Page from "@/components/page";
import TranslatableEnum, {
  useTranslateEnum,
} from "@/components/TranslatableEnum";
import useUser from "@/hooks/UserHook";
import { useTranslation } from "@/localization";
import { AppointmentService } from "@/services/AppointmentService";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

const Appointment = () => {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const appointmentId = id ? parseInt(id as string) : 0;
  const { role } = useUser();
  const service = AppointmentService.make(role);
  const { data: appointment, isLoading } = useQuery({
    queryKey: [`appointment_${id}`],
    queryFn: async () => await service.show(appointmentId),
    select(data) {
      return data.data;
    },
  });

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Page>
      <LabelValue
        label={t("common.dashboard.patientName")}
        value={appointment?.customer?.user?.full_name}
      />

      <LabelValue
        label={t("common.dashboard.serviceName")}
        value={appointment?.service?.name}
      />
      <LabelValue
        label={t("common.prescription.appointment_date")}
        value={appointment?.date_time}
      />
      <LabelValue
        label={t("common.dashboard.status")}
        value={<TranslatableEnum value={appointment?.status} />}
      />
      <LabelValue
        label={t("common.appointment.table.sequence")}
        value={appointment?.appointment_sequence}
      />
      <LabelValue
        label={t("common.appointment.show.remaining_time")}
        value={appointment?.remaining_time}
      />
      <LabelValue
        label={t("common.appointment.show.note")}
        value={appointment?.note}
        col
      />
    </Page>
  );
};

export default Appointment;
