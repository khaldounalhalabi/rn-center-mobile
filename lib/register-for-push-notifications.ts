import Contstants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function registerForPushNotifications() {
  if (Platform.OS == "android") {
    console.log("Heeeeeeeeeeeer")
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    console.log("Is device")
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      throw new Error(
        "Permission Not Granted To Get Push Token For Push Notification!",
      );
    }

    const projectId =
      Contstants?.expoConfig?.extra?.eas?.projectId ??
      Contstants?.expoConfig?.projectId;

    if (!projectId) {
      throw new Error("Project ID not found");
    }

    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({

          projectId,
        })
      ).data;

      console.log(`Push token is ${pushTokenString}`);
      return pushTokenString;
    } catch (error: unknown) {
      console.error(error);
      throw new Error(`${error}`);
    }
  } else {
    console.log("Not device")
    throw new Error("Must use physical device for push notifications ");
  }
}
