import messaging from "@react-native-firebase/messaging";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { PermissionsAndroid, Platform } from "react-native";

export async function registerForPushNotifications() {
  if (Platform.OS == "android") {
    console.log("Heeeeeeeeeeeer");
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (!Device.isDevice) {
    console.log("Not device");
    throw new Error("Must use physical device for push notifications ");
  }

  console.log("Is device");
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (!enabled) {
    console.error("Notifications not enabled");
    throw new Error("Notifications not enabled");
  }

  try {
    const pushTokenString = await messaging().getToken();
    console.log(`Push token is ${pushTokenString}`);
    return pushTokenString;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`${error}`);
  }
}
