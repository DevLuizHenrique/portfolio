"use client";

import { useMemo } from "react";
import { useContainer } from "../providers/ContainerProvider";

export function useTimeline() {
  const { getTimeline } = useContainer();

  return useMemo(() => getTimeline.all(), [getTimeline]);
}
