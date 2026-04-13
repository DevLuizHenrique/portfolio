"use client";

import { useEffect, useState } from "react";
import type { TimelineEvent } from "@/domain/entities/TimelineEvent";
import { useContainer } from "../providers/ContainerProvider";

export function useTimeline() {
  const { getTimeline } = useContainer();
  const [data, setData] = useState<TimelineEvent[]>([]);

  useEffect(() => {
    getTimeline.all().then(setData);
  }, [getTimeline]);

  return data;
}
