import { Text } from "@/components/ui/text";
import useUser from "@/hooks/UserHook";
import { PowerOff, Settings, User2Icon } from "@/lib/icons/icons";
import { AuthService } from "@/services/AuthService";
import * as React from "react";
import { Pressable, SafeAreaView, ScrollView, View } from "react-native";

const Account = () => {
  const { role } = useUser();
  const service = AuthService.make(role);
  const logout = async () => {
    await service.logout();
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="w-full flex flex-col px-3">
          <Pressable className="w-full">
            <View className="w-full flex flex-row items-center justify-between p-5 border-b border-b-secondary">
              <Text>Account Details</Text>
              <User2Icon className="text-primary" />
            </View>
          </Pressable>
          <Pressable className="w-full">
            <View className="w-full flex flex-row items-center justify-between p-5 border-b border-b-secondary">
              <Text>Settings</Text>
              <Settings className="text-primary" />
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

export default Account;
