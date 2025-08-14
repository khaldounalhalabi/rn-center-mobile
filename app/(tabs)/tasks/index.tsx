import useListPage from "@/components/ListPage";
import TranslatableEnum from "@/components/TranslatableEnum";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import TaskLabelEnum from "@/enums/TaskLabelEnum";
import TaskStatusEnum from "@/enums/TaskStatusEnum";
import { useNotificationHandler } from "@/hooks/NotificationHandlerHook";
import useUser from "@/hooks/UserHook";
import { useTranslation } from "@/localization";
import {
  NotificationPayload,
  NotificationsTypeEnum,
} from "@/models/NotificationPayload";
import Task from "@/models/Task";
import TaskService from "@/services/TaskService";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Pressable, View } from "react-native";

interface TaskCardProps {
  item: Task;
  role: string | undefined;
}

export const getTaskLabelVariant = (label: TaskLabelEnum) => {
  switch (label) {
    case TaskLabelEnum.LOW:
      return "outline";
    case TaskLabelEnum.NORMAL:
      return "default";
    case TaskLabelEnum.URGENT:
      return "destructive";
  }
};

export function getTaskStatusVariant(status: TaskStatusEnum) {
  switch (status) {
    case TaskStatusEnum.CANCELLED:
      return "destructive";
    case TaskStatusEnum.COMPLETED:
      return "success";
    case TaskStatusEnum.IN_PROGRESS:
      return "default";
    case TaskStatusEnum.PENDING:
      return "outline";
  }
}

const TaskCard = ({ item }: TaskCardProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/tasks/[id]",
          params: {
            id: item.id,
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
            <CardTitle>{item.title}</CardTitle>
            <CardDescription className={" my-2"}>
              <View className={"flex flex-row items-center gap-3"}>
                <Badge variant={getTaskStatusVariant(item.status)}>
                  <Text>
                    <TranslatableEnum value={item.status} />
                  </Text>
                </Badge>

                <Badge
                  variant={getTaskLabelVariant(
                    item.label ?? TaskLabelEnum.NORMAL,
                  )}
                >
                  <Text style={{ fontWeight: "bold" }}>
                    <TranslatableEnum value={item.label} />
                  </Text>
                </Badge>
              </View>
            </CardDescription>
          </CardHeader>
          <View style={{ marginTop: 12, marginBottom: 8 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 4,
              }}
            >
              <Text style={{ color: "#888" }}>{t("tasks.due_date")}</Text>
              <Text style={{ fontWeight: "600" }}>{item.due_date}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 4,
              }}
            >
              <Text style={{ color: "#888" }}>{t("tasks.user")}</Text>
              <Text style={{ fontWeight: "600" }}>{item.user?.full_name}</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "#888" }}>{t("tasks.issued_at")}</Text>
              <Text style={{ fontWeight: "600" }}>{item.issued_at}</Text>
            </View>
          </View>
        </CardContent>
      </Card>
    </Pressable>
  );
};

const Tasks = () => {
  const { role } = useUser();
  const service = TaskService.make(role);
  const { Render, refetch } = useListPage<Task>({
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
    renderItem: ({ item }) => <TaskCard item={item} role={role} />,
    queryKey: "tasks",
    enableSearch: true,
  });

  const handleNotification = useCallback((payload: NotificationPayload) => {
    if (
      payload.type == NotificationsTypeEnum.TaskStatusChanged ||
      payload.type == NotificationsTypeEnum.NewTaskAssigned ||
      payload.type == NotificationsTypeEnum.NewTaskComment
    ) {
      refetch();
    }
  }, []);

  useNotificationHandler({
    handle: handleNotification,
  });

  return <Render />;
};

export default Tasks;
