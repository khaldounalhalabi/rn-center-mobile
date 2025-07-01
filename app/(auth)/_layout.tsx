import useUser from "@/hooks/UserHook";
import { Stack, useRouter } from "expo-router";
import { ReactNode, useEffect } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { signInRole } = useUser();

  useEffect(() => {
    if (!signInRole) {
      router.replace("/(auth)"); // Redirect to the auth index page
    }
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
