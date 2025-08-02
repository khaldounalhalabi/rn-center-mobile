import { Text } from "@/components/ui/text";
import useUser from "@/hooks/UserHook";
import {
  CalendarClockIcon,
  CalendarIcon,
  PowerOff,
  User2Icon,
} from "@/lib/icons/icons";
import { AuthService } from "@/services/AuthService";
import { useRouter } from "expo-router";
import * as React from "react";
import { Pressable, SafeAreaView, ScrollView, View } from "react-native";

const Index = () => {
  const router = useRouter();
  const { role } = useUser();
  const service = AuthService.make(role);
  const logout = async () => {
    await service.logout();
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="w-full flex flex-col px-3">
          <Pressable
            className="w-full"
            onPress={() => {
              router.push("/account/details");
            }}
          >
            <View className="w-full flex flex-row items-center justify-between p-5 border-b border-b-secondary">
              <Text>Account Details</Text>
              <User2Icon className="text-primary" />
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              router.push("/vacations");
            }}
            className="w-full"
          >
            <View className="w-full flex flex-row items-center justify-between p-5 border-b border-b-secondary">
              <Text>My Vacations</Text>
              <CalendarIcon className="text-primary" />
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              router.push("/schedule");
            }}
            className="w-full"
          >
            <View className="w-full flex flex-row items-center justify-between p-5 border-b border-b-secondary">
              <Text>My schedule</Text>
              <CalendarClockIcon className="text-primary" />
            </View>
          </Pressable>
          <Pressable className="w-full" onPress={logout}>
            <View className="w-full flex flex-row items-center justify-between p-5 border-b border-b-secondary">
              <Text>Logout</Text>
              <PowerOff className="text-primary" />
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
