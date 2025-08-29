import useBackgroundLocation from "@/hooks/useBackgroundLocation";
import React, { ReactNode, useEffect } from "react";

const LocationTrackingProvider = ({ children }: { children?: ReactNode }) => {
  const trackLocation = useBackgroundLocation();

  useEffect(() => {
    trackLocation();
  }, [trackLocation]);

  return <>{children}</>;
};

export default LocationTrackingProvider;
