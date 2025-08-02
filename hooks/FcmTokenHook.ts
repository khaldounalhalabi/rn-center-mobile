import { GET, POST } from "@/http/Http";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import useUser from "./UserHook";

function useFcmToken() {
  const [token, setToken] = useState("");
  const { user } = useUser();

  console.log("Fcm Token : " + token);
  
  const getToken = async () => {
    if (Platform.OS == "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      console.error("Notifications not enabled");
      throw new Error("Notifications not enabled");
    }

    try {
      const currentToken = await messaging().getToken();
      await GET<{ fcm_token: string }>(`/fcm/get-token`).then((res) => {
        return res?.data?.fcm_token;
      });
      await POST(`/fcm/store-token`, {
        fcm_token: currentToken,
      });
      setToken(currentToken);
    } catch (error: unknown) {
      console.error("Error getting FCM token");
      console.error(error);
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    getToken();
  }, [user]);

  return token;
}

export default useFcmToken;
