"use client";

import { useMemo } from "react";
import { useContainer } from "../providers/ContainerProvider";

export function usePersonalInfo() {
  const { getPersonalInfo } = useContainer();

  return useMemo(() => getPersonalInfo.execute(), [getPersonalInfo]);
}
