"use client";

import { useMemo } from "react";
import { useContainer } from "../providers/ContainerProvider";

export function useSkills() {
  const { getSkills } = useContainer();

  return useMemo(
    () => ({
      groups: getSkills.groups(),
      extras: getSkills.extras(),
    }),
    [getSkills],
  );
}
