import useFcmToken from "@/hooks/FcmTokenHook";
import useUser from "@/hooks/UserHook";
import { NotificationPayload } from "@/models/NotificationPayload";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import RemoteMessage = FirebaseMessagingTypes.RemoteMessage;
import * as Notifications from "expo-notifications";


export const NotificationsHandlersContext = createContext<Dispatch<
  SetStateAction<NotificationHandler[]>
> | null>(null);

export interface NotificationHandler {
  fn: (payload: NotificationPayload) => void;
  key?: string;
  is_active: boolean;
  is_permanent: boolean;
}

const NotificationProvider = ({ children }: { children?: ReactNode }) => {
  const fcmToken = useFcmToken();
  console.log(fcmToken);
  const [handlers, setHandlers] = useState<NotificationHandler[]>([]);
  const { user } = useUser();

  const handleMessage = useCallback(
    async (payload: RemoteMessage) => {
      console.log(payload);
      const notification = new NotificationPayload(payload?.data ?? {});
      handlers.forEach((handler) => {
        try {
          handler.fn(notification);
        } catch (error) {
          console.error("Error while calling notification handler");
          console.error(error);
        }
      });

      if (!notification.isNotification()) {
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: notification.title,
          body: notification.message,
        },
        trigger: null, // show immediately
      });

      // toast.success(
      //   <Link href={notification.getUrl()}>
      //     {t("components.new_notification")}
      //   </Link>,
      //   {
      //     description: notification?.message,
      //     action: {
      //       label: t("components.show"),
      //       onClick: () => {
      //         router.push({ url: notification.getUrl() });
      //       },
      //     },
      //     icon: <Bell />,
      //   },
      // );
    },
    [handlers],
  );

  useEffect(() => {
    return messaging().onMessage(async (remoteMessage) => {
      await handleMessage(remoteMessage);
    });
  }, [handlers, fcmToken, user]);

  return (
    <NotificationsHandlersContext.Provider value={setHandlers}>
      {children}
    </NotificationsHandlersContext.Provider>
  );
};

export default NotificationProvider;
