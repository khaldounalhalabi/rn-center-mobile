import { getTaskLabelVariant } from "@/app/(tabs)/tasks/index";
import LabelValue, { Label, Value } from "@/components/label-value";
import LoadingScreen from "@/components/LoadingScreen";
import LoadingSpinner from "@/components/LoadingSpinner";
import Page from "@/components/page";
import TaskStatusColumn from "@/components/tasks/TaskStatusColumn";
import TranslatableEnum from "@/components/TranslatableEnum";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TaskLabelEnum from "@/enums/TaskLabelEnum";
import useUser from "@/hooks/UserHook";
import { useTranslation } from "@/localization";
import { TaskCommentService } from "@/services/TaskCommentService";
import TaskService from "@/services/TaskService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Task = () => {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const taskId = id ? parseInt(id as string) : 0;
  const { role } = useUser();
  const service = TaskService.make(role);
  const {
    data: task,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`task_${id}`],
    queryFn: async () => await service.show(taskId),
    select(data) {
      return data.data;
    },
  });

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const [comment, setComment] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const addCommentMutation = useMutation({
    mutationFn: async (comment: string) => {
      if (!task) throw new Error("No task");
      const res = await TaskCommentService.make(role).store({
        task_id: task.id,
        comment,
      });
      return res.data;
    },
    onSuccess: async () => {
      await refetch();
      setComment("");
    },
  });

  const editCommentMutation = useMutation({
    mutationFn: async ({ id, comment }: { id: number; comment: string }) => {
      const res = await TaskCommentService.make(role).update(id, { comment });
      return res.data;
    },
    onSuccess: async () => {
      await refetch();
      setEditingId(null);
      setEditingValue("");
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async (id: number) => {
      await TaskCommentService.make(role).delete(id);
      return id;
    },
    onSuccess: async () => {
      await refetch();
    },
  });

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Page title={task?.title}>
      <LabelValue
        label={t("tasks.description")}
        value={task?.description}
        col
      />
      <LabelValue label={t("tasks.due_date")} value={task?.due_date} />

      <TaskStatusColumn task={task} />

      <LabelValue
        label={t("tasks.label")}
        value={
          <Badge
            variant={getTaskLabelVariant(task?.label ?? TaskLabelEnum.NORMAL)}
          >
            <Text>
              <TranslatableEnum value={task?.label} />
            </Text>
          </Badge>
        }
      />
      <LabelValue label={t("tasks.user")} value={task?.user?.full_name} />
      <Label label={t("tasks.users")}>
        <Value>
          <View className="flex flex-wrap items-center gap-3">
            {task?.users?.map((user, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Pressable>
                    <Avatar className="h-8 w-8 rounded-lg" alt={""} key={index}>
                      <AvatarFallback className="rounded-lg">
                        <Text>
                          {user?.first_name?.charAt(0)}
                          {user?.last_name?.charAt(0)}
                        </Text>
                      </AvatarFallback>
                    </Avatar>
                  </Pressable>
                </TooltipTrigger>
                <TooltipContent insets={contentInsets}>
                  <Text>{user?.full_name}</Text>
                </TooltipContent>
              </Tooltip>
            ))}
          </View>
        </Value>
      </Label>

      <View className="mt-6">
        <Text className="font-semibold mb-2">{t("tasks.task_comments")}</Text>
        <View className="space-y-4">
          {task?.task_comments?.length ? (
            task.task_comments.map((c, index) => (
              <View
                key={index}
                className="flex flex-row w-full items-start gap-3 border-b border-primary p-4 last:border-b-0"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Pressable>
                      <Avatar
                        className="h-8 w-8 rounded-lg"
                        alt={""}
                        key={index}
                      >
                        <AvatarFallback className="rounded-lg">
                          <Text>
                            {c.user?.first_name?.charAt(0)}
                            {c.user?.last_name?.charAt(0)}
                          </Text>
                        </AvatarFallback>
                      </Avatar>
                    </Pressable>
                  </TooltipTrigger>
                  <TooltipContent insets={contentInsets}>
                    <Text>{c.user?.full_name}</Text>
                  </TooltipContent>
                </Tooltip>
                <View className="flex-1">
                  <View className="flex flex-row mb-4 items-center gap-2">
                    <Text className="font-medium text-sm">
                      {c.user?.full_name || "Unknown User"}
                    </Text>
                    {c.can_update && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onPress={() => {
                          setEditingId(c.id);
                          setEditingValue(c.comment);
                        }}
                        disabled={loadingId === c.id}
                      >
                        <Text className={"text-primary"}>
                          {t("tasks.edit")}
                        </Text>
                      </Button>
                    )}
                    {c.can_delete && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            disabled={loadingId === c.id}
                          >
                            <Text className="text-destructive">
                              {t("tasks.delete")}
                            </Text>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              {t("tasks.delete_alert_title")}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {t("tasks.delete_alert")}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>
                              <Text>{t("tasks.cancel")}</Text>
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onPress={async () => {
                                setLoadingId(c.id);
                                await deleteCommentMutation.mutateAsync(c.id);
                                setLoadingId(null);
                              }}
                              disabled={deleteCommentMutation.isPending}
                            >
                              <Text> {t("tasks.delete")}</Text>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </View>
                  {/* Comment text or edit input */}
                  {editingId === c.id ? (
                    <View className="flex gap-2 mt-1">
                      <Input
                        value={editingValue}
                        onChangeText={(v) => setEditingValue(v)}
                        className="flex-1"
                        autoFocus
                      />
                      <Button
                        size="sm"
                        disabled={editCommentMutation.isPending}
                        onPress={async () => {
                          setLoadingId(c.id);
                          await editCommentMutation.mutateAsync({
                            id: c.id,
                            comment: editingValue,
                          });
                          setLoadingId(null);
                        }}
                      >
                        {editCommentMutation.isPending ? (
                          <LoadingSpinner size={16} />
                        ) : (
                          <Text>{t("tasks.save")}</Text>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onPress={() => setEditingId(null)}
                      >
                        <Text>{t("tasks.cancel")}</Text>
                      </Button>
                    </View>
                  ) : (
                    <View className="text-sm mt-1 whitespace-pre-line">
                      <Text>{c.comment}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))
          ) : (
            <View className="text-muted-foreground text-sm">
              <Text>{t("tasks.no_comments")}</Text>
            </View>
          )}
        </View>
        {/* Add comment form */}
        {task?.can_comment && (
          <View className="flex gap-2 mt-4">
            <Input
              value={comment}
              onChangeText={(e) => setComment(e)}
              placeholder={t("tasks.add_a_comment")}
              aria-disabled={addCommentMutation.isPending}
            />
            <Button
              disabled={addCommentMutation.isPending || !comment.trim()}
              onPress={async () => {
                if (!comment.trim()) return;
                await addCommentMutation.mutateAsync(comment);
              }}
            >
              {addCommentMutation.isPending ? (
                <LoadingSpinner size={16} />
              ) : (
                <Text>{t("tasks.add")}</Text>
              )}
            </Button>
          </View>
        )}
      </View>
    </Page>
  );
};

export default Task;
