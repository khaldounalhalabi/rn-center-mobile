import useUser from "@/hooks/UserHook";
import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
  const { setSignInRole, user, signInRole } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (signInRole) {
      if (user) {
        setSignInRole(signInRole).then(() => {
          router.replace("/");
        });
      }
    }
  }, [user]);
  useEffect(() => {
    if (!signInRole) {
      router.replace("/role-select"); // Redirect to the auth index page
    }
  }, []);

  return (
    <Slot
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
