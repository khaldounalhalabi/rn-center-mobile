import useUser from "@/hooks/UserHook";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";

const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  const { user, initialized, initializeUser } = useUser();
  useEffect(() => {
    if (!user && initialized) {
      router.replace("/role-select");
    } else if (!user) {
      initializeUser();
    }
  }, [user, initialized, router]);
  return <>{children}</>;
};

export default AuthProvider;
