import Form from "@/components/form/Form";
import FormInput from "@/components/inputs/FormInput";
import Page from "@/components/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import useUser from "@/hooks/UserHook";
import { ApiResponse } from "@/http/Response";
import { useTranslation } from "@/localization";
import { User } from "@/models/User";
import { AuthService } from "@/services/AuthService";
import { useRouter } from "expo-router";

const Edit = () => {
  const { t } = useTranslation();
  const { user, role, setUser } = useUser();
  const router = useRouter();
  const handleSubmit = async (data: any) => {
    return await AuthService.make(role)
      .updateUserDetails(data)
      .then((res) => {
        if (res.ok()) {
          setUser(res.data.user);
        }
        return res;
      });
  };

  const onSuccess = (res: ApiResponse<User>) => {
    if (res.ok()) {
      router.replace("/account/details");
    }
  };
  return (
    <Page>
      <Card>
        <CardHeader>
          <CardTitle>
            <Text>{t("details.edit_account_details")}</Text>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form
            handleSubmit={handleSubmit}
            onSuccess={onSuccess}
            defaultValues={user}
          >
            <FormInput
              name={"first_name"}
              type={"text"}
              label={t("details.first-Name")}
            />
            <FormInput
              name={"last_name"}
              type={"text"}
              label={t("details.last-name")}
            />
            <FormInput
              name={"phone"}
              type={"tel"}
              label={t("auth.phone")}
              dataDetectorTypes={"phoneNumber"}
              autoComplete="tel-device"
            />
          </Form>
        </CardContent>
      </Card>
    </Page>
  );
};

export default Edit;
